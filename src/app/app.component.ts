import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  showNavbar: boolean = true;
  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    // Ascolta i cambiamenti di route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Nascondi la navbar se la route è "/login"
        this.showNavbar = event.url !== '/login';
      }
    });
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
