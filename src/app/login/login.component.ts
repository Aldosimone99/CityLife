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
    // Simula un'azione di login con qualsiasi token
    this.authService.login(this.token || 'fake-token');
    this.router.navigate(['/dashboard']);
  }
}