import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostBinding,
  inject,
  model,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

import { KuduIconComponent } from '../../../icon/icon.component';

import { kuduSize } from '../../../size';

const CONTROL_SIZES = {
  sm: 12,
  md: 14,
  lg: 16,
};

@Component({
  selector: 'input[kudu-input-number]',
  imports: [KuduIconComponent],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'number',
  },
})
export class KuduInputNumberComponent {
  private vcRef = inject(ViewContainerRef);
  private size = inject(kuduSize);

  private controlsTemplate = viewChild('controls', { read: TemplateRef });

  public controlSize = computed(() => CONTROL_SIZES[this.size()]);

  public value = model<number>();

  constructor() {
    effect(() => {
      const template = this.controlsTemplate();

      if (template) {
        this.vcRef.createEmbeddedView(template);
      }
    });
  }

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }

  @HostBinding('value')
  public get Value() {
    return this.value();
  }

  public onIncrease() {
    this.value.update((value) => (value || 0) + 1);
  }

  public onDecrease() {
    this.value.update((value) => (value || 0) - 1);
  }
}
