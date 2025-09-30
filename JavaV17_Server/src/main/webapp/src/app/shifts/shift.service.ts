import { Injectable } from '@angular/core'; 
import { HttpClient } from "@angular/common/http"; 
import { Observable } from 'rxjs'; 
import { Shift } from './shift'; 
import { EventEmitter } from '@angular/core'; 
//Match the URL pattern in the @RestController 
const restUrl ='/api/shifts'; 
@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  //Constructor needed to connect to web services. 
  constructor(private http:HttpClient) { } 
  onShiftAdded = new EventEmitter<Shift>(); 
  //Create a connection to the GET mapping in the  
  //rest controller that returns a collection of Shifts. 
  getAll(): Observable<Shift[]>{ 
    return this.http.get<Shift[]>(restUrl); 
  } 
  //Create a connection to the POST mapping in the 
  //rest controller.  "data" will be the new Shift. 
  create(data:any):Observable<any>{ 
    return this.http.post(restUrl, data); 
  } 
}
