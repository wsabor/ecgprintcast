"use server";

export async function verifyPassword(password: string): Promise<boolean> {
  return password === process.env.AUTH_PASSWORD;
}
