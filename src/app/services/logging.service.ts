import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  log(message: any) {
    console.log(message)
  }

  constructor() { }
}
