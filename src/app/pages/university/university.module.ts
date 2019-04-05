import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UniversityRoutingModule, routedComponents } from './university-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    ThemeModule,
    UniversityRoutingModule,
    FormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    // SmartTableService,
  ],
})
export class UniversityModule { }
