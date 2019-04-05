import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FeaturedVisualRoutingModule, routedComponents } from './featured-visual-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    ThemeModule,
    FeaturedVisualRoutingModule,
    FormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    
  ],
})
export class FeaturedVisualModule { }
