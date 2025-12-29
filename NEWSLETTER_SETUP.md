# Configuração da Newsletter com Resend

A newsletter do PrintCast usa o serviço **Resend** para enviar emails. Siga este guia para configurar.

## Passo a Passo

### 1. Instalar o pacote Resend

```bash
npm install resend
```

### 2. Criar conta no Resend

1. Acesse: https://resend.com/
2. Clique em **Sign Up** (ou **Start Building for Free**)
3. Crie sua conta (pode usar GitHub, Google ou email)
4. Confirme seu email

### 3. Obter a API Key

1. Após fazer login, vá para: https://resend.com/api-keys
2. Clique em **Create API Key**
3. Dê um nome (ex: "PrintCast Newsletter")
4. Selecione as permissões: **Sending access** (Full access)
5. Clique em **Add**
6. **COPIE A CHAVE AGORA** (ela só aparece uma vez!)

### 4. Configurar variáveis de ambiente

Abra o arquivo `.env.local` e configure:

```env
# Resend API Configuration (Newsletter)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
NEWSLETTER_EMAIL_TO=seu-email@exemplo.com
```

- **RESEND_API_KEY**: A chave que você copiou no passo anterior
- **NEWSLETTER_EMAIL_TO**: O email onde você quer receber as notificações de inscrição

### 5. Verificar domínio (Opcional mas Recomendado)

Por padrão, o Resend envia emails de `onboarding@resend.dev`. Para usar seu próprio domínio:

1. Vá para: https://resend.com/domains
2. Clique em **Add Domain**
3. Digite seu domínio (ex: `printcast.com.br`)
4. Adicione os registros DNS fornecidos no seu provedor de domínio
5. Aguarde a verificação (pode levar até 48h)

Depois de verificado, atualize o arquivo `/app/api/newsletter/route.ts`:

```typescript
from: "PrintCast <newsletter@seudominio.com.br>",
```

### 6. Reiniciar o servidor

Após configurar, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Como Funciona

1. **Usuário preenche o formulário** no componente Mic
2. **Dados são enviados** para `/api/newsletter`
3. **API valida** os dados (nome e email)
4. **Resend envia email** para o endereço configurado em `NEWSLETTER_EMAIL_TO`
5. **Usuário recebe feedback** (sucesso ou erro)

## Estrutura dos Arquivos

```
app/
├── api/
│   └── newsletter/
│       └── route.ts          # API Route que processa o formulário
├── components/
│   ├── Mic.tsx               # Componente principal
│   └── NewsletterForm.tsx    # Formulário interativo (client-side)
```

## Gerenciando Inscritos

O sistema atual envia um email para você cada vez que alguém se inscreve. Para gerenciar melhor sua lista:

### Opção 1: Salvar em Banco de Dados

Você pode integrar com um banco de dados (Supabase, MongoDB, etc.) para salvar os inscritos.

### Opção 2: Usar Resend Audiences (Recomendado)

1. Vá para: https://resend.com/audiences
2. Crie uma **Audience** (lista de contatos)
3. Modifique `/app/api/newsletter/route.ts` para adicionar contatos à audience:

```typescript
await resend.contacts.create({
  email: email,
  firstName: name,
  audienceId: 'sua_audience_id_aqui',
});
```

### Opção 3: Integrar com serviço de Email Marketing

- **Mailchimp**: Use a API do Mailchimp
- **ConvertKit**: Use a API do ConvertKit
- **Google Sheets**: Salve em uma planilha

## Limites do Plano Gratuito

O Resend oferece gratuitamente:
- **3.000 emails/mês**
- **100 emails/dia**
- 1 domínio verificado

Para mais, veja os planos: https://resend.com/pricing

## Testando

1. Acesse o site: http://localhost:3000
2. Vá até a seção da newsletter
3. Preencha Nome e Email
4. Clique em **"Quero ser avisado"**
5. Verifique se recebeu o email de notificação

## Solução de Problemas

### Erro 401 (Unauthorized)
- Verifique se a `RESEND_API_KEY` está correta no `.env.local`
- Certifique-se de que reiniciou o servidor após adicionar a chave

### Email não chega
- Verifique a pasta de spam
- Confirme que `NEWSLETTER_EMAIL_TO` está correto
- Verifique o console do terminal para erros

### Erro "Email inválido"
- O formulário valida o formato do email
- Certifique-se de usar um email válido (ex: `nome@dominio.com`)

## Segurança

- ✅ `.env.local` está no `.gitignore` (nunca será commitado)
- ✅ API Key é server-side only (não exposta ao cliente)
- ✅ Validação de dados no backend
- ✅ Rate limiting recomendado para produção

## Melhorias Futuras

- [ ] Adicionar CAPTCHA para evitar spam
- [ ] Implementar rate limiting
- [ ] Salvar inscritos em banco de dados
- [ ] Email de confirmação (double opt-in)
- [ ] Página de cancelamento de inscrição
- [ ] Dashboard para gerenciar inscritos

## Recursos

- Documentação Resend: https://resend.com/docs
- API Reference: https://resend.com/docs/api-reference/introduction
- Exemplos: https://resend.com/docs/examples
