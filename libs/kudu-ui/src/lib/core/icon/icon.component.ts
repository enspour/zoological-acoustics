import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { kuduSize } from '../size';
import { IconRegisterService } from './icon-register.service';

@Component({
  selector: 'kudu-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--icon-src]': 'iconSrc()',
    '[style.--icon-size.px]': 'iconSize()',
  },
})
export class KuduIconComponent {
  private size = inject(kuduSize);
  private registerService = inject(IconRegisterService);

  public icon = input.required<string>();
  public iconSrc = computed(() => this.registerService.getIcon(this.icon()));
  public iconSize = input<number>();

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
