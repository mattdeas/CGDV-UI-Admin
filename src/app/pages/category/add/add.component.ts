import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../@core/data/common.service';
import { ToastService } from '../../../utils/toastr.service';
import { AppComponent } from '../../../app.component';

import { CategoryService } from '../../../@core/data/category.service';
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
  countryList:any = [];
  
  constructor(private toasterService: ToastService,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private sharedService: SharedService
              ) {}
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
        this.model.type = params['type'];
        this.id = params['id'];

        if(this.id){
          var url = '?id='+this.id;
          this.commonService.getCategoryList(url)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit  = true;
              this.model = res.result.data[0];
            }else{
              this.toasterService.showToast('error', 'Data not found.',''); 
              this.router.navigate(['/pages/category/list']);
            }
          },
      (error) => {        
        let errMsg = 'Error';
        if(error && error.error && error.error.message){
          errMsg = error.error.message;
        }else if(error && error.message){
          errMsg = error.message;
        }
        this.toasterService.showToast('error', '',errMsg);
      });
        }
    });

    this.page_title = this.route.snapshot.data.title;

  }
  onSubmit() {
    if(this.isEdit){
      this.categoryService.updateCategory(this.id, this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/category/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
          }else{
            this.toasterService.showError(res.message);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
    }else{      
      this.categoryService.addCategory(this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/category/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
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


