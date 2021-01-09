import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isGameVisible = false
  getGameButtonText() {
    if (this.isGameVisible)
      return "Hide the game"
    else
      return "Show the game"
  }

  onToggleGameClick() {
    this.isGameVisible = !this.isGameVisible
  }
}
