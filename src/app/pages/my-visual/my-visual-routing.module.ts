import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyVisualComponent } from './my-visual.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{ 
  path: '',
  component: MyVisualComponent,
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
export class MyVisualRoutingModule { }

export const routedComponents = [
  MyVisualComponent,
  ListComponent,
  AddComponent,
];
