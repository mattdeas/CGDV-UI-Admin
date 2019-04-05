import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../@core/data/common.service';
import { UserService } from '../../../@core/data/users.service';
import { ToastService } from '../../../utils/toastr.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddComponent {
  API_URL = environment.apiUrl;
  teamCategoryList: any;
  model: any ={};
  page_title: any;
  team: any;
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
  
  constructor(private toasterService: ToastService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router
              ) {}
  ngOnInit() {
    this.page_title = this.route.snapshot.data.title;
    this.route.queryParams.subscribe(params => {
      this.team = params['id'];
      this.Math = Math;
      this.getUserList(1, '', '', this.applyFilter, this.applySorting);
    },
      (error) => {        
        this.toasterService.showError(error);
      });
  }
  getUserList(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?type=1&recordPerPage='+this.limit+'&page=' + pageNo;
    url += '&category_id='+this.team;
    url += '&in_team=0';
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
  setInTeam(user_id: any) {
   this.userService.setInTeam({'user_id':user_id, 'in_team':1}).subscribe((res: any) => {
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


