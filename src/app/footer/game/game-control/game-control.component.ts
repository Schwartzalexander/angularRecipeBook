import { Component, EventEmitter, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output('gameTick') tickEmitter = new EventEmitter<number>()
  isRunning = false
  counter = 0

  odds: number[] = []
  evens: number[] = []
interval : any;
  constructor() { }

  ngOnInit(): void {
  }

  onStart() {
    this.isRunning = true
    this.interval = setInterval(() => this.gameTick(), 1000);
  }

  onStop() {
    this.isRunning = false
    clearInterval(this.interval)
  }

  gameTick() {
    this.tickEmitter.emit(++this.counter)
    if (this.counter % 2 == 0)
      this.evens.push(this.counter)
    else
      this.odds.push(this.counter)
  }
}
