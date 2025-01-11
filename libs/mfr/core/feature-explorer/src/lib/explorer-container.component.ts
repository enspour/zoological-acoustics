import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KuduSidebarComponent } from '@kudu-ui';

import { NgComponentOutlet } from '@angular/common';
import { ExplorerService } from './explorer.service';

@Component({
  selector: 'lib-explorer-container',
  imports: [NgComponentOutlet, KuduSidebarComponent],
  templateUrl: './explorer-container.component.html',
  styleUrl: './explorer-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorerContainerComponent {
  private explorerService = inject(ExplorerService);

  public isOpen = this.explorerService.isOpen;
  public config = this.explorerService.config;
}
