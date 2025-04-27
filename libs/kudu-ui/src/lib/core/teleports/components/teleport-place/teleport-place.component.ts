import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { KuduTeleportsService } from '../../services/teleports.service';

@Component({
  selector: 'kudu-teleport-place',
  imports: [NgTemplateOutlet, NgComponentOutlet],
  templateUrl: './teleport-place.component.html',
  styleUrl: './teleport-place.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTeleportPlaceComponent {
  private teleportService = inject(KuduTeleportsService);

  public id = input.required<string>();

  public teleports = computed(() =>
    this.teleportService.teleports().filter((p) => p.placeId === this.id()),
  );
}
