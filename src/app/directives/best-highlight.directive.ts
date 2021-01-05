import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBestHighlight]'
})
export class BestHighlightDirective implements OnInit{
  @Input() defaultBackground = 'black'
  @Input() defaultColor = 'white'
  @Input() mouseoverBackground = 'orange'
  @Input('appBestHighlight') mouseoverColor = 'darkred'
  @HostBinding('style.backgroundColor') backgroundColor = ""
  @HostBinding('style.color') color = ""

  constructor() { }

  ngOnInit() {
  this.backgroundColor = this.defaultBackground
  this.color = this.defaultColor
}

@HostListener('mouseenter') mouseover(event: Event) {
  this.backgroundColor = this.mouseoverBackground
  this.color = this.mouseoverColor
}

@HostListener('mouseleave') mousleave(event: Event) {
  this.backgroundColor = this.defaultBackground
  this.color = this.defaultColor
}
}
