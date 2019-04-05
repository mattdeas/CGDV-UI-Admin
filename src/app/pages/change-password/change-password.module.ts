import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ChangePasswordComponent } from './change-password.component';
import { CustomFormsModule } from 'ngx-custom-validators';

@NgModule({
  imports: [
    ThemeModule,
    CustomFormsModule,
  ],
  declarations: [
    ChangePasswordComponent,
  ],
})
export class ChangePasswordModule { }
