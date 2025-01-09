import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  TemplateRef,
  viewChild,
} from '@angular/core';

import {
  KuduPortalRef,
  KuduPortalsService,
} from '../../services/portals.service';

@Component({
  selector: 'kudu-teleport',
  imports: [],
  templateUrl: './teleport.component.html',
  styleUrl: './teleport.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTeleportComponent implements OnInit, OnDestroy {
  private portalsService = inject(KuduPortalsService);

  private template = viewChild(TemplateRef);

  public portalId = input.required<string>();
  public portalRef: KuduPortalRef | null = null;

  ngOnInit(): void {
    const id = this.portalId();
    const template = this.template();

    if (!template) {
      return;
    }

    this.portalRef = this.portalsService.open({
      id,
      type: 'template',
      template,
    });
  }

  ngOnDestroy(): void {
    this.portalRef?.close();
  }
}
