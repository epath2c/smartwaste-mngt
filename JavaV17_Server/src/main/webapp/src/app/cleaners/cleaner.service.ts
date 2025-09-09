import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Cleaner } from './cleaner';


const restUrl ='/api/cleaners';

@Injectable({
  providedIn: 'root'
})

export class CleanerService {

  // Constructor needed to connect to web services
  constructor(private http:HttpClient) { }
  onCleanerAdded = new EventEmitter<Cleaner>();

  // Create a connection to the GET mapping in the rest controller that returns a collection of cleaners 
  getAll(): Observable<Cleaner[]>{
    return this.http.get<Cleaner[]>(restUrl);
  }

  // Create a connection to the POST mapping in the rest controller. "data" will be the new Cleaner
  create(data:any):Observable<any>{
    return this.http.post(restUrl, data);
  }
}
