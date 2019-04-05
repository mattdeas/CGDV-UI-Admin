import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../@core/data/common.service';
import { ToastService } from '../../../utils/toastr.service';
import { AppComponent } from '../../../app.component';

import { UniversityService } from '../../../@core/data/university.service';
import { SharedService } from '../../../utils/shared.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddComponent {
  API_URL = environment.apiUrl;
  isEdit  = false;
  user: any;
  user_id: any;
  id: any;
  page_title;
  model: any = {};
  universityList:any = [];
  countryList:any = [];
  
  constructor(private toasterService: ToastService,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router,
              private universityService: UniversityService,
              private sharedService: SharedService
              ) {}
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
        this.model.country_id = params['country_id'];
        this.id = params['id'];

        if(this.id){
          var url = '?id='+this.id;
          this.commonService.getUniversityList(url)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit  = true;
              this.model = res.result.data[0];
            }else{
              this.toasterService.showError(res.message); 
              this.router.navigate(['/pages/university/list']);
            }
          },
      (error) => {        
        this.toasterService.showError(error);
      });
        }
    });

    this.page_title = this.route.snapshot.data.title;

  }
  onSubmit() {
    if(this.isEdit){
      this.universityService.updateUniversity(this.id, this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/university/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
          }else{
            this.toasterService.showError(res.message);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
    }else{      
      this.universityService.addUniversity(this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/university/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
          }else{
            this.toasterService.showError(res.message);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
    }
  }
}


