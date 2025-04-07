import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ExplorerService } from '../explorer.service';
import { ExplorerComponent } from '../explorer/explorer.component';

@Component({
  selector: 'lib-explorer-container',
  imports: [ExplorerComponent],
  templateUrl: './explorer-container.component.html',
  styleUrl: './explorer-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorerContainerComponent {
  private explorerService = inject(ExplorerService);

  public instances = this.explorerService.instances;
}
