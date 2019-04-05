import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UserVisualRoutingModule, routedComponents } from './user-visual-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    ThemeModule,
    UserVisualRoutingModule,
    FormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    
  ],
})
export class UserVisualModule { }
