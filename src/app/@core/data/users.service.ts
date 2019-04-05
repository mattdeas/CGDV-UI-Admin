
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

let counter = 0;

@Injectable()
export class UserService {

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };

  private userArray: any[];

  constructor(private http:HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  getUsers(querystring): Observable<any> {   
    return this.http.get(API_URL+'api/user'+querystring);
  }

  addUser(userData): Observable<any> {
    return this.http.post(API_URL+'api/user/register',userData);
  }

  getUserData(user_id): Observable<any> {
    return this.http.get(API_URL+'api/user/'+user_id);
  }

  updateUser(user_id, userData): Observable<any> {
    return this.http.put(API_URL+'api/user/'+user_id, userData);
  }
  
  deactivateUsers(user_id): Observable<any> {
    return this.http.delete(API_URL+'api/user/'+user_id);
  }


  togglebadge(userData): Observable<any> {
    return this.http.put(API_URL+'api/user/badges', userData);
  }  

  setInTeam(userData): Observable<any> {
    return this.http.put(API_URL+'api/user/inTeam', userData);
  }  

  
  changePassword(data): Observable<any> {
    return this.http.post(API_URL+'api/password/change', data);
  }
  changeUserPassword(id, data): Observable<any> {
    return this.http.post(API_URL+'api/password/admin/change/'+id, data);
  }
  
  
}
