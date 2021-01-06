

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { LoggingService } from 'src/app/services/logging.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : User[] | undefined
  
  constructor(private userService: UserService, private loggingService: LoggingService) {
  }

  ngOnInit(): void {
    this.users = this.userService.users
  }

}
