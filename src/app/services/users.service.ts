import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [
    new User('erSch', 'mail@aSchwartz.de', '123456', 'male'),
    new User('Mephisto', 'mail@hell.org', 'hellguy', 'male'),
    new User('Södarsch', 'fickarsch@csu.de', 'söder','guy with small dick')]

  constructor() { }


}
