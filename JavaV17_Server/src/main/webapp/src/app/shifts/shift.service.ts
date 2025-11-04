import { Injectable } from '@angular/core'; 
import { HttpClient } from "@angular/common/http"; 
import { Observable } from 'rxjs'; 
import { Shift } from './shift'; 
import { EventEmitter } from '@angular/core'; 
import { DayOfWeek } from './day-of-week';
import { ShiftTime } from './shift-time';
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
  getAllDayOfWeek(): Observable<DayOfWeek[]>{ 
    return this.http.get<DayOfWeek[]>(`${restUrl}/dayOfWeek`);
  } 
  getAllShiftTime(): Observable<ShiftTime[]>{
    return this.http.get<ShiftTime[]>(`${restUrl}/shiftTime`);
  }
  //Create a connection to the POST mapping in the 
  //rest controller.  "data" will be the new Shift. 
  create(data:any):Observable<any>{ 
    return this.http.post(restUrl, data); 
  }
  delete(id: number): Observable<void> {
	  return this.http.delete<void>(`${restUrl}/${id}`);
	}

  update(id: number, data: any): Observable<Shift> {
	  return this.http.put<Shift>(`${restUrl}/${id}`, data);
	} 
}
