import {Component, Input, OnInit} from '@angular/core';
import {User} from 'src/app/junk/model/user.model';
import {LoggingService} from 'src/app/shared/logging.service';
import {UserService} from 'src/app/junk/services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: User | undefined;
  @Input() id: number | undefined;

  constructor(private userService: UserService, private loggingService: LoggingService) {
  }

  ngOnInit(): void {
  }

}
