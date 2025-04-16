import { Directive, ElementRef, inject, OnDestroy } from '@angular/core';

@Directive({
  selector: '[kuduZone]',
})
export class KuduZoneDirective implements OnDestroy {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private parent = inject(KuduZoneDirective, {
    skipSelf: true,
    optional: true,
  });

  private children: KuduZoneDirective[] = [];

  constructor() {
    this.parent?.register(this);
  }

  ngOnDestroy(): void {
    this.parent?.unregister(this);
  }

  public contains(target: HTMLElement): boolean {
    return (
      this.elementRef.nativeElement.contains(target) ||
      this.children.some((child) => child.contains(target))
    );
  }

  private register(child: KuduZoneDirective) {
    this.children.push(child);
  }

  private unregister(child: KuduZoneDirective) {
    const index = this.children.findIndex((c) => c === child);

    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
}
