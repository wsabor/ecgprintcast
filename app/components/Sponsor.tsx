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
    <div className="flex h-[640px] flex-col items-center gap-2 rounded-2xl bg-white p-5 text-center shadow-lg transition-transform duration-300 hover:scale-105 md:h-[520px]">
      <div className="relative h-56 w-56 flex-shrink-0">
        <Image src={logo} alt={name} fill className="object-contain" />
      </div>

      <p className="flex-grow overflow-hidden text-lg text-gray-600">
        {description}
      </p>

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
