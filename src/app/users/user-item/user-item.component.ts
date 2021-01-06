import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { LoggingService } from 'src/app/services/logging.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: User | undefined
  @Input() id: number | undefined

  constructor(private userService: UsersService, private loggingService: LoggingService) {
  }

  ngOnInit(): void {
  }

}
