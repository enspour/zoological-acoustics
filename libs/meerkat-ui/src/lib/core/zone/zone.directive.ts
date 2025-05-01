import { Directive, ElementRef, inject, OnDestroy } from '@angular/core';

@Directive({
  selector: '[mkZone]',
})
export class MkZoneDirective implements OnDestroy {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private parent = inject(MkZoneDirective, {
    skipSelf: true,
    optional: true,
  });

  private children: MkZoneDirective[] = [];

  constructor() {
    this.parent?.register(this);
  }

  ngOnDestroy(): void {
    this.parent?.unregister(this);
  }

  public get Element() {
    return this.elementRef.nativeElement;
  }

  public contains(target: HTMLElement): boolean {
    return (
      this.elementRef.nativeElement.contains(target) ||
      this.children.some((child) => child.contains(target))
    );
  }

  public register(child: MkZoneDirective) {
    this.children.push(child);
  }

  public unregister(child: MkZoneDirective) {
    const index = this.children.findIndex((c) => c === child);

    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
}
