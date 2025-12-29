# Guia de Debug: SEO e Open Graph

## 🔍 Problemas Identificados e Soluções

### ✅ Problema 1: Rich Results não valida

**Causa**: O componente `<PodcastSchema />` estava dentro de `<head>`, mas no Next.js App Router não podemos usar `<head>` diretamente.

**Solução aplicada**:
- Movido `<PodcastSchema />` para dentro do `<body>`
- O script JSON-LD funciona tanto no `<head>` quanto no `<body>`
- Google aceita ambas as posições

**Como verificar se está funcionando**:

1. **Após o deploy**, acesse a URL do site
2. Clique com botão direito → "Ver código-fonte" (ou Ctrl/Cmd+U)
3. Procure por `application/ld+json`
4. Você deve ver algo assim:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": "ECG PrintCast",
  ...
}
</script>
```

**Validar Rich Results**:
- URL: https://search.google.com/test/rich-results
- Cole a URL do site (não o HTML)
- Aguarde a análise
- Deve aparecer "PodcastSeries" detectado

---

### ✅ Problema 2: Imagem Open Graph não aparece

**Causas identificadas**:
1. Imagem muito grande: 2848x1504px (deveria ser 1200x630)
2. Arquivo muito pesado: 5.1MB (deveria ser < 1MB)
3. Possível erro de cache das redes sociais

**Soluções aplicadas**:

#### 1. Imagem otimizada:
- ✅ Redimensionada para **1200x630px** (tamanho correto)
- ✅ Comprimida para **1.0MB** (ainda pode melhorar)
- ✅ Backup da original salvo em `og-image-original.png`

#### 2. Como otimizar ainda mais (opcional):

**Opção A: Comprimir online** (mais fácil)
1. Baixe a imagem: `/public/images/og-image.png`
2. Acesse: https://tinypng.com/
3. Faça upload da imagem
4. Baixe a versão comprimida (deve ficar < 500KB)
5. Substitua a imagem

**Opção B: Converter para JPG**
- JPG geralmente fica menor que PNG
- Se a imagem não precisa de transparência, use JPG
- Atualize o código em `app/layout.tsx`:
  ```typescript
  url: "/images/og-image.jpg",
  ```

---

## 🧪 Como Testar Open Graph Corretamente

### 1. **Limpar Cache do Facebook** (Muito Importante!)

O Facebook cacheia imagens por até 7 dias. Se você mudou a imagem, precisa forçar atualização:

**Facebook Debugger**:
1. Acesse: https://developers.facebook.com/tools/debug/
2. Cole a URL: `https://ecgprintcast.com.br`
3. Clique em **"Debug"**
4. **IMPORTANTE**: Clique em **"Scrape Again"** várias vezes (2-3x)
5. Veja o preview da imagem

Se a imagem não aparecer:
- Verifique se o arquivo existe: `https://ecgprintcast.com.br/images/og-image.png`
- Verifique se as dimensões estão corretas: 1200x630
- Aguarde 5-10 minutos e tente novamente

---

### 2. **Twitter Card Validator**

**URL**: https://cards-dev.twitter.com/validator

1. Cole a URL do site
2. Clique em "Preview card"
3. Deve aparecer a imagem em tamanho grande

**Se não aparecer**:
- Twitter pode demorar até 7 dias para atualizar cache
- Não tem botão "Scrape Again" como Facebook
- Alternativa: mude o nome da imagem e atualize o código

---

### 3. **LinkedIn Post Inspector**

**URL**: https://www.linkedin.com/post-inspector/

1. Cole a URL do site
2. Clique em "Inspect"
3. Veja o preview

**Se não aparecer**:
- Clique em "Inspect" novamente (força atualização)
- LinkedIn é mais rápido que Twitter

---

### 4. **WhatsApp (Teste Real)**

WhatsApp usa Open Graph também:

1. Abra WhatsApp Web ou mobile
2. Cole o link: `https://ecgprintcast.com.br`
3. Aguarde o preview carregar
4. Deve aparecer título, descrição e imagem

**Se não aparecer**:
- Aguarde 10-20 segundos
- Tente em outro chat
- WhatsApp pode demorar alguns minutos

---

### 5. **OpenGraph.xyz (Teste Universal)**

**URL**: https://www.opengraph.xyz/

1. Cole a URL do site
2. Veja preview em múltiplas plataformas
3. Verifica Facebook, Twitter, LinkedIn, Discord, etc.

