# Configuração da API do YouTube

Para exibir os últimos episódios do PrintCast no site, você precisa configurar a YouTube Data API v3.

## Passo a Passo

### 1. Criar um projeto no Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. Ative a **YouTube Data API v3**:
   - No menu lateral, vá em **APIs e Serviços** > **Biblioteca**
   - Pesquise por "YouTube Data API v3"
   - Clique em **Ativar**

### 2. Criar uma API Key

1. Vá em **APIs e Serviços** > **Credenciais**
2. Clique em **+ CRIAR CREDENCIAIS**
3. Selecione **Chave de API**
4. Copie a chave gerada

### 3. Restringir a API Key (Recomendado)

1. Clique na chave que você criou
2. Em **Restrições de aplicativo**, selecione:
   - **Referenciadores HTTP (sites)** e adicione seu domínio
   - OU **Endereços IP** (para desenvolvimento local)
3. Em **Restrições de API**, selecione:
   - **Restringir chave**
   - Marque apenas **YouTube Data API v3**
4. Salve

### 4. Obter o Channel ID

Existem várias formas de obter o ID do canal:

**Opção 1: Pela URL do canal**
- Se a URL é `https://www.youtube.com/@printcast`, o handle é `@printcast`
- Você precisará usar o handle ou converter para Channel ID

**Opção 2: Visualizar código-fonte**
1. Acesse o canal do YouTube
2. Clique com botão direito > Ver código-fonte
3. Procure por `"channelId":"` ou `"externalId":"`
4. O ID começa com `UC` (exemplo: `UCxxxxxxxxxxxxxx`)

**Opção 3: Usar uma ferramenta online**
- Acesse: https://commentpicker.com/youtube-channel-id.php
- Cole a URL do canal e obtenha o ID

### 5. Configurar as variáveis de ambiente

1. Abra o arquivo `.env.local` na raiz do projeto
2. Substitua os valores:

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=SuaAPIKeyAqui
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxx
```

### 6. Reiniciar o servidor

Após configurar, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Verificação

Se tudo estiver configurado corretamente, você verá os 8 últimos vídeos do canal na seção "Últimos episódios do PrintCast".

## Solução de Problemas

### Erro 403 (Forbidden)
- Verifique se a API está ativada no Google Cloud Console
- Confirme se a API Key está correta

### Erro 404 (Not Found)
- Verifique se o Channel ID está correto
- Certifique-se de que o ID começa com `UC`

### Vídeos não aparecem
- Abra o console do navegador (F12) e verifique erros
- Confirme que o canal tem vídeos públicos
- Verifique se as variáveis de ambiente estão corretas

## Limites da API

A YouTube Data API v3 tem uma cota diária gratuita de **10.000 unidades/dia**.
Cada busca consome aproximadamente **100 unidades**.

O componente está configurado com cache de **1 hora** para economizar quota.
