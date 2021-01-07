import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [
    new User('erSch', 'mail@aSchwartz.de', '123456', 'male', ['admin'], 'against'),
    new User('Mephisto', 'mail@hell.org', 'hellguy', 'male', ['devil'], 'against'),
    new User('Södarsch', 'fickarsch@csu.de', 'söder','guy with small dick', ['fashist'], 'for')]

  constructor() { }


}
