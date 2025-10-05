import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.errorMessage = '';
    this.loading = true;

    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']); // redirect to login page after registration
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = err.error?.message || 'Registration failed';
      },
    });
  }
}
