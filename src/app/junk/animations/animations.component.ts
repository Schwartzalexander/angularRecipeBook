import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css'],
  animations: [
    trigger('buttonState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlight', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal => highlight', animate(300)),
      transition('highlight => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlight', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlight', animate(300)),
      transition('highlight => normal', animate(800)),
      // transition('normal <=> *', animate(2000, style({
      //   borderRadius: '50px'
      // })))
      transition('normal <=> *', [
          style({
            'background-color': 'orange',
          }),
          animate(1000, style({
            borderRadius: '50px'
          })),
          animate(500)
        ]
      )
    ])
  ]
})
export class AnimationsComponent implements OnInit {

  state = 'normal';
  wildState = 'normal';

  constructor() {
  }

  ngOnInit(): void {
  }

  onAnimate(): void {
    this.state = this.state === 'normal' ? 'highlight' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlight' : 'normal';
  }

  onShrink(): void {
    this.wildState = this.wildState === 'shrunken' ? 'normal' : 'shrunken';
  }
}
