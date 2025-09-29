import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Sensor } from './sensor';
import { EventEmitter } from '@angular/core';

//Match the URL pattern in the @RestController
const restUrl ='/api/sensors';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

//Constructor needed to connect to web services.
constructor(private http:HttpClient) { }
onSensorAdded = new EventEmitter<Sensor>();
//Create a connection to the GET mapping in the
//rest controller that returns a collection of Sensors.
getAll(): Observable<Sensor[]>{
return this.http.get<Sensor[]>(restUrl);
}
//Create a connection to the POST mapping in the
//rest controller. "data" will be the new Sensor.
create(data:any):Observable<any>{
return this.http.post(restUrl, data);
}

//Get available sensors (not assigned to trash bins)
getAvailable(): Observable<any[]>{
return this.http.get<any[]>(`${restUrl}/available`);
}
}
