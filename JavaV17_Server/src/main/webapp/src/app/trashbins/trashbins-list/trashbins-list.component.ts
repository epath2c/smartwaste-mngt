import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trashbins } from '../trashbins';
import { TrashbinsService } from '../trashbins.service';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-trashbins-list',
  standalone: true,
  imports: [RouterLink,GoogleMapsModule],
  templateUrl: './trashbins-list.component.html',
  styleUrl: './trashbins-list.component.css'
})
export class TrashbinsListComponent implements OnInit {
  trashbins: Trashbins[] = [];
  @Input() id = 0;

  constructor(private trashbinsService: TrashbinsService) {}

  ngOnInit(): void {
    this.getTrashbins();
    this.trashbinsService.onTrashbinsAdded.subscribe(
      (data: Trashbins) => this.trashbins.push(data)
    );
  }

  getTrashbins(): void {
    this.trashbinsService.getAll().subscribe({
      next: (data) => {
        this.trashbins = data;
      },
      error: (err) => {
        console.error('Failed to load trashbin history:', err);
      }
    });
  }

  // Mark cleaned functionality (for future use )
  /*
  markCleaned(bin: Trashbins): void {
    const id = bin.binId || (bin as any).binID;
    if (!id) {
      console.error('No bin ID found');
      return;
    }
    
    this.trashbinsService.markCleaned(id).subscribe({
      next: (updated) => {
        console.log('Bin marked as cleaned, alert timer reset');
        // Refresh the list to show updated data
        this.getTrashbins();
      },
      error: (err) => {
        console.error('Failed to mark cleaned:', err);
      }
    });
  }
  */
}
