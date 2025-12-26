import { FaYoutube, FaSpotify, FaInstagram, FaFacebook } from 'react-icons/fa';

interface SocialLinksProps {
  variant?: 'default' | 'large';
}

export default function SocialLinks({ variant = 'default' }: SocialLinksProps) {
  const links = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@ecgprintcast',
      icon: FaYoutube,
      color: 'hover:bg-red-600',
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/show/4vtLgRAvS7AsFfPowGgwdG',
      icon: FaSpotify,
      color: 'hover:bg-green-500',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ecg.printcast/',
      icon: FaInstagram,
      color: 'hover:bg-pink-600',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/ecgprintcast/',
      icon: FaFacebook,
      color: 'hover:bg-blue-600',
    },
  ];

  const sizeClasses = variant === 'large' ? 'text-4xl p-4' : 'text-2xl p-3';

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className={`${sizeClasses} bg-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${link.color} hover:text-white`}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
