import { Injectable } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Injectable()
export class ToastService{

  constructor(private toasterService: ToasterService,){
    
  }

  config: ToasterConfig;

  position = 'toast-top-right';
  animationType = 'fade';
  title = 'HI there!';
  content = `I'm cool toaster!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;  
  showSuccess(Message: any) {
    this.showToast('success', 'Success!', Message);
  }

  showError(Message: any) {
    // this.toastr.error(Message, 'Oops!');
    this.showToast('error', 'Oops!', Message);
  }

  showWarning(Message: any) {
    // this.toastr.warning(Message, 'Alert!');
    this.showToast('warning', 'Alert!', Message);
  }

  showInfo(Message: any) {
    // this.toastr.info(Message);
    this.showToast('info', '', Message);
  }

  showCustom() {
    // this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }
  
  showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  clearToasts() {
    this.toasterService.clear();
  }   
}