import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

interface TeamMemberProps {
  name: string;
  photo: string;
  bio: string;
  instagram: string;
  linkedin: string;
}

export default function TeamMember({
  name,
  photo,
  bio,
  instagram,
  linkedin,
}: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative mb-4 h-48 w-48 overflow-hidden rounded-full">
        <Image src={photo} alt={name} fill className="object-cover" />
      </div>

      <h3 className="mb-3 text-3xl font-bold text-gray-800">{name}</h3>

      <p className="mb-6 flex-grow text-lg text-gray-600">{bio}</p>

      <div className="flex gap-4">
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram ${name}`}
          className="text-2xl text-pink-600 transition-colors hover:text-pink-700"
        >
          <FaInstagram />
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn ${name}`}
          className="text-2xl text-blue-600 transition-colors hover:text-blue-700"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
