import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '../@theme/components/auth';
import { environment } from '../../environments/environment';
@Injectable()
export class SharedService{
    user: any;
    API_URL = environment.apiUrl;
    constructor(private authService: NbAuthService){
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable           
          this.user.avatar = this.API_URL+this.user.avatar || 'assets/images/default.jpeg';
        }

      });
    }

    setLoginUser(data: any){
      this.user.avatar = this.API_URL+data.avatar || 'assets/images/default.jpeg';
      this.user.firstname = data.firstname;
      this.user.lastname = data.lastname;
      this.user.username = data.firstname+" "+data.lastname;
    }

    getLoginUser(){
      return this.user;
    }
      // All validation strings    
    validationError = 'Validation Error';
    somethingWentWrong = 'Something went wrong';
    internalServerError = 'Internal server error';
    loginRequired = 'Login required';
    badRequest = 'Bad request';
    updateSuccess = 'Updated successfully';
    addedSuccess = 'Added successfully';
    deleteSucc = 'Deleted successfully';
    attachFile = 'Browse a file';
}