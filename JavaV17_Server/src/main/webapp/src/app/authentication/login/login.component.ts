import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Initialize login form with validation rules
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


    // Check if a form field is invalid and has been touched by the user
  isInvalid = (field: string) => {
    const f = this.loginForm.get(field);
    return !!(f?.invalid && f?.touched);
  }


  // Check if a form field has a specific validation error
  hasError = (field: string, error: string) => 
    !!this.loginForm.get(field)?.errors?.[error];


  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Invalid email or password';
      },
    });
  }
}
