import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
  Type,
} from '@angular/core';

import { MkToastConfig, MkToastRef } from '../../services/toast.service';

import { mkSize } from '../../../size';

@Component({
  selector: 'mk-toast',
  imports: [NgComponentOutlet],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkToastComponent {
  private size = inject(mkSize);
  private toastRef = inject(MkToastRef);

  public component = input.required<Type<any>>();
  public config = input<MkToastConfig>();

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
