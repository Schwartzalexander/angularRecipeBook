import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Operator, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-oberservables',
  templateUrl: './oberservables.component.html',
  styleUrls: ['./oberservables.component.css']
})
export class OberservablesComponent implements OnInit, OnDestroy {

  private counterSubscription: Subscription | undefined
  private customCounterSubscription: Subscription | undefined
  count: number = 0
  customCount: number = 0
  customOperatedData: string = 0
  customError: string = ''
  constructor() { }

  ngOnInit(): void {
    this.counterSubscription = interval(1000).subscribe(count => {
      this.count = count
      console.log(count)
    })

    const customObervable = new Observable(observer => {
      // This is the code that sends the event
      let count = 0
      setInterval(() => {
        observer.next(count)

        // Alternative functions
        // observer.error()
        // observer.complete()
        if (count > 5)
          observer.error(new Error('Count is bigger than 5. Stopping. I\'m outta here.'))
        count++
      }, 900)

      // Note: The observable will never reach 7, because it stops at 6, when it throws an error.
      if (count == 7) {
        observer.complete()
      }
    })

    // Apply a filter, which filters out all odd values and map all numbers to 'Round: '+(number+1)
    let operatedObserver = customObervable.pipe(filter(data => {
      return <number><any>data % 2 == 0
    }),
      map(data => {
        return 'Round: ' + (<number>data + 1)
      }));

    this.customCounterSubscription = customObervable.subscribe(data => {
      // this is, what happens, when a new event is received
      this.customCount = <number><any>data;
    }, error => {
      this.customError = (<Error>error).message
    }, () => {
      // Completed
      console.log('Completed');
    })

    operatedObserver.subscribe(data => {
      // this is, what happens, when a new event is received
      this.customOperatedData = <string>data;
    }, error => {
      this.customError = (<Error>error).message
    }, () => {
      // Completed
      console.log('Completed');
    })
  }

  ngOnDestroy(): void {
    this.counterSubscription?.unsubscribe()
    this.customCounterSubscription?.unsubscribe()
  }
}
