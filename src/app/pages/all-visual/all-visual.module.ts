import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AllVisualRoutingModule, routedComponents } from './all-visual-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    ThemeModule,
    AllVisualRoutingModule,
    FormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
})
export class AllVisualModule { }
