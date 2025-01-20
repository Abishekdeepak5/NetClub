import {Directive, ElementRef} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class PopupDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}