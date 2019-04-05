
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class CategoryService {
  constructor(private http:HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  addCategory(data): Observable<any> {
     return this.http.post(API_URL+'api/category',data);
  }

  updateCategory(id, data): Observable<any> {
     return this.http.put(API_URL+'api/category/'+id,data);
  }

  deleteCategory(id): Observable<any> {
     return this.http.delete(API_URL+'api/category/'+id);
  }
}
