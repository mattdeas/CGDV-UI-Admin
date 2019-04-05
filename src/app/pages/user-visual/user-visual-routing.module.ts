import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserVisualComponent } from './user-visual.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{
  path: '',
  component: UserVisualComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  },{
    path: 'add',
    component: AddComponent,
    data:{
      'title':'Add Visual'
    }
  },{
    path: 'edit',
    component: AddComponent,
    data:{
      'title':'Edit Visual'
    }
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserVisualRoutingModule { }

export const routedComponents = [
  UserVisualComponent,
  ListComponent,
  AddComponent,
];
