import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private router: Router) {}

  // Salva il token nel local storage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Recupera il token dal local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Rimuove il token dal local storage (logout)
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Controlla se l'utente è autenticato
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}