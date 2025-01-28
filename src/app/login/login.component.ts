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
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  onSubmit() {
    if (!this.token) {
      this.translate.get('PLEASE_INSERT_TOKEN').subscribe((res: string) => {
        this.errorMessage = res;
      });
      return;
    }

    this.authService.login(this.token).subscribe(
      () => {
        this.authService.setToken(this.token!);
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Invalid token', error);
        this.translate.get('INVALID_TOKEN').subscribe((res: string) => {
          this.errorMessage = res;
        });
      }
    );
  }
}