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

import { MkTeleportService } from '../services/teleport.service';

import { MkTeleportRef } from '../services/teleport-ref';

@Directive({
  selector: '[mkTeleport]',
})
export class MkTeleportDirective implements OnDestroy {
  private injector = inject(Injector);
  private template = inject(TemplateRef);
  private vcRef = inject(ViewContainerRef);

  private teleportService = inject(MkTeleportService);

  public teleportTo = input.required<Element>({ alias: 'mkTeleport' });
  private teleportRef: MkTeleportRef | null = null;

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
