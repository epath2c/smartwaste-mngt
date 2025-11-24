import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  userEmail$: Observable<string | null>;
  showLogoutModal = false;

  // 🌗 theme state
  isDarkMode = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.userEmail$ = this.authService.getUserEmail();
  }

  ngOnInit(): void {
    // On the server there is no window/localStorage
    if (typeof window === 'undefined') {
      return;
    }

    // read saved theme, or fallback to system preference
    const saved = window.localStorage.getItem('theme');
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const useDark = saved ? saved === 'dark' : prefersDark;
    this.applyTheme(useDark);
  }

  // called when user clicks the toggle button
  toggleTheme(): void {
    this.applyTheme(!this.isDarkMode);
  }

  // actually apply theme to <html data-theme="...">
  private applyTheme(dark: boolean): void {
    this.isDarkMode = dark;

    // again, guard for SSR
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }

  logout() {
    this.authService.logout();
    this.showLogoutModal = true;
    this.router.navigate(['/']);
  }

  closeModal() {
    this.showLogoutModal = false;
  }
}
