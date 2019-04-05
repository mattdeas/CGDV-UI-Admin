/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule }  from '@angular/forms'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from  './@theme/components/auth';
import { AuthGuard } from './utils/auth-guard.service';
import { SuperAuthGuard } from './utils/super-auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPInterceptor } from './utils/http.interceptor';
import { SharedService } from './utils/shared.service';
import { ToastService } from './utils/toastr.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDatepickerModule, MatNativeDateModule,
    FormsModule, ReactiveFormsModule,
    ToasterModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),  
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
            name: 'email',
            token: {
               class: NbAuthJWTToken,

               key: 'result.token', // this parameter tells where to look for the token
             },

            baseEndpoint: environment.apiUrl + 'api',
            login: {
              endpoint: '/auth/admin/login',
              method: 'post',
            },
            // register: {
            //   endpoint: '/admin/register',
            //   method: 'post',
            // },
            logout: {
              endpoint: '/auth/logout',
              method: 'post',
            },
            requestPass: {
              endpoint: '/password/forgot',
              method: 'post',
            },
            resetPass: {
              endpoint: '/password/reset',
              method: 'post',
            },
           }),
         ],
         forms: {           
         },
       }), 
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    SuperAuthGuard,
    SharedService,
    ToastService,
    MatDatepickerModule, MatNativeDateModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptor,
      multi: true
    }
  ],
})
export class AppModule {
}
