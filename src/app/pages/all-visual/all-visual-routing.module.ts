import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllVisualComponent } from './all-visual.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{ 
  path: '',
  component: AllVisualComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllVisualRoutingModule { }

export const routedComponents = [
  AllVisualComponent,
  ListComponent,
];
