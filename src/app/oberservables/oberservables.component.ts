import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-oberservables',
  templateUrl: './oberservables.component.html',
  styleUrls: ['./oberservables.component.css']
})
export class OberservablesComponent implements OnInit, OnDestroy {

  private counterSubscription: Subscription | undefined
  count: number = 0
  constructor() { }

  ngOnInit(): void {
    this.counterSubscription = interval(1000).subscribe(count => {
      this.count = count
      console.log(count)
    })
  }

  ngOnDestroy(): void {
    this.counterSubscription?.unsubscribe()
  }
}
