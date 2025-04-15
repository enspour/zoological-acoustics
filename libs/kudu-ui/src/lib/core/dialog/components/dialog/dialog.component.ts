import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
  Type,
} from '@angular/core';

import { KuduClickOutsideDirective } from '../../../click-outside';
import { KuduGlassmorphismDirective } from '../../../glassmorphism';
import { KuduZoneDirective } from '../../../zone';

import { KuduDialogConfig, KuduDialogRef } from '../../services/dialog.service';

@Component({
  selector: 'kudu-dialog',
  imports: [NgComponentOutlet, KuduGlassmorphismDirective],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    KuduZoneDirective,
    {
      directive: KuduClickOutsideDirective,
      outputs: ['byClickOutside'],
    },
  ],
})
export class KuduDialogComponent {
  private dialogRef = inject(KuduDialogRef);

  public component = input.required<Type<any>>();
  public config = input<KuduDialogConfig>();

  @HostListener('byClickOutside')
  public onClickOutside() {
    this.dialogRef.close();
  }
}
