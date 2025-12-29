# ECG PrintCast - Website

Site oficial do **PrintCast**, o podcast queridinho da indústria gráfica.

## 🚀 Tecnologias

- **Next.js 16** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **React Icons** - Ícones
- **Resend** - Envio de emails (Newsletter)
- **YouTube Data API v3** - Integração com vídeos

## ✨ Funcionalidades

✅ Design responsivo (mobile-first)  
✅ Header fixo com navegação  
✅ Hero section fullscreen  
✅ Formulário de newsletter funcional  
✅ Carrossel automático de patrocinadores  
✅ Integração com YouTube (últimos 8 vídeos)  
✅ Seção sobre o podcast  
✅ Apresentação da equipe  
✅ Formulário de contato  
✅ Links para redes sociais  

## 📦 Instalação

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Edite o .env.local com suas credenciais

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## ⚙️ Configuração

### 1. YouTube API

Para exibir os últimos episódios do canal, configure a YouTube Data API v3.

📖 **Guia completo**: [YOUTUBE_SETUP.md](./YOUTUBE_SETUP.md)

### 2. Newsletter (Resend)

Para receber inscrições da newsletter, configure o Resend.

📖 **Guia completo**: [NEWSLETTER_SETUP.md](./NEWSLETTER_SETUP.md)

## 📝 Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm start        # Iniciar em produção
npm run lint     # Lint
```

## 🚢 Deploy

Recomendado: **Vercel**

1. Faça push para GitHub
2. Importe na Vercel
3. Configure as variáveis de ambiente
4. Deploy automático!

---

Desenvolvido com ❤️ para a indústria gráfica
