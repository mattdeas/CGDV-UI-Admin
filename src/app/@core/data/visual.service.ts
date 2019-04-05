
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class VisualService {

  constructor(private http:HttpClient) {
  }
  
  getVisual(querystring): Observable<any> { 
    return this.http.get(API_URL+'api/visual'+querystring);
  }

  addVisual(visualData): Observable<any> {
    return this.http.post(API_URL+'api/visual',visualData);
  }

  updateVisual(viz_id, visualData): Observable<any> {
    return this.http.put(API_URL+'api/visual/'+viz_id, visualData);
  }
  
  deleteVisual(viz_id, querystring): Observable<any> {
    return this.http.delete(API_URL+'api/visual/'+viz_id+querystring);
  }

  //featured-visual page  
  setFeatured(viz_id, is_featured): Observable<any> {
    return this.http.put(API_URL+'api/visual/setFeatured',{'viz_id':viz_id, 'is_featured':is_featured});
  }
  //featured-visual page  


  getVizOfDay(querystring): Observable<any> {   
    return this.http.get(API_URL+'api/visual/getVizOfDay'+querystring);
  }

  getNotInVizOfDay(querystring): Observable<any> {   
    return this.http.get(API_URL+'api/visual/getNotInVizOfDay'+querystring);
  }

  setVizOfDay(viz_id, category_id, addFlag): Observable<any> {
    return this.http.put(API_URL+'api/visual/setVizOfDay',{'viz_id':viz_id, 'category_id':category_id, 'addFlag': addFlag});
  }
  

  upvoteVisual(viz_id): Observable<any> {
    return this.http.put(API_URL+'api/visual/upvote',{'viz_id':viz_id});
  }
}
