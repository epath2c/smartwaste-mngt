import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Shift } from '../shift';
import { ShiftService } from '../shift.service'; 

@Component({
  selector: 'app-shift-list',
  imports: [RouterLink],
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

    constructor(
      private shiftService: ShiftService
  ) {}
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

    onCancle(shift: Shift){
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
