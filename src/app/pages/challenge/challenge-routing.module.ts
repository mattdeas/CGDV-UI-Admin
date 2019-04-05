import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChallengeComponent } from './challenge.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{ 
  path: '',
  component: ChallengeComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  },{
    path: 'add',
    component: AddComponent,
    data:{
      'title':'Add Challenge'
    }
  },{
    path: 'edit',
    component: AddComponent,
    data:{
      'title':'Edit Challenge'
    }
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengeRoutingModule { }

export const routedComponents = [
  ChallengeComponent,
  ListComponent,
  AddComponent,
];
