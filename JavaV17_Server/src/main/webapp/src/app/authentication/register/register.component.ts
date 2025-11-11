import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Initialize registration form with validation rules
    // Password must be at least 6 characters and contain one uppercase letter
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z]).+$/)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  //Check if a form field is invalid and has been touched by the user
  isInvalid = (field: string) => {
    const f = this.registerForm.get(field);
    return !!(f?.invalid && f?.touched);
  }


  // Check if a form field has a specific validation error
  hasError = (field: string, error: string) => 
    !!this.registerForm.get(field)?.errors?.[error];

  passwordsMatch = () => 
    this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Check if passwords match
    if (!this.passwordsMatch()) {
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }

 
    this.errorMessage = '';
    this.loading = true;
    const { email, password } = this.registerForm.value;

    this.authService.register(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed';
      },
    });
  }
}
