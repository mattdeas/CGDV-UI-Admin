import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CMSService } from '../../../../@core/data/cms.service';
import { ToastService } from '../../../../utils/toastr.service';
import { AppComponent } from '../../../../app.component';
import { UploadService } from '../../../../@core/data/upload.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngx-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class PartnerAddComponent {
  API_URL = environment.apiUrl;
  isEdit  = false;
  user: any;
  user_id: any;
  id: any;
  page_title;
  model: any = {};
  universityList:any = [];
  countryList:any = [];

  file: File;
  files: any;
  image: any;
  disableFlag = true;
  changeImageFlag = false;
  
  constructor(private toasterService: ToastService,
              private cmsService: CMSService,
              private route: ActivatedRoute,
              private router: Router,

              private appcomponent: AppComponent,
              private uploadService: UploadService,
              ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        if(this.id){
          var url = '?id='+this.id;
          this.cmsService.getPartnerList(url)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit  = true;
              this.model = res.result.data[0];
            }else{
              this.toasterService.showError(res.message);
              this.router.navigate(['/pages/cms/home/partner/list']);
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
    if(this.model.avatar){

      if(this.isEdit){
        this.cmsService.updatePartner(this.id, this.model)
        .subscribe((res: any) => {
            if(res.status){
              this.toasterService.showSuccess(res.message);
              this.router.navigate(['/pages/cms/home/partner/list']);
            }else{
              this.toasterService.showError(res.message);
            }
          },
        (error) => {        
          this.toasterService.showError(error);
        });
      }else{      
        this.cmsService.addPartner(this.model)
        .subscribe((res: any) => {
            if(res.status){
              this.toasterService.showSuccess(res.message);
              this.router.navigate(['/pages/cms/home/partner/list']);
            }else{
              this.toasterService.showError(res.message);
            }
          },
        (error) => {        
          this.toasterService.showError(error);
        });
      }
    }else{
      this.toasterService.showError('Image is required.');
    }
  }

  changeListener($event) {
    this.disableFlag = false;
    // if (($event.target.files[0].type === 'image/jpeg') ||
    //    ($event.target.files[0].type === 'image/jpg') ||       
    //    ($event.target.files[0].type === 'image/png')) {
    // } else {
    //   this.toasterService.showError('please upload only jpg/png file only');
    //   // this.appcomponent.showError('please upload only jpg, gif and png file only');
    //   this.disableFlag = true;
    // }
    
    this.file = $event.target.files[0]; 
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    };
    
    myReader.readAsDataURL(this.file);
  }

  // For upload image called API
  UploadImage() {
    this.appcomponent.showLoader();

    this.uploadService.uploadImage(this.image).subscribe(
      (response: any) => {
        this.appcomponent.hideLoader();
        if (response.status === 0) {
          return false;
        }
        this.model.avatar = response.result.filePath
        this.disableFlag = true;
        this.changeImageFlag = true;
        this.toasterService.showSuccess(response.message);
      },
      (error) => {
        this.toasterService.showError(error);
      });
  }
  
  changeImage(){
    this.changeImageFlag = true;
  }
  removeImage() {
    this.appcomponent.showLoader();
    if(this.disableFlag && this.model.avatar){
      this.uploadService.removeImage(this.model.avatar).subscribe(
        (response: any) => {
          this.appcomponent.hideLoader();
          if (response.status === 0) {
            return false;
          }
          this.image = '';
          this.model.avatar = '';
          this.file = null;
          this.toasterService.showError(response.message);
        },
        (error) => {
          this.appcomponent.hideLoader();
          this.toasterService.showError(error);
        });
    }else{
      this.appcomponent.hideLoader();
      this.image = '';
      this.file = null;
      this.toasterService.showError('Image removed');    }
  }
}


