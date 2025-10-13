import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Trashbins} from '../trashbins';
import { TrashbinsService } from '../trashbins.service';
import { ActivatedRoute, RouterLink,Router  } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { CleanerService } from '../../cleaners/cleaner.service';
import { Cleaner } from '../../cleaners/cleaner';
import { SensorService } from '../../sensors/sensor.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-Trashbins-add',
  standalone: true,
  imports: [GoogleMapsModule,FormsModule, RouterLink, CommonModule, MatFormFieldModule,MatSelectModule, ReactiveFormsModule],
  templateUrl: './trashbins-add.component.html',
  styleUrl: './trashbins-add.component.css'
})
export class TrashbinsAddComponent {
  center = { lat: 43.4673, lng: -79.7000 };
  markerPosition = { lat: 43.4673, lng: -79.7000 };

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

  
  // store an array of selected cleaners
  
  cleanersSelected = new FormControl<number[] | null>([]);
  sensorSelected = new FormControl<number | null>(null);
  //cleanersSelected = new FormControl<Cleaner[] | null>([]);
  cleanerList: Cleaner[] = [];
  availableSensors: any[] = []; 

  trashbins: Trashbins ={
    binId:0,
    name:'',
    height:0,
    createdDate:'',
    threshold: 0,
    cleanerIds: [],
    //cleaners: [],
    location: {
      address: '',
      latitude: 0,
      longitude: 0
    }
  };
  //Connect to connect the Trashbins Service component
  constructor(
    private trashbinsService: TrashbinsService,
    private cleanerService: CleanerService,
    private sensorService: SensorService,
    private router: Router
  ) {}
  ngOnInit(): void {
        // Load cleaners
        this.cleanerService.getAll().subscribe({
          next: (data) => {
            //console.log('cleaners loaded:', data);
            this.cleanerList = data;
          },
          error: (err) => {
            //console.error('Failed to load cleaners:', err);
          }
        });
        
        // Load available sensors only
        this.sensorService.getAvailable().subscribe(data => {
          this.availableSensors = data;
        });
      }

  updateMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };

      this.trashbins.location!.latitude = this.markerPosition.lat;
      this.trashbins.location!.longitude = this.markerPosition.lng;

      // get the address
      this.getAddressFromCoordinates(this.markerPosition.lat, this.markerPosition.lng);
    }
  }
  getAddressFromCoordinates(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        this.trashbins.location!.address = results[0].formatted_address;
      } else {
        this.trashbins.location!.address = `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }
    });
  }

  //Method called by the HTML button
  // trashbins-add.component.ts
  saveTrashbins(): void {
    //console.log("🔄 Starting save process...");
    //console.log("📝 Form data:", this.trashbins);
    //console.log("📝 Cleaner selected:", this.cleanersSelected.value,);

    const data = {
      name: this.trashbins.name,
      height: this.trashbins.height,
      createdDate: this.trashbins.createdDate,
      threshold: this.trashbins.threshold,
      cleanerIds: this.cleanersSelected.value ?? [],
      sensor: this.sensorSelected.value ? { id: this.sensorSelected.value } : null,
      location: {
        address: this.trashbins.location!.address,
        latitude: this.trashbins.location!.latitude,
        longitude: this.trashbins.location!.longitude }
    };

    //console.log("Sending data:", data);

    this.trashbinsService.create(data).subscribe({
      next: (response: Trashbins) => {
        console.log("SUCCESS! Response:", response);
        this.trashbinsService.onTrashbinsAdded.emit(response);
        alert("Trashbin saved successfully!");
        this.router.navigate(['/trashbins']);
      },
      error: (error) => {
        console.error("ERROR:", error);
        alert("Error saving trashbin: " + error.message);
      }
    });
  }

  }

