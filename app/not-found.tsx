import Link from 'next/link';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#FFD700] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-6">Página Não Encontrada</h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link href="/" className="inline-block bg-[#FFD700] text-black px-6 py-3 rounded-md font-medium hover:bg-[#E5C100] transition-colors">
            Voltar para Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}