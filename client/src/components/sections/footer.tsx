import { Mail, Phone, MapPin } from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";

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

          {/* Quick Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#FFD700]">Entre em contato já</h3>
            <div className="flex gap-4">
              <a
                href="https://wa.me/351913207651"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#FFD700] transition-colors"
              >
                <SiWhatsapp className="h-8 w-8" />
              </a>
              <a
                href="https://t.me/+351913207651"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#FFD700] transition-colors"
              >
                <SiTelegram className="h-8 w-8" />
              </a>
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
        </div>

        {/* Copyright - Bottom Right */}
        <div className="mt-8 border-t border-white/10 pt-4">
          <p className="text-white/60 text-sm text-right">
            © 2025 Bitcoin WFSL. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}