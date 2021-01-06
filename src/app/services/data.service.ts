import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private loggingService : LoggingService) { }

  eventEmitter = new Subject<string>()
  
}
