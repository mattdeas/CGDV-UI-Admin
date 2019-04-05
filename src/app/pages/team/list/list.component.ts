import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { CommonService } from '../../../@core/data/common.service';
import { ToastService } from '../../../utils/toastr.service';
@Component({
  selector: 'ngx-list-user',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
})
export class ListComponent {
  teamCategoryList: any;
  model: any ={};
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
  limit = 3;
  constructor(private userService: UserService,
    private commonService: CommonService,
    private toasterService: ToastService,
    private router: Router) {
    this.Math = Math;
    this.commonService.getCategoryList("?type=team")
    .subscribe((res: any) => {
      if(res.status){
        this.teamCategoryList = res.result.data;
        this.model.team = this.teamCategoryList[0].id;
        this.Math = Math;
        this.getUserList(1, '', '', this.applyFilter, this.applySorting);
      }
    });
    
  }

  getUserList(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?type=1&recordPerPage='+this.limit+'&page=' + pageNo;
    url += '&category_id='+this.model.team;
    url += '&in_team=1';
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

      url +=  (filterData.firstname ? ('&firstname=' + filterData.firstname) : '') +
              (filterData.lastname ? ('&lastname=' + filterData.lastname) : '') +
              (filterData.email ? ('&email=' + filterData.email) : '') 
    }

    this.userService.getUsers(url).subscribe((res: any) => {
        this.loading = false;
        if (res.status === 0) {
          this.rows = [];
          this.data.count = 0;
          this.data.currentPage = 1;
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
    this.getUserList(1, '', '', this.applyFilter, this.applySorting);
  }
  removeFromTeam(user_id: any) {
   if (window.confirm('Are you sure you want to remove from team?')) {
   this.userService.setInTeam({'user_id':user_id, 'in_team':0}).subscribe((res: any) => {
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
}
