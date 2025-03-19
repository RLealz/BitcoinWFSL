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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      try {
        setIsSubmitting(true);
        console.log("Submitting form with data:", { ...data, captchaToken: 'token-hidden' });

        const response = await apiRequest("POST", "/api/leads", {
          ...data,
          captchaToken,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Form submission error:", errorData);
          throw new Error(errorData.message || "Erro ao enviar formulário");
        }

        const result = await response.json();
        console.log("Form submission successful:", result);
        return result;
      } catch (error) {
        console.error("Form submission failed:", error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Obrigado pelo seu interesse. Entraremos em contato em breve!",
      });
      form.reset();
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Algo deu errado. Por favor, tente novamente.",
        variant: "destructive",
      });
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    },
  });

  const onSubmit = async (data: InsertLead) => {
    try {
      if (!captchaToken) {
        toast({
          title: "Erro",
          description: "Por favor, complete o captcha antes de enviar.",
          variant: "destructive",
        });
        return;
      }
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Submit error:", error);
    }
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
                        <SelectItem value="bronze">Bronze (1.000 €)</SelectItem>
                        <SelectItem value="prata">Prata (2.500 €)</SelectItem>
                        <SelectItem value="ouro">Ouro (5.000 €)</SelectItem>
                        <SelectItem value="diamante">Diamante (10.000+ €)</SelectItem>
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
                  onChange={(token: string | null) => {
                    console.log("reCAPTCHA token received:", token ? "valid token" : "no token");
                    setCaptchaToken(token);
                  }}
                  onExpired={() => {
                    console.log("reCAPTCHA expired");
                    setCaptchaToken(null);
                  }}
                  onError={() => {
                    console.error("reCAPTCHA error");
                    setCaptchaToken(null);
                    toast({
                      title: "Erro",
                      description: "Erro ao carregar o captcha. Por favor, recarregue a página.",
                      variant: "destructive",
                    });
                  }}
                  theme="dark"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold"
                disabled={isSubmitting || !captchaToken}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}