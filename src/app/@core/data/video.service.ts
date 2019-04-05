
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class VideoService {

  constructor(private http:HttpClient) {
  }
  
  getVideo(querystring): Observable<any> { 
    return this.http.get(API_URL+'api/video'+querystring);
  }

  addVideo(videoData): Observable<any> {
    return this.http.post(API_URL+'api/video',videoData);
  }

  updateVideo(id, videoData): Observable<any> {
    return this.http.put(API_URL+'api/video/'+id, videoData);
  }
  
  deleteVideo(id): Observable<any> {
    return this.http.delete(API_URL+'api/video/'+id);
  }

  
}
