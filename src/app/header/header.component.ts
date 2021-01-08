import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoggingService} from '../services/logging.service';
import {DataStorageService} from '../services/data-storage.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  recipesSuccessSubject: Subject<any> = new Subject<any>();
  recipesErrorSubject: Subject<any> = new Subject<any>();

  constructor(private loggingService: LoggingService, private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
  }

  onSaveData(): void {

    this.dataStorageService.storeRecipes(this.recipesSuccessSubject, this.recipesErrorSubject);
    // If successful
    this.recipesSuccessSubject.subscribe((response) => {
      // show success message
      // ...
      this.recipesSuccessSubject.unsubscribe();
    });
    // If not successful
    this.recipesErrorSubject.subscribe((response) => {
      // show error message
      // ...
      this.recipesErrorSubject.unsubscribe();
    });
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes();
  }

  ngOnDestroy(): void {
    this.recipesSuccessSubject.unsubscribe();
    this.recipesErrorSubject.unsubscribe();
  }
}
