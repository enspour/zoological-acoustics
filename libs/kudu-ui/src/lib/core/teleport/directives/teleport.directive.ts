import {
  Directive,
  effect,
  inject,
  Injector,
  input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { KuduTeleportService } from '../services/teleport.service';

import { KuduTeleportRef } from '../services/teleport-ref';

@Directive({
  selector: '[kuduTeleport]',
})
export class KuduTeleportDirective implements OnDestroy {
  private injector = inject(Injector);
  private template = inject(TemplateRef);
  private vcRef = inject(ViewContainerRef);

  private teleportService = inject(KuduTeleportService);

  public teleportTo = input.required<Element>({ alias: 'kuduTeleport' });
  private teleportRef: KuduTeleportRef | null = null;

  constructor() {
    effect(() => {
      this.teleportRef?.dispose();
      this.teleportRef = this.teleportService.create({
        type: 'template',
        template: this.template,
        injector: this.injector,
        vcRef: this.vcRef,
      });

      this.teleportRef.attach(this.teleportTo());
    });
  }

  ngOnDestroy(): void {
    this.teleportRef?.dispose();
  }
}