---

## 📋 Checklist de Debug

Use esta lista para verificar tudo:

### Antes do Deploy:
- [ ] Imagem og-image.png tem 1200x630px
- [ ] Imagem og-image.png tem < 1MB (ideal < 500KB)
- [ ] Imagem está em `/public/images/og-image.png`
- [ ] Código em `app/layout.tsx` aponta para `/images/og-image.png`
- [ ] `npm run validate:seo` passa sem erros

### Após o Deploy:
- [ ] Site está acessível: `https://ecgprintcast.com.br`
- [ ] Imagem está acessível: `https://ecgprintcast.com.br/images/og-image.png`
- [ ] Ver código-fonte mostra meta tags Open Graph
- [ ] Ver código-fonte mostra script JSON-LD
- [ ] Facebook Debugger mostra imagem (após "Scrape Again")
- [ ] Twitter Card Validator mostra imagem
- [ ] LinkedIn Inspector mostra imagem
- [ ] WhatsApp mostra preview com imagem

### Rich Results:
- [ ] https://search.google.com/test/rich-results detecta PodcastSeries
- [ ] Nenhum erro ou aviso
- [ ] Todos os campos obrigatórios presentes

---

## 🚨 Problemas Comuns

### "Facebook mostra imagem antiga"
**Solução**:
1. Facebook Debugger → "Scrape Again" (3-5 vezes)
2. Aguarde 5 minutos
3. Tente novamente
4. Se não funcionar, mude o nome da imagem:
   - Renomeie para `og-image-v2.png`
   - Atualize código em `layout.tsx`

### "Imagem não carrega (404)"
**Solução**:
1. Verifique se arquivo existe: `ls public/images/og-image.png`
2. Verifique se não está em subpasta errada
3. Faça novo deploy
4. Limpe cache do CDN (Vercel/Netlify)

### "Rich Results não detecta nada"
**Solução**:
1. Ver código-fonte da página
2. Procurar por `application/ld+json`
3. Se não aparecer: problema no componente PodcastSchema
4. Se aparecer: copie o JSON e cole em https://validator.schema.org/
5. Corrija erros apontados

### "Imagem aparece cortada"
**Solução**:
1. Certifique-se que é exatamente 1200x630px
2. Proporção deve ser 1.91:1
3. Use ferramenta online para redimensionar corretamente
4. Evite texto nas bordas (área segura de 10%)

---

## 🔧 Comandos Úteis

```bash
# Validar SEO localmente
npm run validate:seo

# Otimizar imagem Open Graph
./scripts/optimize-og-image.sh

# Verificar dimensões da imagem
file public/images/og-image.png

# Verificar tamanho da imagem
du -h public/images/og-image.png

# Build de produção
npm run build

# Testar localmente
npm run dev
# Depois acesse: http://localhost:3000
```

---

## 📊 Especificações Corretas

### Imagem Open Graph:
- **Dimensões**: 1200 x 630 pixels (exato)
- **Proporção**: 1.91:1
- **Formato**: PNG ou JPG
- **Tamanho**: < 1MB (ideal < 500KB)
- **Qualidade**: 85% (JPG) ou PNG-8
- **Nome**: `og-image.png` ou `og-image.jpg`
- **Local**: `/public/images/`

### Meta Tags Open Graph:
```typescript
openGraph: {
  title: "...",                    // Max 60 caracteres
  description: "...",              // Max 200 caracteres
  url: "https://ecgprintcast.com.br",
  siteName: "ECG PrintCast",
  images: [{
    url: "/images/og-image.png",
    width: 1200,
    height: 630,
    alt: "Descrição da imagem"
  }],
  locale: "pt_BR",
  type: "website"
}
```

---

## ✅ Status Atual

Após as correções:
- ✅ PodcastSchema movido para `<body>` (funciona corretamente)
- ✅ Imagem redimensionada: 1200x630px
- ✅ Imagem comprimida: 1.0MB (pode melhorar para < 500KB)
- ✅ Backup salvo: `og-image-original.png`

**Próximos passos**:
1. Fazer novo deploy
2. Aguardar 5-10 minutos
3. Testar com Facebook Debugger (Scrape Again!)
4. Testar Rich Results
5. Se imagem ainda estiver grande, comprimir mais com TinyPNG

---

**Dica**: Após o deploy, aguarde alguns minutos antes de testar. CDNs e redes sociais precisam de tempo para atualizar cache.
