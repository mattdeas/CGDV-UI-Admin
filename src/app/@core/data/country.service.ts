
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class CountryService {
  constructor(private http:HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  addCountry(data): Observable<any> {
     return this.http.post(API_URL+'api/country',data);
  }

  updateCountry(id, data): Observable<any> {
     return this.http.put(API_URL+'api/country/'+id,data);
  }

  deleteCountry(id): Observable<any> {
     return this.http.delete(API_URL+'api/country/'+id);
  }
}
