// filepath: /Users/aldosimone/Documents/GitHub/CityLife/src/app/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../app/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private translate: TranslateService
  ) {}

  logout() {
    this.localStorageService.removeItem('token'); // Rimuove il token usando il servizio LocalStorageService
    this.router.navigate(['/login']); // Reindirizza alla pagina di login
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}