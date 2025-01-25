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
      this.authService.setToken(this.token);
    } else {
      // handle the case when token is undefined
      console.error('Token is undefined');
    }
    this.router.navigate(['/users']);
  }
}