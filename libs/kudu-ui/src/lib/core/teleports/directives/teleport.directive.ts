import {
  Directive,
  inject,
  input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';

import {
  KuduTeleportRef,
  KuduTeleportsService,
} from '../services/teleports.service';

@Directive({
  selector: '[kuduTeleport]',
})
export class KuduTeleportDirective implements OnInit, OnDestroy {
  private teleportsService = inject(KuduTeleportsService);

  private template = inject(TemplateRef);

  public teleportPlaceId = input.required<string>({ alias: 'kuduTeleport' });
  public teleportRef: KuduTeleportRef | null = null;

  ngOnInit(): void {
    this.teleportRef = this.teleportsService.open({
      placeId: this.teleportPlaceId(),
      type: 'template',
      template: this.template,
    });
  }

  ngOnDestroy(): void {
    this.teleportRef?.close();
  }
}
