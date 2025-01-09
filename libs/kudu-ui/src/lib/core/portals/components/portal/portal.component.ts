import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { KuduPortalsService } from '../../services/portals.service';

@Component({
  selector: 'kudu-portal',
  imports: [NgTemplateOutlet, NgComponentOutlet],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduPortalComponent {
  private portalsService = inject(KuduPortalsService);

  public id = input.required<string>();

  public portals = computed(() =>
    this.portalsService.portals().filter((p) => p.id === this.id()),
  );
}
