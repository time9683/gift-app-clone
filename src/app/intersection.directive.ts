import { Directive, ElementRef,EventEmitter,Output } from '@angular/core';

@Directive({
  selector: '[appIntersection]',
  standalone: true
})
export class IntersectionDirective {

@Output() onIntersection = new EventEmitter<void>();
observer: IntersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    this.onIntersection.emit();
  }
},
{

  rootMargin: '300px',
  threshold: 0.2
});

  constructor(private ele :ElementRef) {

this.observer.observe(ele.nativeElement); 
  }


  ngOnDestroy(){
    this.observer.unobserve(this.ele.nativeElement);
  }


   

}
