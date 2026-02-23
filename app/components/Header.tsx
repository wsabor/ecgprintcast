import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="top-0 z-50 w-full bg-white shadow-md md:sticky">
      <div className="max-w-9xl container mx-auto flex items-center justify-center px-4 py-3 md:justify-between md:px-6">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative h-[50px] w-[130px]">
            <Image
              src="/images/logo_TV-Abigraf.png"
              alt="TV Abigraf"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative h-[50px] w-[150px]">
            <Image
              src="/images/logo.png"
              alt="ECG PrintCast"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <nav className="hidden gap-3 md:flex">
          <a
            href="#top"
            className="text-base font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Início
          </a>
          <a
            href="#sobre"
            className="text-base font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Sobre
          </a>
          <a
            href="#equipe"
            className="text-base font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Equipe
          </a>
          <a
            href="#patrocinadores"
            className="text-base font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Patrocinadores
          </a>
          <a
            href="#contato"
            className="text-base font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Contato
          </a>
          <a
            href="/admin/newsletter"
            className="text-base font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Admin
          </a>
        </nav>
      </div>
    </header>
  );
}
