import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBestHighlight]'
})
export class BestHighlightDirective {

  @HostBinding('style.backgroundColor') backgroundColor: string = "black"
  @HostBinding('style.color') color: string = "white"
  
  constructor() { }

  @HostListener('mouseenter') mouseover(event: Event) {
    this.backgroundColor = "orange"
    this.color = "darkred"
  }
  
  @HostListener('mouseleave') mousleave(event: Event) {
    this.backgroundColor = "black"
    this.color = "white"
  }
}
 