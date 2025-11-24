import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Trashbins } from '../trashbins';
import { TrashbinsService } from '../trashbins.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { CleanerService } from '../../cleaners/cleaner.service';
import { Cleaner } from '../../cleaners/cleaner';
import { SensorService } from '../../sensors/sensor.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Sensor } from '../../sensors/sensor';

@Component({
  selector: 'app-trashbin-edit',
  standalone: true,
  imports: [
    GoogleMapsModule,
    FormsModule,
    RouterLink,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './trashbin-edit.component.html',
  styleUrl: './trashbin-edit.component.css',
})
export class TrashbinEditComponent implements OnInit {
  trashbin: Trashbins = new Trashbins();
  binId = 0;
  center = { lat: 43.4673, lng: -79.7 };
  markerPosition = { lat: 43.4673, lng: -79.7 };

  // Map options to hide unnecessary elements
  mapOptions: any = {
    disableDefaultUI: true, // Hide all default controls
    zoomControl: true, // Keep only zoom control
    mapTypeControl: false, // Hide map type control
    scaleControl: false, // Hide scale
    streetViewControl: false, // Hide street view
    styles: [
      {
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }], // Hide business POI only
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }], // Hide transit stations
      },
    ],
  };

  // store an array of selected cleaners

  cleanersSelected = new FormControl<number[] | null>([]);
  sensorSelected = new FormControl<number | null>(null);
  //cleanersSelected = new FormControl<Cleaner[] | null>([]);
  cleanerList: Cleaner[] = [];
  availableSensors: any[] = [];

  //Connect to connect the Trashbins Service component
  constructor(
    private trashbinsService: TrashbinsService,
    private cleanerService: CleanerService,
    private sensorService: SensorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
  this.binId = Number(this.route.snapshot.paramMap.get('id'));

  this.trashbinsService.getBinByBinId(this.binId).subscribe({
    next: (data) => {
      //console.log('trashbin has been loaded', { data });
      this.trashbin = data;
      this.trashbin.cleanerIds = []
      if (this.trashbin.cleaners && this.trashbin.cleaners.length > 0 ){
          for (const cleaner of this.trashbin.cleaners) {
            this.trashbin.cleanerIds.push(cleaner.id!);
          }
      }

      if (this.trashbin.cleanerIds && this.trashbin.cleanerIds.length > 0) {
        this.cleanersSelected.setValue(this.trashbin.cleanerIds);
      }

      console.log(this.trashbin.sensor)
      if (this.trashbin.sensor && this.trashbin.sensor.id) {
        this.sensorSelected.setValue(this.trashbin.sensor.id);
      }

      // Auto-center map to trashbin location
      if (this.trashbin.location && this.trashbin.location.latitude && this.trashbin.location.longitude) {
        this.center = {
          lat: this.trashbin.location.latitude,
          lng: this.trashbin.location.longitude
        };
        this.markerPosition = {
          lat: this.trashbin.location.latitude,
          lng: this.trashbin.location.longitude
        };
      }

    },
    error: (err) => {
      //console.error('Failed to load trashbin:', err);
    },
  });

  // 2. Load Cleaners
  this.cleanerService.getAll().subscribe({
    next: (data) => {
      //console.log('cleaners loaded:', data);
      this.cleanerList = data;
    },
    error: (err) => {
      //console.error('Failed to load cleaners:', err);
    },
  });

  // 3. Available sensors 
  this.sensorService.getAll().subscribe((data) => {
    this.availableSensors = data;
  });

  //console.log('this is bin id', this.binId);
}


  updateMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      this.trashbin.location!.latitude = this.markerPosition.lat;
      this.trashbin.location!.longitude = this.markerPosition.lng;

      // get the address
      this.getAddressFromCoordinates(
        this.markerPosition.lat,
        this.markerPosition.lng
      );
    }
  }

  getAddressFromCoordinates(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        this.trashbin.location!.address = results[0].formatted_address;
      } else {
        this.trashbin.location!.address = `Location at ${lat.toFixed(
          4
        )}, ${lng.toFixed(4)}`;
      }
    });
  }

  //Method called by the HTML button
  // trashbins-add.component.ts
  updateTrashbins(): void {
    //console.log("🔄 Starting save process...");
    //console.log("📝 Form data:", this.trashbins);
    //console.log("📝 Cleaner selected:", this.cleanersSelected.value,);

    const data = {
      binId: this.trashbin.binId,
      name: this.trashbin.name,
      height: this.trashbin.height,
      createdDate: this.trashbin.createdDate,
      threshold: this.trashbin.threshold,
      cleanerIds: this.cleanersSelected.value ?? [],
      sensor: this.sensorSelected.value ? { id: this.sensorSelected.value } : null,
      location: {
        address: this.trashbin.location!.address,
        latitude: this.trashbin.location!.latitude,
        longitude: this.trashbin.location!.longitude,
      },
    };

    //console.log('Sending data:', data);

    this.trashbinsService.update(this.binId, data).subscribe({
      next: (response: Trashbins) => {
        //console.log('SUCCESS! Response:', response);
        this.trashbinsService.onTrashbinsAdded.emit(response);
        alert('Trashbin edited successfully!');
        this.router.navigate(['view/trashbins']);
      },
      error: (error) => {
        //console.error('ERROR:', error);
        alert('Error updating trashbin: ' + error.message);
      },
    });
  }
}
