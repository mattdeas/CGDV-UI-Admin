import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { ToastService } from '../../../utils/toastr.service';
@Component({
  selector: 'ngx-list-user',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
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
  loading = true;
  limit = 5;
  constructor(private userService: UserService,
    private toasterService: ToastService,
    private router: Router) {
    this.Math = Math;
    this.getUserList(1, '', '', this.applyFilter, this.applySorting);
    
  }

  getUserList(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?type=1&recordPerPage='+this.limit+'&page=' + pageNo;
    if (applySorting === true && sortingData) {
      if (sortingData.sorts && sortingData.sorts[0]) {
        this.sortingData.prop = sortingData.sorts[0].prop;
        this.sortingData.dir = sortingData.sorts[0].dir;
      }
      url +=  '&orderby=' + this.sortingData.prop +
              '&orderbydirection=' + this.sortingData.dir;
    }
    if (applyFilter === true && filterData) {

      url +=  (filterData.firstname ? ('&firstname=' + filterData.firstname) : '') +
              (filterData.lastname ? ('&lastname=' + filterData.lastname) : '') +
              (filterData.email ? ('&email=' + filterData.email) : '') 
    }

    this.userService.getUsers(url).subscribe((res: any) => {
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
  goToVizLib(user_id: any){
    this.router.navigate(['/pages/user-visual/list'], { queryParams: { user_id: user_id } , queryParamsHandling:"merge"  });
  }
  changePassword(user_id: any){
    this.router.navigate(['/pages/user/change-password'], { queryParams: { id: user_id } , queryParamsHandling:"merge"  });
  }
  
  edit(user: any) {
    this.router.navigate(['/pages/user/edit'],{ queryParams: {'user_id':user.id} }); 
  }
  delete(user_id: any) {
   if (window.confirm('Are you sure you want to delete?')) {
   this.userService.deactivateUsers(user_id).subscribe((res: any) => {
        if(res.status){
          this.toasterService.showSuccess(res.message);
          this.rows = this.rows.filter(item => item.id !== user_id);          
          this.data.count -= 1;
          if(!this.rows.length){
            this.getUserList(1, '', '', this.applyFilter, this.applySorting);
          }
        }
     },
      (error) => {        
        this.toasterService.showError(error);
      });
    }
  }



  top(user_id: any) {
    this.userService.togglebadge({'user_id':user_id}).subscribe((res: any) => {
         if(res.status){
           this.toasterService.showSuccess(res.message);
           this.rows = this.rows.filter(item => item.id !== user_id);          
           this.data.count -= 1;
           if(!this.rows.length){
             this.getUserList(1, '', '', this.applyFilter, this.applySorting);
           }
         }
      },
       (error) => {        
         this.toasterService.showError(error);
       });
   }

}
