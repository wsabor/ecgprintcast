import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative w-[200px] h-[60px]">
            <Image
              src="/images/logo.png"
              alt="ECG PrintCast"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex gap-6">
          <a
            href="#sobre"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Sobre
          </a>
          <a
            href="#equipe"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Equipe
          </a>
          <a
            href="#patrocinadores"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Patrocinadores
          </a>
          <a
            href="#contato"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}
