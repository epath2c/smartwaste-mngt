import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Shift } from '../shift';
import { ShiftService } from '../shift.service'; 
import { DayOfWeek } from '../day-of-week';
import { ShiftTime } from '../shift-time';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-shift-list',
  imports: [FormsModule, RouterLink,  CommonModule, ReactiveFormsModule],
  templateUrl: './shift-list.component.html',
  styleUrl: './shift-list.component.css'
})
export class ShiftListComponent {
    shifts: Shift[]=[];
    shift: Shift ={
      id: 0,
      dayOfWeek: "",
      shiftTime: "",
      isEdit: false 
    }
   dayOfWeek: DayOfWeek[] = [];
   shiftTime: ShiftTime[] = [];
       constructor(
      private shiftService: ShiftService
  ) {}
      ngOnInit(): void {
        this.getShifts();
        this.shiftService.onShiftAdded.subscribe((data: Shift)=> this.shifts.push(data));
        this.shiftService.getAllDayOfWeek().subscribe({
          next: (data) => {
            //console.log('Day of Week loaded:', data);
            this.dayOfWeek = data;
            
          },
          error: (err) => {
            //console.error('Failed to load shifts:', err);
          }
        });

        this.shiftService.getAllShiftTime().subscribe({
          next: (data) => {
            //console.log('shift Time loaded:', data);
            this.shiftTime = data;
            
          },
          error: (err) => {
            //console.error('Failed to load shifts:', err);
          }
        });
      }


    //Update the list of students with the web service info.
    getShifts(): void{
      this.shiftService.getAll().subscribe({
      next: (data) =>{
      this.shifts=data;
      }
      });
    }
    onEdit(shift: Shift){
      shift.isEdit = true;
      // detatch the reference 
      this.shift = { ...shift };
    }
    deleteShift(id: number): void {
      if (confirm('Are you sure you want to delete ' + id + '?')) {
        this.shiftService.delete(id).subscribe(() => {
          this.shifts = this.shifts.filter((p) => p.id !== id);
        });
      }
    }

    onCancel(shift: Shift){
      shift.isEdit = false;
      shift.dayOfWeek = this.shift.dayOfWeek;
      shift.shiftTime = this.shift.shiftTime;
    }

    onUpdate(id: number, updatedshift: Shift): void {
      const data = {
        dayOfWeek: updatedshift.dayOfWeek,
        shiftTime: updatedshift.shiftTime
        };

      if (confirm('Are you sure you want to edit ' + id + '?')) {
        this.shiftService.update(id, data).subscribe({
          next: () => {
          alert("Shift Updated")
          this.getShifts(); 
          this.shift.isEdit = false;
          }
          ,error: (err) => {
              console.error('Failed to update shift:', err);
            }
          
        });
      }
    }
}
