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

import { MkIconComponent } from '../../../icon/icon.component';

import { mkSize } from '../../../size';

const CONTROL_SIZES = {
  sm: 12,
  md: 14,
  lg: 16,
};

@Component({
  selector: 'input[mk-input-number]',
  imports: [MkIconComponent],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'number',
  },
})
export class MkInputNumberComponent {
  private vcRef = inject(ViewContainerRef);
  private size = inject(mkSize);

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
