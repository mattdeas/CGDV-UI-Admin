/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit} from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';


@Component({
  selector: 'ngx-app',
  styleUrls: ['./app.component.scss'],
  template: `<router-outlet></router-outlet>
  			<toaster-container></toaster-container>
			<div class="overlay" *ngIf="load">
			  <div class="loader">
			    <img src="../assets/images/Spinner.svg" />
			  </div>
			</div>`,
})
export class AppComponent implements OnInit {
load = false;
  constructor(
  	private analytics: AnalyticsService,    
    ) {
  }

  ngOnInit() {
    this.analytics.trackPageViews();    
  }
  showLoader() {
    this.load = true;
  }

  hideLoader() {
    this.load = false;
  }

  
}
