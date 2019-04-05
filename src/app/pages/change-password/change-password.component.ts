import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { ToastService } from '../../utils/toastr.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  API_URL = environment.apiUrl;  
  title: any;
  model: any = {};  
  constructor(private toasterService: ToastService,
              private userService: UserService,
              private router: Router,
              ) {}
  
  ngOnInit() {    
  }
  goToHome(){
    this.router.navigate(['/']);
  }
  onSubmit() {
    this.userService.changePassword(this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.toasterService.showToast('success', 'Password Change successfully',res.message ); 
            this.router.navigate(['/auth/logout']);
          }else{
            this.toasterService.showError(res.message);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
  }
}
