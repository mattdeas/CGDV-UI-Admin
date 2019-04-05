import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../@core/data/common.service';
import { ToastService } from '../../../utils/toastr.service';

import { VisualService } from '../../../@core/data/visual.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddComponent {
  API_URL = environment.apiUrl;
  page_title: any;
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
  constructor(private toasterService: ToastService,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router,
              private visualService: VisualService
              ) {}
  ngOnInit() {
    this.page_title = this.route.snapshot.data.title;
    this.Math = Math;
    this.getNotFeaturedVisuals(1, '', '', this.applyFilter, this.applySorting);
  }
  getNotFeaturedVisuals(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?recordPerPage='+this.limit+'&page=' + pageNo;
    url +=  '&is_featured=0';
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
  setFeatured(viz_id){
    this.visualService.setFeatured(viz_id, 1)
    .subscribe((res: any) => {
        if(res.status){
          this.toasterService.showSuccess(res.message);
          this.router.navigate(['/pages/featured-visual/list'],{ queryParams: {  } , queryParamsHandling:"merge"  });
        }else{
          this.toasterService.showError(res.message);
        }
      },
      (error) => {        
        this.toasterService.showError(error);
      });
  } 
}


