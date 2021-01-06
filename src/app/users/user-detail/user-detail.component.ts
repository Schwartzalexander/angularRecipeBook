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

  dataServiceSubscription: Subscription | undefined

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

  ngOnDestroy(): void {
    // The subscription could be destroyed here, but if we did that, it wouldn't do anything at all.
    // To show the effect (receive an event), we must switch to the shopping list and 
    // therefor destroy this component.
    //this.dataServiceSubscription?.unsubscribe()
  }
 
}
