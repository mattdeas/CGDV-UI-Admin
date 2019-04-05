import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CMSComponent } from './cms.component';

import { AboutAboutpageComponent } from './about_aboutpage/about_aboutpage.component';
import { AboutHomepageComponent } from './about_homepage/about_homepage.component';
import { VideoSectionHomepageComponent } from './video_section_homepage/video_section_homepage.component';

import { NewsListComponent } from './news/list/list.component';
import { NewsAddComponent } from './news/add/add.component';

import { PartnerListComponent } from './partner/list/list.component';
import { PartnerAddComponent } from './partner/add/add.component';

import { JourneyListComponent } from './journey/list/list.component';
import { JourneyAddComponent } from './journey/add/add.component';

const routes: Routes = [{
  path: '',
  component: CMSComponent,
  children: [
  //home-page routes
  {
    path: 'home/about_us',
    component: AboutHomepageComponent,
  },
  {
    path: 'home/video_section',
    component: VideoSectionHomepageComponent,
  },
  // news routes
  {
    path: 'home/news/list',
    component: NewsListComponent,
  },{
    path: 'home/news/add',
    component: NewsAddComponent,
    data:{
      'title':'Add News'
    }
  },{
    path: 'home/news/edit',
    component: NewsAddComponent,
    data:{
      'title':'Edit News'
    }
  },
  // partners routes
  {
    path: 'home/partner/list',
    component: PartnerListComponent,
  },{
    path: 'home/partner/add',
    component: PartnerAddComponent,
    data:{
      'title':'Add Partner'
    }
  },{
    path: 'home/partner/edit',
    component: PartnerAddComponent,
    data:{
      'title':'Edit Partner'
    }
  },
  //about-page routes
  {
    path: 'about/about_us',
    component: AboutAboutpageComponent,
  },
  // journey routes
  {
    path: 'about/journey/list',
    component: JourneyListComponent,
  },{
    path: 'about/journey/add',
    component: JourneyAddComponent,
    data:{
      'title':'Add Journey'
    }
  },{
    path: 'about/journey/edit',
    component: JourneyAddComponent,
    data:{
      'title':'Edit Journey'
    }
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CMSRoutingModule { }

export const routedComponents = [
  CMSComponent,
  AboutHomepageComponent,
  AboutAboutpageComponent,
  NewsAddComponent,
  NewsListComponent,
  PartnerListComponent,
  PartnerAddComponent,
  JourneyListComponent,
  JourneyAddComponent,
  VideoSectionHomepageComponent
];
