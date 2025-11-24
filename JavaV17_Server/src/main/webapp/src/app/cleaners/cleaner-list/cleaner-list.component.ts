import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cleaner } from '../cleaner';
import { CleanerService } from '../cleaner.service';
import { Shift } from '../../shifts/shift';
import { ShiftService } from '../../shifts/shift.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cleaner-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './cleaner-list.component.html',
  styleUrl: './cleaner-list.component.css',
})
export class CleanerListComponent implements OnInit {
  cleaners: Cleaner[] = [];
  shiftList: Shift[] = [];

  shiftsSelected = new FormControl<number[] | null>([]);
  cleaner: Cleaner = {
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    shiftIds: [],
    isEdit: false,
  };

  constructor(
    private cleanerService: CleanerService,
    private shiftService: ShiftService
  ) {}

  ngOnInit(): void {
    this.getCleaners();
    this.cleanerService.onCleanerAdded.subscribe((data: Cleaner) =>
      this.cleaners.push(data)
    );
    this.shiftService.getAll().subscribe({
      next: (data) => {
        //console.log('shifts loaded:', data);
        this.shiftList = data;
      },
      error: (err) => {
        //console.error('Failed to load shifts:', err);
      },
    });
    this.shiftsSelected.valueChanges.subscribe((value) => {
      //console.log('Selected shift IDs changed:', value);
    });
  }

  getCleaners(): void {
    this.cleanerService.getAll().subscribe({
      next: (data) => {
        this.cleaners = data.map((c) => ({ ...c, isEdit: false }));
      },
      error: (err) => {
        console.error('Failed to load cleaner history:', err);
      },
    });
  }
  deleteCleaner(id: number): void {
    if (confirm('Are you sure you want to delete ' + id + '?')) {
      this.cleanerService.delete(id).subscribe(() => {
        this.cleaners = this.cleaners.filter((p) => p.id !== id);
      });
    }
  }

  onEdit(cleaner: Cleaner) {
    cleaner.isEdit = true;

    // Make sure shiftIds exists
    cleaner.shiftIds = [];

    // Build shiftIds from cleaner.shifts (if there is a 'shifts' array)
    if (cleaner.shifts && cleaner.shifts.length > 0) {
      for (const shift of cleaner.shifts) {
        cleaner.shiftIds.push(shift.id!);
      }
    }

    // Detach the reference and store a backup copy
    this.cleaner = {
      ...cleaner,
      shiftIds: [...(cleaner.shiftIds ?? [])],
    };

    // Set the selected values in the FormControl for the dropdown
    this.shiftsSelected.setValue(cleaner.shiftIds ?? []);
  }

  onCancle(cleaner: Cleaner) {
    cleaner.isEdit = false;
    // restore the original values
    cleaner.name = this.cleaner.name;
    cleaner.email = this.cleaner.email;
    cleaner.phoneNumber = this.cleaner.phoneNumber;
    cleaner.shiftIds = this.cleaner.shiftIds;
  }
  onUpdate(id: number, updatedCleaner: Cleaner): void {
    const data = {
      name: updatedCleaner.name,
      email: updatedCleaner.email,
      phoneNumber: updatedCleaner.phoneNumber,
      shiftIds: this.shiftsSelected.value ?? [],
    };
    if (confirm('Are you sure you want to edit ' + id + '?')) {
      this.cleanerService.update(id, data).subscribe({
        next: () => {
          alert('Cleaner Updated');
          this.getCleaners();
          this.cleaner.isEdit = false;
          this.shiftsSelected.setValue([]);
        },
        error: (err) => {
          console.error('Failed to update cleaner:', err);
        },
      });
    }
  }
}
