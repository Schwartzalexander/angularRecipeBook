import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'aliceblue')
  }

  @HostListener('mouseenter') mouseover(event: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'green')
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white')
  }
  
  @HostListener('mouseleave') mousleave(event: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'aliceblue')
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black')
  }
}
