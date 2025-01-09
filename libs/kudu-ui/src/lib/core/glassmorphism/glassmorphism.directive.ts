import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

import { KuduGlassmorphismConfig } from './glassmorphism.interface';

const initialConfig = {
  blur: 4,
  transparency: 0.25,
};

@Directive({
  selector: '[kuduGlassmorphism]',
})
export class KuduGlassmorphismDirective implements OnInit {
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  public kuduGlassmorphismConfig = input<KuduGlassmorphismConfig>();
  public kuduGlassmorphismDisabled = input<boolean>(false);

  public get Config() {
    return this.kuduGlassmorphismConfig() || initialConfig;
  }

  ngOnInit(): void {
    if (this.kuduGlassmorphismDisabled()) {
      return;
    }

    const element = this.elementRef.nativeElement;

    element.style.backgroundColor = `rgba(255, 255, 255, ${this.Config.transparency})`;
    element.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
    element.style.backdropFilter = `blur(${this.Config.blur}px)`;
    element.style.border = `1px solid rgba(255, 255, 255, 0.18)`;
  }
}
