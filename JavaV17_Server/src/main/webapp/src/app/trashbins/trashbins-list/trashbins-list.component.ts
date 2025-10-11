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

  // Map options to hide unnecessary elements
  mapOptions: any = {
    disableDefaultUI: true,           // Hide all default controls
    zoomControl: true,                // Keep only zoom control
    mapTypeControl: false,            // Hide map type control
    scaleControl: false,              // Hide scale
    streetViewControl: false,         // Hide street view
    styles: [
      {
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]  // Hide business POI only
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]  // Hide transit stations
      }
    ]
  };


  // Selected trashbin for highlighting (table row only)
  selectedBinId: any = null;

  // Check if bin is full
  isBinFull(bin: Trashbins): boolean {
    return (bin.currentFillPercentage || 0) >= (bin.threshold || 80);
  }

  // Get marker title for tooltip
  getMarkerTitle(trashbin: Trashbins): string {
    return `${trashbin.name}\nFullness: ${trashbin.currentFillPercentage || 0}%\nAddress: ${trashbin.location?.address || 'No address'}`;
  }

  // Get marker options: red if full, green otherwise
  getMarkerOptions(trashbin: Trashbins) {
    const color = this.isBinFull(trashbin) ? '#F44336' : '#4CAF50';
    const iconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="white" stroke="${color}" stroke-width="2"/>
        <path transform="translate(12, 12)" fill="${color}" d="M9 3v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5V3H9zm0 5h2v9H9V8zm4 0h2v9h-2V8z"/>
      </svg>
    `);
    
    return {
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 40)
      }
    };
  }


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

  // Calculate number of full trashbins
  getFullBinsCount(): number {
    return this.trashbins.filter(bin => this.isBinFull(bin)).length;
  }

  // Switch filter (called when clicking cards)
  filterBy(filterType: string): void {
    this.activeFilter = filterType; // all or full
    this.applyFilters();
  }

  // Apply filters
  applyFilters(): void {
    if (this.activeFilter === 'full') {
      this.filteredTrashbins = this.trashbins.filter(bin => this.isBinFull(bin));
    } else {
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
    // Use the same filtered data as the table to ensure consistency
    return this.filteredTrashbins.filter(bin => this.hasLocation(bin));
  }

  // Get trashbin ID from backend
  private getTrashbinId(trashbin: Trashbins): any {
    return (trashbin as any).binID;
  }

  // Check if trashbin is selected
  isTrashbinSelected(trashbin: Trashbins): boolean {
    return this.getTrashbinId(trashbin) === (this.selectedBinId || '');
  }

  // Select trashbin when clicking table row
  selectTrashbin(trashbin: Trashbins): void {
    this.selectedBinId = this.getTrashbinId(trashbin);
    
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