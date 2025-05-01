import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[mkRipple]',
  standalone: true,
})
export class MkRippleDirective implements OnInit {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private elementRect: DOMRect | null = null;

  private ripple: HTMLDivElement | null = null;

  public mkRippleColor = input<string>();

  ngOnInit(): void {
    this.elementRef.nativeElement.style.position = 'relative';
    this.elementRef.nativeElement.style.overflow = 'hidden';
  }

  @HostListener('click', ['$event'])
  public launchRipple(event: MouseEvent) {
    this.removeRipple();
    this.createRipple(event);
    this.animateRipple();
  }

  private removeRipple() {
    if (this.ripple) {
      this.elementRef.nativeElement.removeChild(this.ripple);
    }

    this.ripple = null;
  }

  private createRipple(event: MouseEvent) {
    this.ripple = this.ripple || document.createElement('div');

    const element = this.elementRef.nativeElement;

    this.elementRect = this.elementRect || element.getBoundingClientRect();

    const diameter = Math.max(this.elementRect.width, this.elementRect.height);
    const radius = diameter / 2;

    this.ripple.style.width = `${diameter}px`;
    this.ripple.style.height = `${diameter}px`;
    this.ripple.style.left = `${event.clientX - (this.elementRect.left + radius)}px`;
    this.ripple.style.top = `${event.clientY - (this.elementRect.top + radius)}px`;
    this.ripple.style.position = 'absolute';
    this.ripple.style.borderRadius = '50%';
    this.ripple.style.transition = '600ms';
    this.ripple.style.backgroundColor = this.mkRippleColor() || '#ffffff';

    this.ripple.addEventListener('transitionend', () => this.removeRipple());

    element.appendChild(this.ripple);
  }

  private animateRipple() {
    if (!this.ripple) {
      return;
    }

    this.ripple.style.transform = 'scale(0)';
    this.ripple.style.opacity = '0.7';

    setTimeout(() => {
      if (this.ripple) {
        this.ripple.style.transform = 'scale(4)';
        this.ripple.style.opacity = '0';
      }
    }, 0);
  }
}
