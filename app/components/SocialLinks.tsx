import { FaYoutube, FaSpotify, FaInstagram } from "react-icons/fa";

interface SocialLinksProps {
  variant?: "default" | "large";
}

export default function SocialLinks({ variant = "default" }: SocialLinksProps) {
  const links = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/@ecgprintcast",
      icon: FaYoutube,
      color: "hover:bg-red-600",
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/4vtLgRAvS7AsFfPowGgwdG",
      icon: FaSpotify,
      color: "hover:bg-green-500",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/print.cast/",
      icon: FaInstagram,
      color: "hover:bg-pink-600",
    },
  ];

  // Controle detalhado de tamanhos com responsividade
  const iconSize = variant === "large" ? "text-4xl md:text-5xl" : "text-4xl";
  const circleSize = variant === "large" ? "h-16 w-16 md:h-20 md:w-20" : "h-16 w-16";

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className={`${circleSize} ${iconSize} transform rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 ${link.color} flex items-center justify-center hover:text-white`}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
