import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CMSRoutingModule, routedComponents } from './cms-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    ThemeModule,
    CMSRoutingModule,
    NgxDatatableModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    // SmartTableService,
  ],
})
export class CMSModule { }
