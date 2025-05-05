"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  month?: Date;
  selected?: Date;
  onDateClick?: (date: Date) => void;
  className?: string;
};

export function Calendar({
  className,
  month = new Date(),
  selected,
  onDateClick,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(month);
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
  
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = new Date(monthStart);
  const day = startDate.getDay();
  startDate.setDate(startDate.getDate() - day);

  const monthName = currentMonth.toLocaleString('pt-BR', { month: 'long' });
  const year = currentMonth.getFullYear();
  
  // Generate weeks for the calendar
  const weeks = [];
  let days = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= monthEnd || days.length % 7 !== 0) {
    const isCurrentMonth = currentDate.getMonth() === currentMonth.getMonth();
    const isSelectedDate = selected && 
      currentDate.getDate() === selected.getDate() && 
      currentDate.getMonth() === selected.getMonth() && 
      currentDate.getFullYear() === selected.getFullYear();
    const isToday = 
      currentDate.getDate() === new Date().getDate() && 
      currentDate.getMonth() === new Date().getMonth() && 
      currentDate.getFullYear() === new Date().getFullYear();
    
    days.push(
      <button
        key={currentDate.toString()}
        onClick={() => onDateClick && onDateClick(new Date(currentDate))}
        className={cn(
          "h-9 w-9 rounded-md p-0 font-normal",
          !isCurrentMonth && "text-gray-500/50",
          isCurrentMonth && !isSelectedDate && !isToday && "text-white",
          isToday && !isSelectedDate && "border border-[#FFD700] text-[#FFD700]",
          isSelectedDate && "bg-[#FFD700] text-black font-semibold"
        )}
      >
        {currentDate.getDate()}
      </button>
    );
    
    if (days.length === 7) {
      weeks.push(<div key={currentDate.toString()} className="flex justify-between">{days}</div>);
      days = [];
    }
    
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    currentDate = nextDate;
  }
  
  if (days.length > 0) {
    weeks.push(<div key={currentDate.toString()} className="flex justify-between">{days}</div>);
  }
  
  return (
    <div className={cn("w-full p-3", className)} {...props}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold capitalize text-[#FFD700]">
          {monthName} {year}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="p-2 rounded-md hover:bg-white/10"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="h-4 w-4 text-white/70" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-md hover:bg-white/10"
            aria-label="Próximo mês"
          >
            <ChevronRight className="h-4 w-4 text-white/70" />
          </button>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="h-9 w-9 text-center text-white/50 text-sm font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="space-y-1">
          {weeks}
        </div>
      </div>
    </div>
  );
}