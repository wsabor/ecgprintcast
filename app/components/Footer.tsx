import Image from 'next/image';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-[#bde4db] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-10">
          <div className="relative w-[350px] h-[100px] md:w-[400px] md:h-[120px]">
            <Image
              src="/images/slogan.webp"
              alt="ECG PrintCast"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>

          <SocialLinks variant="default" />

          <div className="text-center pt-8 w-full max-w-4xl border-t border-gray-400/30">
            <a
              href="https://wsabor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col md:flex-row items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors group"
            >
              <span className="text-base md:text-lg font-medium">Desenvolvido por</span>
              <div className="relative w-[120px] h-[32px] md:w-[140px] md:h-[36px] group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo-wsabor.png"
                  alt="wsabor.com"
                  fill
                  className="object-contain"
                />
              </div>
            </a>
          </div>

          <div className="text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} ECG PrintCast. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
