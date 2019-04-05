import { Component } from '@angular/core';
import { CMSService } from '../../../@core/data/cms.service';
import { ToastService } from '../../../utils/toastr.service';

@Component({
  selector: 'ngx-about_aboutpage',
  styleUrls: ['./about_aboutpage.component.scss'],
  templateUrl: './about_aboutpage.component.html',
})
export class AboutAboutpageComponent {
   model: any = {};
   isEdit = false;
   isAdd = false;
   showAddBtn = false;
   showEditBtn = false;
  constructor(private cmsService : CMSService,
  			private toasterService: ToastService,) {
  }
   ngOnInit() {
  	this.getAbout();  
  }
  getAbout(){
  	this.cmsService.getAboutAboutpage()
          .subscribe((res: any) => {
            if(res.status){
              this.model = res.result[0];
              this.showEditBtn = true;
            }else{              
              this.showAddBtn = true;
            }
          },
      (error) => {        
        this.toasterService.showError(error);
      });
  }
  cancel(){
	   this.model = {};
	   this.isEdit = false;
	   this.isAdd = false;
	   this.showAddBtn = false;
	   this.showEditBtn = false;
	   this.getAbout();
  }
  onSubmit(){
  	if(this.isEdit){
  		this.cmsService.updateAboutAboutpage(this.model)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit = false;
   			  this.isAdd = false;
            }
          },
      (error) => {        
        this.toasterService.showError(error);
      });
  	}else{

  	this.cmsService.addAboutAboutpage(this.model)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit = false;
   			  this.isAdd = false;
   			  this.showEditBtn = true;
   			  this.showAddBtn = false;
            }
          },
      (error) => {        
        this.toasterService.showError(error);
      });
  	}
  }
}
