
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

let counter = 0;

@Injectable()
export class ChallengeService {

  constructor(private http:HttpClient) {
    // this.userArray = Object.values(this.users);
  }
  
  getVideo(querystring): Observable<any> { 
    return this.http.get(API_URL+'api/video'+querystring);
  }

  getChallenge(querystring): Observable<any> { 
    return this.http.get(API_URL+'api/challenge'+querystring);
  }

  addVideo(videoData): Observable<any> {
    return this.http.post(API_URL+'api/video',videoData);
  }

  addChallenge(videoData): Observable<any> {
    return this.http.post(API_URL+'api/challenge',videoData);
  }
  updateVideo(id, videoData): Observable<any> {
    return this.http.put(API_URL+'api/video/'+id, videoData);
  }

  updateChallenge(id, challengeData): Observable<any> {
    return this.http.put(API_URL+'api/challenge/'+id, challengeData);
  }
  
  deleteVideo(id): Observable<any> {
    return this.http.delete(API_URL+'api/video/'+id);
  }
  
  deleteChallenge(id): Observable<any> {
    console.log("in deletechallenge");
    return this.http.delete(API_URL+'api/challenge/'+id);
  }
  
  
}
