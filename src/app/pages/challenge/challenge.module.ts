import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ChallengeRoutingModule, routedComponents } from './challenge-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    ThemeModule,
    ChallengeRoutingModule,
    FormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
})
export class ChallengeModule { }
