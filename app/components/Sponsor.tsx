import Image from "next/image";
import { FaInstagram, FaExternalLinkAlt } from "react-icons/fa";

interface SponsorProps {
  name: string;
  logo: string;
  description: string;
  instagram: string;
  website: string;
}

export default function Sponsor({
  name,
  logo,
  description,
  instagram,
  website,
}: SponsorProps) {
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center rounded-2xl bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative mb-4 h-60 w-60 flex-shrink-0">
        <Image src={logo} alt={name} fill className="object-contain" />
      </div>

      <p className="mb-6 flex-grow text-xl text-gray-600">{description}</p>

      <div className="mt-auto flex items-center gap-4">
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram ${name}`}
          className="text-3xl text-pink-600 transition-colors hover:text-pink-700"
        >
          <FaInstagram />
        </a>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Site ${name}`}
          className="flex text-2xl text-blue-600 transition-colors hover:text-blue-700"
        >
          <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
}
