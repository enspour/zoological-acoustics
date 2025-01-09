import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
  model,
} from '@angular/core';

import { kuduSize } from '../../../size';

@Component({
  selector: 'kudu-menu-group',
  imports: [],
  templateUrl: './menu-group.component.html',
  styleUrl: './menu-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduMenuGroupComponent {
  private size = inject(kuduSize);

  public isOpen = model(true);
  public title = input.required<string>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  public toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
