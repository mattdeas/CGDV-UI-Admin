import {Component, OnDestroy} from '@angular/core';
import { UserService } from '../../@core/data/users.service';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './admin.component.html',
})
export class AdminComponent {

  constructor(private userService: UserService) {      
  }

}
