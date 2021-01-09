import {Injectable} from '@angular/core';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [
    new User('1', 'erSch', 'mail@aSchwartz.de', '123456', 'male', ['admin'], 'against', ''),
    new User('2', 'Mephisto', 'mail@hell.org', 'hellguy', 'male', ['devil'], 'against', ''),
    new User('3', 'Södarsch', 'fickarsch@csu.de', 'söder', 'guy with small dick', ['fashist'], 'for', '')
  ];

  constructor() {
  }

}
