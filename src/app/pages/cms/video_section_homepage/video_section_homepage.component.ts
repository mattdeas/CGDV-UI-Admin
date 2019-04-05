import { Component } from '@angular/core';
import { CMSService } from '../../../@core/data/cms.service';
import { ToastService } from '../../../utils/toastr.service';

@Component({
  selector: 'ngx-video_section_homepage',
  styleUrls: ['./video_section_homepage.component.scss'],
  templateUrl: './video_section_homepage.component.html',
})
export class VideoSectionHomepageComponent {
   model: any = {};
   isEdit = false;
   isAdd = false;
   showAddBtn = false;
   showEditBtn = false;
  constructor(private cmsService : CMSService,
  			private toasterService: ToastService,) {
  }
   ngOnInit() {
  	this.getVideoSection();  
  }
  getVideoSection(){
  	this.cmsService.getVideoSection()
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
	   this.getVideoSection();
  }
  onSubmit(){
  	if(this.isEdit){
  		this.cmsService.updateVideoSection(this.model)
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

  	this.cmsService.addVideoSection(this.model)
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
