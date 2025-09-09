import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cleaner} from '../cleaner';
import { CleanerService } from '../cleaner.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cleaner-add',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cleaner-add.component.html',
  styleUrl: './cleaner-add.component.css'
})
export class CleanerAddComponent {

  cleaner: Cleaner ={
    id:0,
    name:'',
    email:'',
    phoneNumber:''
  }
  //Connect to connect the cleaner Service component
  constructor(private cleanerService:CleanerService){}
  //Method called by the HTML button
  saveCleaner():void{
    //Read in the fields from the inputs
    const data={
      name:this.cleaner.name,
      email:this.cleaner.email,
      phoneNumber:this.cleaner.phoneNumber
    };
    //Submit the cleaner record to the Rest Controller
    this.cleanerService.create(data).subscribe(
      (data:Cleaner)=>this.cleanerService.onCleanerAdded.emit(data)
    );
  }
}
