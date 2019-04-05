import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { TeamRoutingModule, routedComponents } from './team-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    ThemeModule,
    TeamRoutingModule,
    FormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
})
export class TeamModule { }
