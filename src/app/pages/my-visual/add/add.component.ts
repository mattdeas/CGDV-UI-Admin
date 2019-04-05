import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../@core/data/common.service';
import { UserService } from '../../../@core/data/users.service';
import { ToastService } from '../../../utils/toastr.service';
import { AppComponent } from '../../../app.component';

import { UploadService } from '../../../@core/data/upload.service';
import { VisualService } from '../../../@core/data/visual.service';
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
  viz_id: any;
  page_title;
  model: any = {};
  genderList:any = [];
  universityList:any = [];
  countryList:any = [];
  categoryList:any = [];
  file: File;
  files: any;
  image: any;
  imageType: any;
  formData: any;
  disableFlag = true;
  changeImageFlag = false;
  
  constructor(private toasterService: ToastService,
              private commonService: CommonService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private appcomponent: AppComponent,
              private uploadService: UploadService,
              private visualService: VisualService,
              private sharedService: SharedService
              ) {}
  ngOnInit() {
    this.user = this.sharedService.getLoginUser();
    this.user_id = this.user.id;

    this.route.queryParams.subscribe(params => {
        this.viz_id = params['viz_id'];
        if(this.user_id && this.viz_id){
          var url = '?viz_id='+this.viz_id+'&user_id='+this.user_id;
          this.visualService.getVisual(url)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit  = true;
              this.model = res.result.data[0];
              
            }else{
              this.toasterService.showError(res.message);
              this.router.navigate(['/pages/my-visual/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
            }
          },
      (error) => {        
        this.toasterService.showError(error);
      });
        }
    });

    this.page_title = this.route.snapshot.data.title;

    this.genderList = ['Male','Female','Other'];
    this.model.gender = this.genderList[0];

    this.commonService.getCountryList('')
      .subscribe((res: any) => {
        if(res.status){
          this.countryList = res.result.data;          
        }
      },
      (error) => {        
        // this.toasterService.showError(error);
      });

    
    this.loadUniversity();
    this.commonService.getCategoryList("?type=visual")
      .subscribe((res: any) => {
        if(res.status){
          this.categoryList = res.result.data;
        }
      },
      (error) => {        
        // this.toasterService.showError(error);
      });
  }

  loadUniversity(){
    this.commonService.getUniversityList('')
      .subscribe((res: any) => {
        if(res.status){
          this.universityList = res.result.data;
        }
      },
      (error) => {        
        // this.toasterService.showError(error);
      });
  }
  onSubmit() {
    if(this.isEdit){
      this.visualService.updateVisual(this.viz_id, this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/my-visual/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
          }else{
            this.toasterService.showError(res.message);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
    }else{
      // this.model.user_id = this.user_id;
      this.visualService.addVisual(this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/my-visual/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
          }else{
            this.toasterService.showError(res.message);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
    }
  }
  
  // For image upload (convert base 64)
  changeListener($event) {
    this.disableFlag = false;
    // if (($event.target.files[0].type === 'image/jpeg') ||
    //    ($event.target.files[0].type === 'image/jpg') ||       
    //    ($event.target.files[0].type === 'image/png')) {
    // } else {
    //   this.toasterService.showError('please upload only jpg/png file only');
    //   this.disableFlag = true;
    // }
    
    this.file = $event.target.files[0];  
    // this.formData = new FormData();
    // // Append files to the virtual form.    
    // this.formData.append('upload', this.file);

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
        this.appcomponent.hideLoader();
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
          this.toasterService.showSuccess(response.message);
        },
        (error) => {
          this.appcomponent.hideLoader();
          this.toasterService.showError(error);
        });
    }else{
      this.appcomponent.hideLoader();
      this.image = '';
      this.file = null;      
      this.toasterService.showSuccess('Image removed');
    }
  }
}


