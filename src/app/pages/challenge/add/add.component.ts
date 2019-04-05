import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../@core/data/common.service';
import { ToastService } from '../../../utils/toastr.service';
import { AppComponent } from '../../../app.component';
import { VisualService } from '../../../@core/data/visual.service';
import { ChallengeService } from '../../../@core/data/challenge.service';
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
  filterData: any = {};
  rows = [];

  constructor(private toasterService: ToastService,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router,
              private challengeService: ChallengeService,
              private visualService: VisualService,
              private sharedService: SharedService
              ) {}
  ngOnInit() {
    this.user = this.sharedService.getLoginUser();
    this.user_id = this.user.id;

    this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        if(this.id){
          var url = '?id='+this.id;
          console.log(url);
          this.challengeService.getChallenge(url)
          .subscribe((res: any) => {
            console.log(res);
            if(res.status){
              this.isEdit  = true;
              this.model = res.result.data[0];
              console.log('Initial Model',this.model);
              this.filterData.challenge_id = this.id;
              this.getVisualList(1, this.filterData, '', true, true);
              console.log('New Model',this.model);
            }else{
              this.toasterService.showError(res.message); 
              this.router.navigate(['/pages/challenge/list']);
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
    console.log(this.model);
    if(this.isEdit){
       this.challengeService.updateChallenge(this.id, this.model)
       .subscribe((res: any) => {
           if(res.status){
             this.toasterService.showSuccess(res.message);
             this.router.navigate(['/pages/challenge/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
           }else{
             this.toasterService.showError(res.message);
           }
         },
       (error) => {        
         this.toasterService.showError(error);
       });
     }else{      
       this.challengeService.addChallenge(this.model)
       .subscribe((res: any) => {
           if(res.status){
             this.toasterService.showSuccess(res.message);
             this.router.navigate(['/pages/challenge/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
            }else{
             this.toasterService.showError(res.message);
           }
         },
       (error) => {        
         this.toasterService.showError(error);
       });
     }
  }

  getVisualList(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean)
  {
    //this.loading = true;
    let url = '?recordPerPage=50000&page=1';     
    
    if (applySorting === true ){//&& sortingData) {
      
      //console.log(sortingData.sorts[0]);

      //if (sortingData.sorts && sortingData.sorts[0]) {
      //  this.sortingData.prop = sortingData.sorts[0].prop;
      //  this.sortingData.dir = sortingData.sorts[0].dir;
      //}
      url +=  '&orderby=' + sortingData;
              //'&orderbydirection=' + this.sortingData.dir;
      
    }
    console.log('filterData',filterData)
    console.log('applyfilter',applyFilter)
    if (applyFilter === true && filterData) {

      url +=  (filterData.challenge_id ? ('&challenge_id=' + filterData.challenge_id) : '')
              console.log('filterData',filterData)
    }
    this.visualService.getVisual(url).subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status){
          this.rows = res.result.data;
          
          console.log('Viz List',this.rows);
        }
     },
      (error) => {        
//        this.appComponent.showError(error);
      });
  }

}
