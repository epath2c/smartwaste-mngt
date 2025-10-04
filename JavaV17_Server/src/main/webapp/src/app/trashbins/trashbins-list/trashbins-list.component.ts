import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { Trashbins } from '../trashbins';
import { TrashbinsService } from '../trashbins.service';

@Component({
  selector: 'app-trashbins-list',
  standalone: true,
  imports: [RouterLink, GoogleMapsModule],
  templateUrl: './trashbins-list.component.html',
  styleUrl: './trashbins-list.component.css'
})
export class TrashbinsListComponent implements OnInit {
  // Data
  trashbins: Trashbins[] = [];
  filteredTrashbins: Trashbins[] = [];
  
  // Filter state
  activeFilter = 'all'; // 'all' or 'full'
  
  // Map configuration
  mapCenter = { lat: 43.4691, lng: -79.7003 }; // Sheridan College
  mapZoom = 15;

  constructor(
    private trashbinsService: TrashbinsService,
    private router: Router
  ) {}

  // Load data when component initializes
  ngOnInit(): void {
    this.getTrashbins();
  }

  // Get trashbins data from server
  getTrashbins(): void {
    this.trashbinsService.getAll().subscribe({
      next: (data) => {
        this.trashbins = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to get data:', err);
      }
    });
  }

  // Get total number of trashbins
  getTotalBinsCount(): number {
    return this.trashbins.length;
  }

  // Calculate number of full trashbins (based on each bin's threshold)
  getFullBinsCount(): number {
    return this.trashbins.filter(bin => 
      (bin.currentFillPercentage || 0) >= (bin.threshold || 80)
    ).length;
  }

  // Switch filter (called when clicking cards)
  filterBy(filterType: string): void {
    this.activeFilter = filterType; // all or full
    this.applyFilters();
  }

  // Apply filters
  applyFilters(): void {
    if (this.activeFilter === 'full') {
      // Show only full trashbins (based on each bin's threshold)
      this.filteredTrashbins = this.trashbins.filter(bin => 
        (bin.currentFillPercentage || 0) >= (bin.threshold || 80)
      );
    } else {
      // Show all trashbins
      this.filteredTrashbins = [...this.trashbins];
    }
    
    // Sort by fill percentage from high to low
    this.filteredTrashbins.sort((a, b) => 
      (b.currentFillPercentage || 0) - (a.currentFillPercentage || 0)
    );
  }

  // Add new trashbin
  addTrashbin(): void {
    this.router.navigate(['/add/trashbins']);
  }

  // Check if trashbin has valid location coordinates
  hasLocation(trashbin: Trashbins): boolean {
    return !!(trashbin.location?.latitude && trashbin.location?.longitude);
  }

  // Get trashbins with location (auto display)
  get trashbinsWithLocation(): Trashbins[] {
    return this.trashbins.filter(bin => this.hasLocation(bin));
  }

  // Select trashbin when clicking table row
  selectTrashbin(trashbin: Trashbins): void {
    if (this.hasLocation(trashbin)) {
      this.mapCenter = {
        lat: trashbin.location!.latitude!,
        lng: trashbin.location!.longitude!
      };
      this.mapZoom = 18;
    }
  }

  // Mark cleaned functionality (for future use)
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