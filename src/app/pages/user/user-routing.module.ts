import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  },{
    path: 'add',
    component: AddComponent,
    data:{
      'title':'Add User'
    }
  },{
    path: 'edit',
    component: AddComponent,
    data:{
      'title':'Edit User'
    }
  },{
    path: 'change-password',
    component: ChangePasswordComponent,
    data:{
      'title':'Change User\'s password' 
    }
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [
  UserComponent,
  ListComponent,
  AddComponent,
  ChangePasswordComponent,
];
