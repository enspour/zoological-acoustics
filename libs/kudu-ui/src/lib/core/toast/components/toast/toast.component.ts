import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
  Type,
} from '@angular/core';

import { KuduToastConfig, KuduToastRef } from '../../services/toast.service';

import { kuduSize } from '../../../size';

@Component({
  selector: 'kudu-toast',
  imports: [NgComponentOutlet],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduToastComponent {
  private size = inject(kuduSize);
  private toastRef = inject(KuduToastRef);

  public component = input.required<Type<any>>();
  public config = input<KuduToastConfig>();

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.size()} 
      ${this.config()?.placement || 'bottom'}
    `;
  }

  public onClose() {
    this.toastRef.close();
  }
}
