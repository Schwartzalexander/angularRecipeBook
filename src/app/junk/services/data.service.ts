import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LoggingService} from '../../shared/logging.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private loggingService: LoggingService) {
  }

  subject = new Subject<string>();

}
