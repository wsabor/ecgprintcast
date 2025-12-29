# Quick Start - Newsletter

## Passo 1: Instalar o pacote Resend

Execute no terminal:

```bash
npm install resend
```

## Passo 2: Criar conta no Resend

1. Acesse: https://resend.com/signup
2. Crie sua conta
3. Vá para https://resend.com/api-keys
4. Crie uma API Key
5. **Copie a chave** (só aparece uma vez!)

## Passo 3: Configurar variáveis de ambiente

Abra o arquivo `.env.local` e adicione suas credenciais:

```env
# Resend API Configuration (Newsletter)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx  # Cole sua chave aqui
NEWSLETTER_EMAIL_TO=seu-email@exemplo.com  # Seu email para receber notificações
```

## Passo 4: Reiniciar o servidor

```bash
# Pare o servidor (Ctrl+C)
# Rode novamente:
npm run dev
```

## Passo 5: Testar

1. Acesse: http://localhost:3000
2. Vá até a seção da newsletter
3. Preencha Nome e Email
4. Clique em **"Quero ser avisado"**
5. Verifique seu email! 📧

## ✅ Pronto!

Agora a newsletter está funcionando!

### Próximos passos (opcional):

- [ ] Verificar um domínio próprio no Resend
- [ ] Criar uma Audience para gerenciar inscritos
- [ ] Adicionar CAPTCHA para evitar spam

📖 Para mais detalhes, veja: [NEWSLETTER_SETUP.md](./NEWSLETTER_SETUP.md)
