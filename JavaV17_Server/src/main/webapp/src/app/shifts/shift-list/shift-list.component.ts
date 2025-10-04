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
    //Update the list of students with the web service info.
    getShifts(): void{
    this.shiftService.getAll().subscribe({
    next: (data) =>{
    this.shifts=data;
    }
    });
    }
    //Connect to the Web Service
    constructor(private shiftService: ShiftService){} // <-- Use the correct type
    ngOnInit():void{
      this.getShifts();
    }
}
