import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 gradient-background border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#FFD700]">Contacte-nos</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#FFD700]" />
                <p className="text-white">geral.bitcoinwfsl@proton.me</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#FFD700]" />
                <p className="text-white">+351 913 207 651</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#FFD700]" />
                <p className="text-white">Rua da Inovação, 123, 1000-001 Lisboa, Portugal</p>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#FFD700]">Com o apoio de</h3>
            <div className="space-y-2">
              <p className="text-white">FMLG</p>
              <p className="text-white">DeafPro DAO 2025</p>
            </div>
          </div>

          {/* Copyright */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#FFD700]">Legal</h3>
            <div className="space-y-2">
              <p className="text-white/80">
                © {new Date().getFullYear()} Bitcoin WFSL. Todos os direitos reservados.
              </p>
              <p className="text-white/60 text-sm">
                * Os retornos apresentados são estimativas e podem variar de acordo com as condições do mercado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
