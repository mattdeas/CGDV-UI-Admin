
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class CommonService {
  constructor(private http:HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  getCategoryList(url): Observable<any> {
     return this.http.get(API_URL+'api/category'+url);
  }

  getCountryList(url): Observable<any> {
     return this.http.get(API_URL+'api/country'+url);
  }

  getUniversityList(url): Observable<any> {
     return this.http.get(API_URL+'api/university'+url);
  }
}
