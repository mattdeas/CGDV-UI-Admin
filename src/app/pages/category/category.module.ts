import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CategoryRoutingModule, routedComponents } from './category-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    ThemeModule,
    CategoryRoutingModule,
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
export class CategoryModule { }
