import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VisualService } from '../../../@core/data/visual.service';
import { SharedService } from '../../../utils/shared.service';
import { ToastService } from '../../../utils/toastr.service';
@Component({
  selector: 'ngx-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
})
export class ListComponent {
  user: any;
  user_id: any;
  rows = [];
  data: any = {
    count: 0,
    currentPage: 0
  };
  Math: any;
  applyFilter = false;
  applySorting = false;
  sortingData: any = {prop: '', dir: ''};
  sorts: any[] = [];
  loading;
  limit = 5;
  constructor(
    private visualService: VisualService, 
    private toasterService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService) {
    	
  }
  
  ngOnInit() {
    this.user = this.sharedService.getLoginUser();
    this.user_id = this.user.id;
    this.Math = Math;
    this.getFeaturedVisuals(1, '', '', this.applyFilter, this.applySorting);
  }
  getFeaturedVisuals(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?recordPerPage='+this.limit+'&page=' + pageNo;
    url +=  '&is_featured=1';
    if (applySorting === true && sortingData) {
      if (sortingData.sorts && sortingData.sorts[0]) {
        this.sortingData.prop = sortingData.sorts[0].prop;
        this.sortingData.dir = sortingData.sorts[0].dir;
      }
      url +=  '&orderby=' + this.sortingData.prop +
              '&orderbydirection=' + this.sortingData.dir;
    }else{
      url +=  '&orderby=seq_no&orderbydirection=ASC' 
    }
    if (applyFilter === true && filterData) {

      url +=  (filterData.title ? ('&title=' + filterData.title) : '') +
              (filterData.author ? ('&author=' + filterData.author) : '') +
              (filterData.tags ? ('&tags=' + filterData.tags) : '') 
    }
    this.visualService.getVisual(url).subscribe((res: any) => {
        this.loading = false;
        if (res.status === 0) {
          return false;
        }
        if(res.status){
          this.rows = res.result.data;
          this.data.count = res.result.count;
          this.data.currentPage = res.result.currentPage;
        }
     },
      (error) => {        
       this.toasterService.showError(error);
      });
  }

   edit(visual: any) { 
    this.router.navigate(['/pages/user-visual/edit'],{ queryParams: {'viz_id':visual.id,'user_id':visual.user_id}   }); 
  }
  
  //set featured false
  setFeatured(viz_id){
    if (window.confirm('Are you sure you want to remove from featured?')) {
      this.visualService.setFeatured(viz_id, 0)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            // this.getFeaturedVisuals();
            this.rows = this.rows.filter(item => item.id !== viz_id);          
            this.data.count -= 1;
            if(!this.rows.length){
              this.getFeaturedVisuals(1, '', '', this.applyFilter, this.applySorting);
            }
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
