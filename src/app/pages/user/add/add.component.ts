import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../@core/data/common.service';
import { UserService } from '../../../@core/data/users.service';
import { ToastService } from '../../../utils/toastr.service';
import { AppComponent } from '../../../app.component';

import { UploadService } from '../../../@core/data/upload.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddComponent {
  API_URL = environment.apiUrl;
  isEdit  = false;
  user_id: any;
  title: any;
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
              ) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.user_id = params['user_id'];
        if(this.user_id){
          this.userService.getUserData(this.user_id)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit  = true;
              this.model = res.data[0];              
            }else{
              this.toasterService.showError(res.message); 
              this.router.navigate(['/pages/user/list']);
            }
          },
      (error) => {        
        this.toasterService.showError(error);
      });
        }
    });

    this.title = this.route.snapshot.data.title;

    this.genderList = ['Male','Female','Other'];

    this.commonService.getCountryList('')
      .subscribe((res: any) => {
        if(res.status){
          this.countryList = res.result.data;
        }
      });
      this.loadUniversity();

    this.commonService.getCategoryList("?type=team")
      .subscribe((res: any) => {
        if(res.status){
          this.categoryList = res.result.data;
        }
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
        // this.toasterService.showToast('error', '',error.message || 'Error');
      });
  }
  onSubmit() {
      // event.preventDefault();
      if(this.isEdit){
      this.userService.updateUser(this.user_id, this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/user/list']);
          }else{
            this.toasterService.showError(res.message);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
    }else{      
      this.model.created_by_admin = 1;
      this.userService.addUser(this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.router.navigate(['/pages/user/list']);
          }else{
            this.toasterService.showError(res.message);
          }
        },
      (error) => {        
        this.toasterService.showError(error);
      });
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
      this.toasterService.showError('Image removed');
    }
  }
}
