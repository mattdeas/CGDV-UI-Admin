import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../@core/data/common.service';
import { ToastService } from '../../../utils/toastr.service';
import { AppComponent } from '../../../app.component';

import { UploadService } from '../../../@core/data/upload.service';
import { VideoService } from '../../../@core/data/video.service';
import { CountryService } from '../../../@core/data/country.service';
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
              private countryService: CountryService,
              private sharedService: SharedService
              ) {}
  ngOnInit() {
    this.user = this.sharedService.getLoginUser();
    this.user_id = this.user.id;

    this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        if(this.id){
          var url = '?id='+this.id;
          this.commonService.getCountryList(url)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit  = true;
              this.model = res.result.data[0];
            }else{
              this.toasterService.showError(res.message);
              this.router.navigate(['/pages/country/list']);
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
      this.countryService.updateCountry(this.id, this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/country/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
          }else{
            this.toasterService.showError(res.message);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
    }else{      
      this.countryService.addCountry(this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/country/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
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


