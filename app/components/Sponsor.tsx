import Image from 'next/image';
import { FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';

interface SponsorProps {
  name: string;
  logo: string;
  description: string;
  instagram: string;
  website: string;
}

export default function Sponsor({ name, logo, description, instagram, website }: SponsorProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
      <div className="relative w-40 h-40 mb-4">
        <Image
          src={logo}
          alt={name}
          fill
          className="object-contain"
        />
      </div>

      <p className="text-gray-600 mb-6 flex-grow text-sm">{description}</p>

      <div className="flex gap-4">
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram ${name}`}
          className="text-pink-600 hover:text-pink-700 transition-colors text-xl"
        >
          <FaInstagram />
        </a>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Site ${name}`}
          className="text-blue-600 hover:text-blue-700 transition-colors text-xl"
        >
          <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
}
