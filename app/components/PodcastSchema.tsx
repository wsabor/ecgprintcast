export default function PodcastSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "ECG PrintCast",
    description:
      "O podcast queridinho da indústria gráfica! Conectando profissionais, compartilhando conhecimento e fomentando networking valioso no setor gráfico.",
    url: "https://ecgprintcast.com.br",
    image: "https://ecgprintcast.com.br/images/logo_TVA-PC.webp",
    author: {
      "@type": "Organization",
      name: "ECG PrintCast",
      url: "https://ecgprintcast.com.br",
    },
    webFeed: "https://ecgprintcast.com.br/feed.xml",
    genre: ["Technology", "Business", "Education"],
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: "TV Abigraf",
      logo: {
        "@type": "ImageObject",
        url: "https://ecgprintcast.com.br/images/logo_TV-Abigraf.png",
      },
    },
    sameAs: [
      "https://www.youtube.com/@ecgprintcast",
      "https://open.spotify.com/show/4vtLgRAvS7AsFfPowGgwdG",
      "https://www.instagram.com/print.cast/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
