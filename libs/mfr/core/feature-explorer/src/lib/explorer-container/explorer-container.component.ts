import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
} from '@angular/core';

import { KuduIconComponent, KuduSidebarComponent } from '@kudu-ui';

import { ExplorerResizerComponent } from '../explorer-resizer/explorer-resizer.component';
import { ExplorerConfig } from '../explorer.interface';
import { ExplorerService } from '../explorer.service';

@Component({
  selector: 'lib-explorer-container',
  imports: [
    NgComponentOutlet,
    KuduSidebarComponent,
    KuduIconComponent,
    ExplorerResizerComponent,
  ],
  templateUrl: './explorer-container.component.html',
  styleUrl: './explorer-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorerContainerComponent {
  private explorerService = inject(ExplorerService);

  public isOpen = this.explorerService.isOpen;
  public width = this.explorerService.width;

  public config = linkedSignal<
    ExplorerConfig<unknown> | null,
    ExplorerConfig<unknown> | null
  >({
    source: this.explorerService.config,
    computation: (config, previous) => config || previous?.value || null,
  });

  public onClose() {
    this.explorerService.close();
  }
}
