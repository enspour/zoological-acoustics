import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
} from '@angular/core';

export interface KuduMenu {}

export const KuduMenu = new InjectionToken<KuduMenu>('kudu-ui/menu');

@Component({
  selector: 'kudu-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: KuduMenu,
      useExisting: KuduMenuComponent,
    },
  ],
})
export class KuduMenuComponent implements KuduMenu {}
