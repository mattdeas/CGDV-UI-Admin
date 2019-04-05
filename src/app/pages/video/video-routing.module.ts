import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoComponent } from './video.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{ 
  path: '',
  component: VideoComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  },{
    path: 'add',
    component: AddComponent,
    data:{
      'title':'Add Video'
    }
  },{
    path: 'edit',
    component: AddComponent,
    data:{
      'title':'Edit Video'
    }
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoutingModule { }

export const routedComponents = [
  VideoComponent,
  ListComponent,
  AddComponent,
];
