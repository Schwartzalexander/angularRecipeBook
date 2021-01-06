

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  userForm : FormGroup | undefined
  
  constructor(private userService: UserService, private loggingService: LoggingService) {
  }

  ngOnInit(): void {
    this.users = this.userService.users

    this.userForm = new FormGroup({
      'name': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null),
      'gender': new FormControl('transsex man to female'),

    });
  }

}
