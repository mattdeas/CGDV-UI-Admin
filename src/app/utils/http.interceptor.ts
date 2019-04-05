import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';
import { NbAuthService } from '../@theme/components/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { SharedService } from './shared.service';
import {catchError} from "rxjs/internal/operators";
@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor(public authService: NbAuthService, private router: Router, private sharedService: SharedService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.getToken()
      .subscribe((data: any) => {        
        request = request.clone({
          setHeaders: {
            'x-access-token': data.token 
          }
        });
      })
    

   return next.handle(request).pipe(catchError((err, caught) =>{
        let errorData: any;
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 0:
              errorData = this.sharedService.somethingWentWrong;
              break;
            case 400:
              errorData = ' ';                                        // handle Bad request
              if (err.error.error && err.error.error.constructor === Array) {
                err.error.error.map((obj) => {
                  errorData += ' *' + obj.message;
                });
              } else if (err.error.message) {
                errorData = err.error.message;
              } else {
                errorData = this.sharedService.badRequest;
              }
              break;
            case 401:                                           // handle Authentication Error
              errorData = [err.error.message] || [this.sharedService.loginRequired];              
              // this.global.logout();
              // this.router.navigate(['auth/logout']);
              break;
            case 404:                                           // handle not found error
              errorData = this.sharedService.somethingWentWrong;
              break;
            case 500:                                           // handle internal server error
              errorData = this.sharedService.internalServerError;
              break;
            default:                                            // handle other error
              errorData = err.error.message;
              if (!errorData && !err.status) {
                errorData = this.sharedService.somethingWentWrong;
              } else if (!errorData) {
                errorData = err.status + ' ' + err.statusText;
              }
          }
          console.log('errorData',errorData)
          return Observable.throw(errorData);
        } else {
          return Observable.throw(this.sharedService.somethingWentWrong);
        }
      }) as any);   
  }
}