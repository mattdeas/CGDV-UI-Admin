import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CMSService } from '../../../../@core/data/cms.service';
import { ToastService } from '../../../../utils/toastr.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngx-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class NewsAddComponent {
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
              private cmsService: CMSService,
              private route: ActivatedRoute,
              private router: Router,
              ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        if(this.id){
          var url = '?id='+this.id;
          this.cmsService.getNewsList(url)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit  = true;
              this.model = res.result.data[0];
            }else{
              this.toasterService.showError(res.message);
              this.router.navigate(['/pages/cms/home/news/list']);
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
      this.cmsService.updateNews(this.id, this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/cms/home/news/list']);
          }else{
            this.toasterService.showError(res.message);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
    }else{      
      this.cmsService.addNews(this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/cms/home/news/list']);
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


