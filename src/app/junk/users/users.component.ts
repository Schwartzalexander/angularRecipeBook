import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../model/user.model';
import {LoggingService} from '../../shared/logging.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] | undefined;
  userForm: FormGroup | undefined;

  constructor(private userService: UserService, private loggingService: LoggingService) {
  }

  ngOnInit(): void {
    this.users = this.userService.users;

    this.userForm = new FormGroup({
      'name': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null),
      'gender': new FormControl('transsex man to female'),

    });
  }

}
