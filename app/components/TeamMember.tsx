import Image from 'next/image';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

interface TeamMemberProps {
  name: string;
  photo: string;
  bio: string;
  instagram: string;
  linkedin: string;
}

export default function TeamMember({ name, photo, bio, instagram, linkedin }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
      <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-3">{name}</h3>

      <p className="text-gray-600 mb-6 flex-grow">{bio}</p>

      <div className="flex gap-4">
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram ${name}`}
          className="text-pink-600 hover:text-pink-700 transition-colors text-2xl"
        >
          <FaInstagram />
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn ${name}`}
          className="text-blue-600 hover:text-blue-700 transition-colors text-2xl"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
