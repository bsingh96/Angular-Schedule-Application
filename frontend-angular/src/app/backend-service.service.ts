import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

    appUrl = 'http://www.localhost:3000/api/courses/subject'
  constructor(private _http: HttpClient) { 

  
    
  }
}
