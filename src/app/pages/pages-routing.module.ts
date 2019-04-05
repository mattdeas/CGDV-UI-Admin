import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SuperAuthGuard } from '../utils/super-auth-guard.service';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'user',
      loadChildren: './user/user.module#UserModule',
    },{
      path: 'user-visual',
      loadChildren: './user-visual/user-visual.module#UserVisualModule',
    },{
      path: 'my-visual',
      loadChildren: './my-visual/my-visual.module#MyVisualModule',
    },{
      path: 'all-visual',
      loadChildren: './all-visual/all-visual.module#AllVisualModule',
    },{
      path: 'featured-visual',
      loadChildren: './featured-visual/featured-visual.module#FeaturedVisualModule',
    },
    {
      path: 'challenge',
      loadChildren: './challenge/challenge.module#ChallengeModule',
    },
    // {
    //   path: 'viz-of-day',
    //   loadChildren: './viz-of-day/viz-of-day.module#VizOfDayModule',
    // },
    {
      path: 'video',
      loadChildren: './video/video.module#VideoModule',
    },{
      path: 'team',
      loadChildren: './team/team.module#TeamModule',
    },{
      path: 'country',
      loadChildren: './country/country.module#CountryModule',
    },{
      path: 'category',
      loadChildren: './category/category.module#CategoryModule',
    },{
      path: 'university',
      loadChildren: './university/university.module#UniversityModule',
    },{
      path: 'superadmin',
      canActivate: [SuperAuthGuard], 
      data: { 
        expectedRole: 3
      },
      component: AdminComponent,
    },{
      path: 'profile',
      component: ProfileComponent,
      data:{
        'title':'Update Profile'
      }
    },{
      path: 'change-password',
      component: ChangePasswordComponent
    },{
      path: 'cms',
      loadChildren: './cms/cms.module#CMSModule',
    },{
      path: '',
      redirectTo: 'user/list',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
