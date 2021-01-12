import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/junk/model/user.model';
import {DataService} from 'src/app/junk/services/data.service';
import {LoggingService} from 'src/app/shared/logging.service';
import {ShoppingService} from 'src/app/shopping-list/shopping.service';
import {UserService} from 'src/app/junk/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User | undefined;
  id: number | undefined;

  constructor(private dataService: DataService, private loggingService: LoggingService, private userService: UserService,
              private shoppingService: ShoppingService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.id = +params.id;
        this.user = this.userService.users[this.id];
      }
    );
  }

  areThereRoles(): boolean {
    if (this.user === undefined)
      return false;
    if (this.user.roles === undefined)
      return false;
    return this.user.roles.length > 0;
  }

  deleteUser(): void {
    if (this.id !== undefined)
      this.userService.users.splice(this.id, 1);
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }
}
