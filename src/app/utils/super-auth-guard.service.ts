import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import { SharedService } from './shared.service';

@Injectable()
export class SuperAuthGuard implements CanActivate {

  constructor(private router: Router, private sharedService: SharedService, private location: Location) {
    
  }
  user: any;
  canActivate(route: ActivatedRouteSnapshot): boolean {    
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    this.user =this.sharedService.getLoginUser();
    if (this.user.type != expectedRole) {
      this.location.back()
      return false;
    }
    return true;    
  } 
}