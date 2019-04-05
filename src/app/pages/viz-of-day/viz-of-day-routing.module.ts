import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VizOfDayComponent } from './viz-of-day.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{ 
  path: '',
  component: VizOfDayComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  },{
    path: 'add',
    component: AddComponent,
    data:{
      'title':'Add Viz Of Day'
    }
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VizOfDayRoutingModule { }

export const routedComponents = [
  VizOfDayComponent,
  ListComponent,
  AddComponent,
];
