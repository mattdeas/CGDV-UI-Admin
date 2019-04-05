import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { MyVisualRoutingModule, routedComponents } from './my-visual-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    ThemeModule,
    MyVisualRoutingModule,
    FormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
})
export class MyVisualModule { }
