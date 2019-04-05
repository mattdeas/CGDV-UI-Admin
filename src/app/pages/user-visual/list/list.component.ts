import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { VisualService } from '../../../@core/data/visual.service';
import { ToastService } from '../../../utils/toastr.service';
@Component({
  selector: 'ngx-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
})
export class ListComponent {
  visualList:any = [];
  user_id;
  viz_id;
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
  constructor(private userService: UserService,
    private toasterService: ToastService,
    private visualService: VisualService, 
    private router: Router,
    private route: ActivatedRoute,) {
    	
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.user_id = params['user_id'];
        this.Math = Math;
        this.getVisualList(1, '', '', this.applyFilter, this.applySorting);
    });
  }
  // getVisualList(){
  getVisualList(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?recordPerPage='+this.limit+'&page=' + pageNo;
    url +=  '&user_id=' + this.user_id;
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
  edit(visual: any) { 
    this.router.navigate(['/pages/user-visual/edit'],{ queryParams: {'viz_id':visual.id,'user_id':visual.user_id}   }); 
  }
  delete(viz_id, user_id) {
   if (window.confirm('Are you sure you want to delete?')) {
   this.visualService.deleteVisual(viz_id,"?user_id="+user_id).subscribe((res: any) => {
        if(res.status){
          this.toasterService.showSuccess(res.message);
          // this.getVisualList();
          this.rows = this.rows.filter(item => item.id !== viz_id);          
          this.data.count -= 1;
          if(!this.rows.length){
            this.getVisualList(1, '', '', this.applyFilter, this.applySorting);
          }
        }
     },
      (error) => {        
       this.toasterService.showError(error);
      });
    }
  }
}
