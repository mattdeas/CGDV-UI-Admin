import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { VideoRoutingModule, routedComponents } from './video-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    ThemeModule,
    VideoRoutingModule,
    FormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
})
export class VideoModule { }
