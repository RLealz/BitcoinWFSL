import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      investmentRange: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await apiRequest("POST", "/api/leads", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Obrigado pelo seu interesse. Entraremos em contato em breve!",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Algo deu errado. Por favor, tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertLead) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-24 gradient-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Contacte-nos</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <p className="text-white">geral.bitcoinwfsl@proton.me</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <p className="text-white">+351 913 207 651</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p className="text-white">Rua da Inovação, 123, 1000-001 Lisboa, Portugal</p>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4 text-white">Com o apoio de:</h3>
                <div className="space-y-2 text-white/80">
                  <p>FMLG</p>
                  <p>DeafPro DAO 2025</p>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} className="bg-black/20 border-white/10 text-white placeholder:text-white/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu email" {...field} className="bg-black/20 border-white/10 text-white placeholder:text-white/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field: { value, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel className="text-white">Telefone (Opcional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Seu número de telefone" 
                          value={value ?? ''} 
                          {...fieldProps} 
                          className="bg-black/20 border-white/10 text-white placeholder:text-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="investmentRange"
                  render={({ field: { value, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel className="text-white">Faixa de Investimento</FormLabel>
                      <Select
                        onValueChange={fieldProps.onChange}
                        value={value ?? undefined}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-black/20 border-white/10 text-white">
                            <SelectValue placeholder="Selecione o valor de investimento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-100">Até 100€</SelectItem>
                          <SelectItem value="100-500">100€ - 500€</SelectItem>
                          <SelectItem value="500-1000">500€ - 1000€</SelectItem>
                          <SelectItem value="1000-5000">1000€ - 5000€</SelectItem>
                          <SelectItem value="5000+">Mais de 5000€</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field: { value, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel className="text-white">Mensagem</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Conte-nos sobre seus objetivos de investimento"
                          value={value ?? ''}
                          {...fieldProps}
                          className="bg-black/20 border-white/10 text-white placeholder:text-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}