import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { ToastService } from '../../../utils/toastr.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  API_URL = environment.apiUrl;
  isEdit  = false;
  user: any;
  user_id: any;
  title: any;
  model: any = {};  
  constructor(private toasterService: ToastService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              ) {}
  
  ngOnInit() {    
    this.route.queryParams.subscribe(params => {
        this.user_id = params['id'];        
    });
  }

  

  onSubmit() {
    this.userService.changeUserPassword(this.user_id,this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/user/list']);
          }else{
            this.toasterService.showError(res.messge);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
  }
}
