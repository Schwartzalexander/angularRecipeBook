import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  log(message: any): void {
    console.log(message);
  }

  constructor() {
  }
}
