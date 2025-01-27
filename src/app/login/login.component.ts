import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  token: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  onSubmit() {
    if (this.token) {
      // Simula un'azione di login (es. chiama il servizio per verificare il token)
      console.log('Login con token:', this.token);
    } else {
      alert('Per favore, inserisci un token.');
    }
  }
}