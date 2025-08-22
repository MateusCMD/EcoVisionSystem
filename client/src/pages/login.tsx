import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";

const loginSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return response.json();
    },
    onSuccess: (user) => {
      // Store user data in localStorage
      localStorage.setItem("ecovision_user", JSON.stringify(user));
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Erro no login",
        description: error.message || "Ocorreu um erro ao fazer login",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-eco-green-50">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <Logo />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite seu nome completo"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green-500 focus:border-eco-green-500 transition-colors"
                      data-testid="input-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">CPF</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green-500 focus:border-eco-green-500 transition-colors"
                      onChange={(e) => {
                        const formatted = formatCpf(e.target.value);
                        field.onChange(formatted);
                      }}
                      data-testid="input-cpf"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-eco-green-500 hover:bg-eco-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105"
              data-testid="button-login"
            >
              {loginMutation.isPending ? (
                "Entrando..."
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Entrar
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
