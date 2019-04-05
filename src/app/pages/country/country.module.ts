import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CountryRoutingModule, routedComponents } from './country-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    ThemeModule,
    CountryRoutingModule,
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
export class CountryModule { }
