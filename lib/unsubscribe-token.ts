import crypto from "crypto";

const SECRET = process.env.UNSUBSCRIBE_SECRET || "your-secret-key-change-this";

/**
 * Gera um token único para descadastramento baseado no email
 * Este token permite que apenas o dono do email possa se descadastrar
 */
export function generateUnsubscribeToken(email: string): string {
  const timestamp = Date.now();
  const data = `${email}:${timestamp}`;
  const hash = crypto.createHmac("sha256", SECRET).update(data).digest("hex");

  // Token = email:timestamp:hash (codificado em base64)
  const token = Buffer.from(`${email}:${timestamp}:${hash}`).toString("base64url");
  return token;
}

/**
 * Valida e decodifica o token de descadastramento
 * Retorna o email se válido, null se inválido ou expirado
 */
export function validateUnsubscribeToken(token: string): string | null {
  try {
    // Decodifica o token
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const [email, timestampStr, hash] = decoded.split(":");

    if (!email || !timestampStr || !hash) {
      return null;
    }

    const timestamp = parseInt(timestampStr, 10);

    // Verifica se o token não está expirado (válido por 30 dias)
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > thirtyDaysInMs) {
      return null;
    }

    // Verifica se o hash está correto
    const data = `${email}:${timestamp}`;
    const expectedHash = crypto.createHmac("sha256", SECRET).update(data).digest("hex");

    if (hash !== expectedHash) {
      return null;
    }

    return email;
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return null;
  }
}
