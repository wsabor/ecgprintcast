"use client";

import { useState, useEffect } from "react";

const AUTH_KEY = "printcast_admin_auth";
const NEXT_PUBLIC_AUTH_PASSWORD = process.env.NEXT_PUBLIC_AUTH_PASSWORD;
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 horas em milissegundos

interface AuthData {
  isAuthenticated: boolean;
  expiresAt: number;
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação no localStorage ao carregar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem(AUTH_KEY);
        if (authData) {
          const parsed: AuthData = JSON.parse(authData);
          const now = Date.now();

          // Verificar se a sessão ainda é válida
          if (parsed.isAuthenticated && parsed.expiresAt > now) {
            setIsAuthenticated(true);
          } else {
            // Sessão expirada, limpar
            localStorage.removeItem(AUTH_KEY);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        localStorage.removeItem(AUTH_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (password: string): boolean => {
    if (password === NEXT_PUBLIC_AUTH_PASSWORD) {
      const authData: AuthData = {
        isAuthenticated: true,
        expiresAt: Date.now() + SESSION_DURATION,
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
