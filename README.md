# ECG PrintCast

O podcast queridinho da indústria gráfica!

## Sobre o Projeto

Este projeto é o site oficial do ECG PrintCast, um podcast dedicado à indústria gráfica brasileira. O site foi migrado do WordPress para Next.js, utilizando tecnologias modernas para melhor performance e experiência do usuário.

## Tecnologias Utilizadas

- **Next.js 16** - Framework React para produção
- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário
- **React Icons** - Biblioteca de ícones

## Estrutura do Projeto

```
app/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho com navegação
│   ├── Hero.tsx        # Seção principal
│   ├── SocialLinks.tsx # Links para redes sociais
│   ├── About.tsx       # Sobre o PrintCast
│   ├── Team.tsx        # Seção da equipe
│   ├── TeamMember.tsx  # Card de membro da equipe
│   ├── Sponsors.tsx    # Seção de patrocinadores
│   ├── Sponsor.tsx     # Card de patrocinador
│   ├── Contact.tsx     # Seção de contato
│   └── Footer.tsx      # Rodapé
├── layout.tsx          # Layout raiz
├── page.tsx            # Página principal
└── globals.css         # Estilos globais

public/
└── images/             # Imagens do site
    ├── team/          # Fotos da equipe
    └── sponsors/      # Logos dos patrocinadores
```

## Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acessar o site:**
   Abra [http://localhost:3000](http://localhost:3000) no navegador

## Build para Produção

```bash
npm run build
npm start
```

## Seções do Site

- **Hero** - Apresentação principal com slogan e redes sociais
- **Sobre** - Informações sobre o podcast
- **Equipe** - Apresentação dos hosts do podcast
- **Patrocinadores** - Empresas que apoiam o PrintCast
- **Contato** - Informações de contato

## Redes Sociais

- [YouTube](https://www.youtube.com/@ecgprintcast)
- [Spotify](https://open.spotify.com/show/4vtLgRAvS7AsFfPowGgwdG)
- [Instagram](https://www.instagram.com/ecg.printcast/)
- [Facebook](https://www.facebook.com/ecgprintcast/)

## Migração do WordPress

Este projeto foi migrado de um site WordPress existente. Todas as imagens, conteúdos e estrutura foram adaptados para Next.js mantendo fidelidade ao design original.

## Deploy

O site pode ser facilmente implantado em plataformas como:
- [Vercel](https://vercel.com) (recomendado)
- [Netlify](https://netlify.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## Licença

© 2025 ECG PrintCast. Todos os direitos reservados.
