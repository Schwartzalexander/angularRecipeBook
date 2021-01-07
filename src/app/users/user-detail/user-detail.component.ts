import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data.service';
import { LoggingService } from 'src/app/services/logging.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User | undefined
  id: number | undefined

  constructor(private dataService: DataService, private loggingService: LoggingService, private userService: UserService, private shoppingService: ShoppingService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params) => {
        this.id = +params['id']
        this.user = this.userService.users[this.id]
      }
    )
  }


  areThereRoles() {
    if (this.user === undefined)
      return false
    if (this.user.roles === undefined)
      return false
    return this.user.roles.length > 0
  }
}
