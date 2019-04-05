import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { VizOfDayRoutingModule, routedComponents } from './viz-of-day-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    ThemeModule,
    VizOfDayRoutingModule,
    FormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    
  ],
})
export class VizOfDayModule { }
