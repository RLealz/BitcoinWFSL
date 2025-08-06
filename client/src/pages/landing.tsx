import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bem-vindo ao <span className="text-[#FFD700]">Bitcoin WFSL</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Plataforma profissional de investimento em criptomoedas, 
              projetada especialmente para a comunidade surda com suporte 
              completo à Língua Gestual Portuguesa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold px-8 py-3"
                onClick={() => window.location.href = '/api/login'}
              >
                Iniciar Sessão
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black px-8 py-3"
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Planos
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#FFD700]">Acessibilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Suporte completo à Língua Gestual Portuguesa e recursos de acessibilidade avançados
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#FFD700]">Segurança</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Plataforma segura com autenticação robusta e proteção de dados
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-black/40 border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#FFD700]">Rentabilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Planos de investimento com rentabilidade de até 100% ao ano
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <section id="plans" className="mb-16">
            <h2 className="text-3xl font-bold text-center text-[#FFD700] mb-8">
              Nossos Planos de Investimento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 border-[#CD7F32] hover:shadow-lg transition-shadow bg-black/40">
                <CardHeader className="text-center">
                  <CardTitle className="text-[#CD7F32] text-2xl">Bronze</CardTitle>
                  <CardDescription className="text-gray-300">€1.000 - €2.500</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-[#CD7F32] mb-2">4.17%</div>
                  <div className="text-sm text-gray-300 mb-4">por mês (50% ao ano)</div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>✓ Investimento mínimo: €1.000</li>
                    <li>✓ Duração: 12 meses</li>
                    <li>✓ Risco baixo</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#C0C0C0] hover:shadow-lg transition-shadow bg-black/40">
                <CardHeader className="text-center">
                  <CardTitle className="text-[#C0C0C0] text-2xl">Prata</CardTitle>
                  <CardDescription className="text-gray-300">€2.500 - €5.000</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-[#C0C0C0] mb-2">6.25%</div>
                  <div className="text-sm text-gray-300 mb-4">por mês (75% ao ano)</div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>✓ Investimento mínimo: €2.500</li>
                    <li>✓ Duração: 18 meses</li>
                    <li>✓ Risco médio</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#FFD700] hover:shadow-lg transition-shadow bg-black/40">
                <CardHeader className="text-center">
                  <CardTitle className="text-[#FFD700] text-2xl">Ouro</CardTitle>
                  <CardDescription className="text-gray-300">€5.000 - €10.000</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-[#FFD700] mb-2">8.33%</div>
                  <div className="text-sm text-gray-300 mb-4">por mês (100% ao ano)</div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>✓ Investimento mínimo: €5.000</li>
                    <li>✓ Duração: 24 meses</li>
                    <li>✓ Risco alto</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
              Pronto para começar?
            </h3>
            <p className="text-gray-300 mb-6">
              Faça login para aceder à sua dashboard e começar a investir hoje mesmo.
            </p>
            <Button
              size="lg"
              className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold px-8 py-3"
              onClick={() => window.location.href = '/api/login'}
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}