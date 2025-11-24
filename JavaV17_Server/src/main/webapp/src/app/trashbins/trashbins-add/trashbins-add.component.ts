import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Trashbins} from '../trashbins';
import { TrashbinsService } from '../trashbins.service';
import { RouterLink,Router  } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { CleanerService } from '../../cleaners/cleaner.service';
import { Cleaner } from '../../cleaners/cleaner';
import { SensorService } from '../../sensors/sensor.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Sensor } from '../../sensors/sensor';

@Component({
  selector: 'app-Trashbins-add',
  standalone: true,
  imports: [GoogleMapsModule,FormsModule, RouterLink, CommonModule, MatFormFieldModule,MatSelectModule, ReactiveFormsModule],
  templateUrl: './trashbins-add.component.html',
  styleUrl: './trashbins-add.component.css'
})
export class TrashbinsAddComponent implements OnInit {
  trashbinForm!: FormGroup;
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

  cleanerList: Cleaner[] = [];
  availableSensors: any[] = [];
  locationAddress = '';

  constructor(
    private trashbinsService: TrashbinsService,
    private cleanerService: CleanerService,
    private sensorService: SensorService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialize form with validation rules
    this.trashbinForm = this.fb.group({
      name: ['', [Validators.required]],
      height: [0, [Validators.required, Validators.min(0.01)]],
      createdDate: [''],
      threshold: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      cleaners: [[], [Validators.required]],
      cleanerIds : [],
      sensor: [null]
    });

    // Load cleaners
    this.cleanerService.getAll().subscribe({
      next: (data) => {
        this.cleanerList = data;
      },
      error: (err) => {
        console.error('Failed to load cleaners:', err);
      }
    });

    // Load available sensors
    this.sensorService.getAvailable().subscribe(data => {
      this.availableSensors = data;
    });
  }

  // Check if a form field is invalid and has been touched by the user
  isInvalid = (field: string) => {
    const f = this.trashbinForm.get(field);
    return !!(f?.invalid && f?.touched);
  }

  // Check if a form field has a specific validation error
  hasError = (field: string, error: string) =>
    !!this.trashbinForm.get(field)?.errors?.[error];

  updateMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.getAddressFromCoordinates(this.markerPosition.lat, this.markerPosition.lng);
    }
  }

  getAddressFromCoordinates(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        this.locationAddress = results[0].formatted_address;
      } else {
        this.locationAddress = `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }
    });
  }

  saveTrashbins(): void {
    if (this.trashbinForm.invalid) {
      this.trashbinForm.markAllAsTouched();
      return;
    }

    const { name, height, createdDate, threshold, cleaners, sensor } = this.trashbinForm.value;

    const data = {
      name,
      height,
      createdDate,
      threshold,
      cleanerIds: cleaners,
      sensor: sensor ? { id: sensor } : null,
      location: {
        address: this.locationAddress,
        latitude: this.markerPosition.lat,
        longitude: this.markerPosition.lng
      }
    };

    this.trashbinsService.create(data).subscribe({
      next: (response: Trashbins) => {
        this.trashbinsService.onTrashbinsAdded.emit(response);
        alert("Trashbin saved successfully!");
        this.router.navigate(['view/trashbins']);
      },
      error: (error) => {
        alert("Error saving trashbin: " + error.message);
      }
    });
  }
}

