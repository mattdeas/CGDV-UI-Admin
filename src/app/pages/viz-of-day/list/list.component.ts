import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VisualService } from '../../../@core/data/visual.service';
import { CommonService } from '../../../@core/data/common.service';

import { SharedService } from '../../../utils/shared.service';
import { ToastService } from '../../../utils/toastr.service';
@Component({
  selector: 'ngx-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
})
export class ListComponent {
  visualList:any = [];
  vizOfDayCategoryList: any = [];
  viz_id: any;
  model: any = {};
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
  limit = 3;
  constructor(private commonService: CommonService,
    private visualService: VisualService, 
    private toasterService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService) {
    	
  }
  
  ngOnInit() {    
    this.commonService.getCategoryList("?type=vizOfDay")
    .subscribe((res: any) => {
      if(res.status){
        this.vizOfDayCategoryList = res.result.data;
        this.model.vizOfDay = this.vizOfDayCategoryList[0].id;
        this.Math = Math;
        this.getVizOfDay(1, '', '', this.applyFilter, this.applySorting);
      }
    });
  }
  getVizOfDay(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?recordPerPage='+this.limit+'&page=' + pageNo;
    url +=  '&category_id=' + this.model.vizOfDay;
    if (applySorting === true && sortingData) {
      if (sortingData.sorts && sortingData.sorts[0]) {
        this.sortingData.prop = sortingData.sorts[0].prop;
        this.sortingData.dir = sortingData.sorts[0].dir;
      }
      url +=  '&orderby=' + this.sortingData.prop +
              '&orderbydirection=' + this.sortingData.dir;
    }
    if (applyFilter === true && filterData) {

      url +=  (filterData.title ? ('&title=' + filterData.title) : '') +
              (filterData.author ? ('&author=' + filterData.author) : '') +
              (filterData.tags ? ('&tags=' + filterData.tags) : '') 
    }
    this.visualService.getVizOfDay(url).subscribe((res: any) => {
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
  changeListener(){
    this.getVizOfDay(1, '', '', this.applyFilter, this.applySorting);
  }
  setVizOfDay(viz_id){
    if (window.confirm('Are you sure you want to remove from viz of day?')) {      
      this.visualService.setVizOfDay(viz_id, this.model.vizOfDay, false)
      .subscribe((res: any) => {
          if(res.status){
            this.toasterService.showSuccess(res.message);
            this.rows = this.rows.filter(item => item.id !== viz_id);          
            this.data.count -= 1;
            if(!this.rows.length){
              this.getVizOfDay(1, '', '', this.applyFilter, this.applySorting);
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
