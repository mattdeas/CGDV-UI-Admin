import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UniversityComponent } from './university.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{ 
  path: '',
  component: UniversityComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  },{
    path: 'add',
    component: AddComponent,
    data:{
      'title':'Add University'
    }
  },{
    path: 'edit',
    component: AddComponent,
    data:{
      'title':'Edit University'
    }
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversityRoutingModule { }

export const routedComponents = [
  UniversityComponent,
  ListComponent,
  AddComponent,
];
