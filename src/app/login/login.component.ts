import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  token: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.token) {
      // Simula un'azione di login (es. chiama il servizio per verificare il token)
      console.log('Login con token:', this.token);
    } else {
      alert('Per favore, inserisci un token.');
    }
  }
}