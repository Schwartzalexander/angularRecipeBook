import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-oberservables',
  templateUrl: './oberservables.component.html',
  styleUrls: ['./oberservables.component.css']
})
export class OberservablesComponent implements OnInit, OnDestroy {

  private counterSubscription: Subscription | undefined;
  private customCounterSubscription: Subscription | undefined;
  count = 0;
  customCount = 0;
  customOperatedData = '';
  customError = '';

  constructor() {
  }

  ngOnInit(): void {
    this.counterSubscription = interval(1000).subscribe(count => {
      this.count = count;
      console.log(count);
    });

    const customObervable = new Observable(observer => {
      // This is the code that sends the event
      let count = 0;
      setInterval(() => {
        observer.next(count);

        // Alternative functions
        // observer.error()
        // observer.complete()
        if (count > 5) {
          observer.error(new Error('Count is bigger than 5. Stopping. I\'m outta here.'));
        }
        count++;
      }, 900);

      // Note: The observable will never reach 7, because it stops at 6, when it throws an error.
      if (count === 7) {
        observer.complete();
      }
    });

    // Apply a filter, which filters out all odd values and map all numbers to 'Round: '+(number+1)
    const operatedObserver = customObervable.pipe(filter(data => {
        return data as any as number % 2 === 0;
      }),
      map(data => {
        return 'Round: ' + (data as number + 1);
      }));

    this.customCounterSubscription = customObervable.subscribe(data => {
      // this is, what happens, when a new event is received
      this.customCount = data as any as number;
    }, error => {
      this.customError = (error as Error).message;
    }, () => {
      // Completed
      console.log('Completed');
    });

    operatedObserver.subscribe(data => {
      // this is, what happens, when a new event is received
      this.customOperatedData = data as string;
    }, error => {
      this.customError = (error as Error).message;
    }, () => {
      // Completed
      console.log('Completed');
    });
  }

  ngOnDestroy(): void {
    this.counterSubscription?.unsubscribe();
    this.customCounterSubscription?.unsubscribe();
  }
}
