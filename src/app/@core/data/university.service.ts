
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class UniversityService {
  constructor(private http:HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  addUniversity(data): Observable<any> {
     return this.http.post(API_URL+'api/university',data);
  }

  updateUniversity(id, data): Observable<any> {
     return this.http.put(API_URL+'api/university/'+id,data);
  }

  deleteUniversity(id): Observable<any> {
     return this.http.delete(API_URL+'api/university/'+id);
  }
}
