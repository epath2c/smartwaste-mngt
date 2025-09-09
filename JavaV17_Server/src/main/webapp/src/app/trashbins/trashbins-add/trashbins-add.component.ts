import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Trashbins} from '../trashbins';
import { TrashbinsService } from '../trashbins.service';
import { ActivatedRoute, RouterLink,Router  } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-Trashbins-add',
  standalone: true,
  imports: [GoogleMapsModule,FormsModule, RouterLink],
  templateUrl: './trashbins-add.component.html',
  styleUrl: './trashbins-add.component.css'
})
export class TrashbinsAddComponent {
  center = { lat: 43.4673, lng: -79.7000 };
  markerPosition = { lat: 43.4673, lng: -79.7000 };

  trashbins: Trashbins ={
    binId:0,
    name:'',
    height:0,
    createdDate:'',
    location: {
      address: '',
      latitude: 0,
      longitude: 0
    }
}

  //Connect to connect the Trashbins Service component
  constructor(
    private trashbinsService: TrashbinsService,
    private router: Router
  ) {}

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
    console.log("🔄 Starting save process...");
    console.log("📝 Form data:", this.trashbins);

    const data = {
      name: this.trashbins.name,
      height: this.trashbins.height,
      createdDate: this.trashbins.createdDate,
      location: {
        address: this.trashbins.location!.address,
        latitude: this.trashbins.location!.latitude,
        longitude: this.trashbins.location!.longitude }
    };

    console.log("Sending data:", data);

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

