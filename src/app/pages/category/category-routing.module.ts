import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{ 
  path: '',
  component: CategoryComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  },{
    path: 'add',
    component: AddComponent,
    data:{
      'title':'Add Category'
    }
  },{
    path: 'edit',
    component: AddComponent,
    data:{
      'title':'Edit Category'
    }
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule { }

export const routedComponents = [
  CategoryComponent,
  ListComponent,
  AddComponent,
];
