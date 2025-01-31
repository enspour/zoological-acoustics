import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduIconComponent } from '@kudu-ui';

import { TabLinkComponent, TabsComponent } from '@kudu/mfr-ui-kit';

import { ProjectPageComponent } from '../../project-page.component';

@Component({
  selector: 'lib-header',
  imports: [KuduIconComponent, TabsComponent, TabLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private page = inject(ProjectPageComponent);

  public project = this.page.project;
}
