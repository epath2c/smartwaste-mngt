import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cleaner} from '../cleaner';
import { CleanerService } from '../cleaner.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ShiftService } from '../../shifts/shift.service';
import { Shift } from '../../shifts/shift';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cleaner-add',
  standalone: true,
  imports: [FormsModule, RouterLink, MatFormFieldModule, CommonModule, MatSelectModule, ReactiveFormsModule ],
  templateUrl: './cleaner-add.component.html',
  styleUrl: './cleaner-add.component.css'
})
export class CleanerAddComponent implements OnInit {
  cleanerForm!: FormGroup;
  shiftList: Shift[] = [];

  constructor(
    private cleanerService: CleanerService,
    private shiftService: ShiftService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialize form with validation rules
    this.cleanerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      shifts: [[]]
    });

    // Load available shifts
    this.shiftService.getAll().subscribe({
      next: (data) => {
        this.shiftList = data;
      },
      error: (err) => {
        console.error('Failed to load shifts:', err);
      }
    });
  }

  // Check if a form field is invalid and has been touched by the user
  isInvalid = (field: string) => {
    const f = this.cleanerForm.get(field);
    return !!(f?.invalid && f?.touched);
  }

  // Check if a form field has a specific validation error
  hasError = (field: string, error: string) => 
    !!this.cleanerForm.get(field)?.errors?.[error];

  saveCleaner(): void {
    if (this.cleanerForm.invalid) {
      this.cleanerForm.markAllAsTouched();
      return;
    }

    const { name, email, phoneNumber, shifts } = this.cleanerForm.value;
    const data = { name, email, phoneNumber, shiftIds: shifts };

    this.cleanerService.create(data).subscribe({
      next: (response: Cleaner) => {
        this.cleanerService.onCleanerAdded.emit(response);
        alert("Cleaner saved successfully!");
        this.router.navigate(['/view/cleaners']);
      },
      error: (error) => {
        alert("Error saving cleaner: " + error.message);
      }
    });
  }
}
