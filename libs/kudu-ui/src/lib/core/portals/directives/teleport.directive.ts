import {
  Directive,
  inject,
  input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';

import { KuduPortalRef, KuduPortalsService } from '../services/portals.service';

@Directive({
  selector: '[kuduTeleport]',
})
export class KuduTeleportDirective implements OnInit, OnDestroy {
  private portalsService = inject(KuduPortalsService);

  private template = inject(TemplateRef);

  public portalId = input.required<string>({ alias: 'kuduTeleport' });
  public portalRef: KuduPortalRef | null = null;

  ngOnInit(): void {
    const id = this.portalId();

    this.portalRef = this.portalsService.open({
      id,
      type: 'template',
      template: this.template,
    });
  }

  ngOnDestroy(): void {
    this.portalRef?.close();
  }
}
