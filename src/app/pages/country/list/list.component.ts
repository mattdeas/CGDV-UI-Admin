import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryService } from '../../../@core/data/country.service';
import { ToastService } from '../../../utils/toastr.service';
import { CommonService } from '../../../@core/data/common.service';

@Component({
  selector: 'ngx-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ListComponent {
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
    private countryService: CountryService,
    private toasterService: ToastService,
    private router: Router,
    private route: ActivatedRoute,) {
    	
  }
  
  ngOnInit() {    
    this.Math = Math;
    this.getCountryList(1, '', '', this.applyFilter, this.applySorting);
  }
  getCountryList(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?recordPerPage='+this.limit+'&page=' + pageNo;
    if (applySorting === true && sortingData) {
      if (sortingData.sorts && sortingData.sorts[0]) {
        this.sortingData.prop = sortingData.sorts[0].prop;
        this.sortingData.dir = sortingData.sorts[0].dir;
      }
      url +=  '&orderby=' + this.sortingData.prop +
              '&orderbydirection=' + this.sortingData.dir;
    }
    console.log(filterData,applyFilter)
    if (applyFilter === true && filterData) {

      url +=  (filterData.name ? ('&name=' + filterData.name) : '')
    }
    this.commonService.getCountryList(url).subscribe((res: any) => {
        this.loading = false;
        if (res && res.status === 0) {
          return false;
        }
        if(res && res.status && res.result && res.result.count){
          this.rows = res.result.data;
          this.data.count = res.result.count;
          this.data.currentPage = res.result.currentPage;
        }
     },
      (error) => {        
        this.toasterService.showError(error);
      });
  }
  edit(data: any) { 
    this.router.navigate(['/pages/country/edit'],{ queryParams: {'id':data.id} , queryParamsHandling:"merge"  }); 
  }

  delete(viz_id ) {
   if (window.confirm('Are you sure you want to delete?')) {
   this.countryService.deleteCountry(viz_id).subscribe((res: any) => {
        if(res.status){
          this.toasterService.showSuccess(res.message);
          this.rows = this.rows.filter(item => item.id !== viz_id);          
          this.data.count -= 1;
          if(!this.rows.length){
            this.getCountryList(1, '', '', this.applyFilter, this.applySorting);
          }
        }
     },
      (error) => {        
        this.toasterService.showError(error);
      });
    }
  }
}
