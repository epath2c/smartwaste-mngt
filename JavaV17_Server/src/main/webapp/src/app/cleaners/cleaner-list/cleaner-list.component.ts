import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {Cleaner} from '../cleaner';
import {CleanerService} from '../cleaner.service';
import { Shift } from '../../shifts/shift';

@Component({
  selector: 'app-cleaner-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cleaner-list.component.html',
  styleUrl: './cleaner-list.component.css'
})
export class CleanerListComponent implements OnInit {
    cleaners: Cleaner[] = [];
    
  @Input() id = 0;
  constructor(
    private cleanerService: CleanerService,
  ) {}

  ngOnInit(): void {
    this.getCleaners();
    this.cleanerService.onCleanerAdded.subscribe(
      (data:Cleaner)=>this.cleaners.push(data)
      );
  }

  getCleaners(): void {
    this.cleanerService.getAll().subscribe({
      next: (data) => {
        this.cleaners = data;

      },
      error: (err) => {
        console.error('Failed to load cleaner history:', err);
      }
    });
  }
	  deleteCleaner(id: number): void {
      if (confirm("Are you sure you want to delete " + id + "?")){

        this.cleanerService.delete(id).subscribe(() => {
	      this.cleaners = this.cleaners.filter((p) => p.id !== id);
	    });
      } 

	  }
    // need to implement 
	  editCleaner(id: number): void {
      if (confirm("Are you sure you want to delete " + id + "?")){

        this.cleanerService.delete(id).subscribe(() => {
	      this.cleaners = this.cleaners.filter((p) => p.id !== id);
	    });
      } 

	  }
}
