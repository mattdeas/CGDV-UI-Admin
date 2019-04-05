import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UserRoutingModule, routedComponents } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ngx-custom-validators';
@NgModule({
  imports: [
    ThemeModule,
    UserRoutingModule,
    FormsModule,
    NgxDatatableModule,
    CustomFormsModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    // SmartTableService,
  ],
})
export class UserModule { }
