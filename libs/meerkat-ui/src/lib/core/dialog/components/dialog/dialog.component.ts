import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
  Type,
} from '@angular/core';

import { MkClickOutsideDirective } from '../../../click-outside';
import { MkGlassmorphismDirective } from '../../../glassmorphism';

import { MkDialogConfig, MkDialogRef } from '../../services/dialog.service';

@Component({
  selector: 'mk-dialog',
  imports: [
    NgComponentOutlet,
    MkClickOutsideDirective,
    MkGlassmorphismDirective,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkDialogComponent {
  private dialogRef = inject(MkDialogRef);

  public component = input.required<Type<any>>();
  public config = input<MkDialogConfig>();

  @HostListener('mkClickOutside')
  public onClickOutside() {
    this.dialogRef.close();
  }
}
