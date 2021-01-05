import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private loggingService : LoggingService) { }

  eventEmitter = new EventEmitter<string>()
  
}
