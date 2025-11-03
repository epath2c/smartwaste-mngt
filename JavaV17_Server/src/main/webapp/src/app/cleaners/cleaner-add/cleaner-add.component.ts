import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cleaner} from '../cleaner';
import { CleanerService } from '../cleaner.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
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
export class CleanerAddComponent {

  shiftList: Shift[] = []; 
  shiftsSelected = new FormControl<number[] | null>([]);
  cleaner: Cleaner ={
    id:0,
    name:'',
    email:'',
    phoneNumber:'',
    shiftIds: []
  }
  //Connect to connect the cleaner Service component
  constructor(private cleanerService:CleanerService, private shiftService:ShiftService, private router: Router ){}


  ngOnInit(): void {
        this.shiftService.getAll().subscribe({
          next: (data) => {
            //console.log('shifts loaded:', data);
            this.shiftList = data;
          },
          error: (err) => {
            //console.error('Failed to load shifts:', err);
          }
        });
        this.shiftsSelected.valueChanges.subscribe(value => {
          //console.log('Selected shift IDs changed:', value);
        });
      }
  //Method called by the HTML button
  saveCleaner():void{
    //Read in the fields from the inputs
    const data={
      name:this.cleaner.name,
      email:this.cleaner.email,
      phoneNumber:this.cleaner.phoneNumber,
      shiftIds: this.shiftsSelected.value ?? []
    };
    //Submit the cleaner record to the Rest Controller
    this.cleanerService.create(data).subscribe({
      next: (response: Cleaner) => {
        //console.log("SUCCESS! Response:", response);
        this.cleanerService.onCleanerAdded.emit(response);
        alert("Cleaner saved successfully!");
        this.router.navigate(['/view/cleaners']);
      },
      error: (error) => {
        //console.error("ERROR:", error);
        alert("Error saving cleaner: " + error.message);
      }
    });
  }
}
