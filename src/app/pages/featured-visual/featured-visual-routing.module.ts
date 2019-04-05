import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturedVisualComponent } from './featured-visual.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{ 
  path: '',
  component: FeaturedVisualComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  },{
    path: 'add',
    component: AddComponent,
    data:{
      'title':'Add Featured Visual'
    }
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturedVisualRoutingModule { }

export const routedComponents = [
  FeaturedVisualComponent,
  ListComponent,
  AddComponent,
];
