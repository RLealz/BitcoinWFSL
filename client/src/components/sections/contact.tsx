import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
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

export default function Contact() {
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

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
      if (!captchaToken) {
        throw new Error("Por favor, complete o captcha");
      }

      console.log("Submitting form data:", { ...data, captchaToken: "HIDDEN" });

      const res = await apiRequest("POST", "/api/leads", {
        ...data,
        captchaToken
      });

      const result = await res.json();
      console.log("Form submission response:", result);
      return result;
    },
    onSuccess: () => {
      console.log("Form submitted successfully");
      toast({
        title: "Sucesso",
        description: "Obrigado pelo seu interesse. Entraremos em contato em breve!",
      });
      form.reset();
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    },
    onError: (error) => {
      console.error("Form submission error:", error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Algo deu errado. Por favor, tente novamente.",
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
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#FFD700]">Contacte-nos</h2>
            <p className="text-white/80">Preencha o formulário abaixo e entraremos em contacto consigo.</p>
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

              <div className="flex justify-center mb-6">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token: string | null) => setCaptchaToken(token)}
                  theme="dark"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold"
                disabled={mutation.isPending || !captchaToken}
              >
                {mutation.isPending ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}