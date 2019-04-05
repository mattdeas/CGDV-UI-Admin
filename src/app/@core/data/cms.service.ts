
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class CMSService {
  constructor(private http:HttpClient) {
    // this.userArray = Object.values(this.users);
  }
  //About - Homepage
  getAboutHomepage(): Observable<any> {
     return this.http.get(API_URL+'api/cms/homepage_about');
  }

  addAboutHomepage(data): Observable<any> {
     return this.http.post(API_URL+'api/cms/homepage_about',data);
  }

  updateAboutHomepage(data): Observable<any> {
     return this.http.put(API_URL+'api/cms/homepage_about',data);
  }
  //About - Homepage

  //VideoSection - Homepage
  getVideoSection(): Observable<any> {
     return this.http.get(API_URL+'api/cms/homepage_video_section');
  }

  addVideoSection(data): Observable<any> {
     return this.http.post(API_URL+'api/cms/homepage_video_section',data);
  }

  updateVideoSection(data): Observable<any> {
     return this.http.put(API_URL+'api/cms/homepage_video_section',data);
  }
  //VideoSection - Homepage


  //About - Aboutpage
  getAboutAboutpage(): Observable<any> {
     return this.http.get(API_URL+'api/cms/aboutpage_about');
  }

  addAboutAboutpage(data): Observable<any> {
     return this.http.post(API_URL+'api/cms/aboutpage_about',data);
  }

  updateAboutAboutpage(data): Observable<any> {
     return this.http.put(API_URL+'api/cms/aboutpage_about',data);
  }
  //About - Aboutpage

  //News
  getNewsList(url): Observable<any> {
     return this.http.get(API_URL+'api/cms/news'+url);
  }

  addNews(data): Observable<any> {
     return this.http.post(API_URL+'api/cms/news/',data);
  }

  updateNews(id, data): Observable<any> {
     return this.http.put(API_URL+'api/cms/news/'+id,data);
  }

  deleteNews(id): Observable<any> {
     return this.http.delete(API_URL+'api/cms/news/'+id);
  }
  //News


  //Partner
  getPartnerList(url): Observable<any> {
     return this.http.get(API_URL+'api/cms/partner'+url);
  }

  addPartner(data): Observable<any> {
     return this.http.post(API_URL+'api/cms/partner/',data);
  }

  updatePartner(id, data): Observable<any> {
     return this.http.put(API_URL+'api/cms/partner/'+id,data);
  }

  deletePartner(id): Observable<any> {
     return this.http.delete(API_URL+'api/cms/partner/'+id);
  }
  //Partner

  //Journey
  getJourneyList(url): Observable<any> {
     return this.http.get(API_URL+'api/cms/journey'+url);
  }

  addJourney(data): Observable<any> {
     return this.http.post(API_URL+'api/cms/journey/',data);
  }

  updateJourney(id, data): Observable<any> {
     return this.http.put(API_URL+'api/cms/journey/'+id,data);
  }

  deleteJourney(id): Observable<any> {
     return this.http.delete(API_URL+'api/cms/journey/'+id);
  }
  //Journey
  
}
