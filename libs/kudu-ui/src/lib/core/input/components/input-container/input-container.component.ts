import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { kuduSize } from '../../../size';

@Component({
  selector: 'kudu-input-container',
  imports: [],
  templateUrl: './input-container.component.html',
  styleUrl: './input-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduInputContainerComponent {
  public size = inject(kuduSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
