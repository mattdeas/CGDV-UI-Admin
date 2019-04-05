import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { CommonService } from './common.service';
import { StateService } from './state.service';
import { UploadService } from './upload.service';
import { VisualService } from './visual.service';
import { VideoService } from './video.service';
import { CountryService } from './country.service';
import { CategoryService } from './category.service';
import { UniversityService } from './university.service';
import { CMSService } from './cms.service';
import { ChallengeService } from './challenge.service';

const SERVICES = [
  UserService,
  StateService,
  CommonService,
  UploadService,
  VisualService,
  VideoService,
  CountryService,
  CategoryService,
  UniversityService,
  CMSService,
  ChallengeService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
