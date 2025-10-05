import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  isLoggedIn$: Observable<boolean>;
  showLogoutModal = false;
  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
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
