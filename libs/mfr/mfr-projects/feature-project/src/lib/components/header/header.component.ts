import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduDialogService, KuduIconComponent } from '@kudu-ui';

import { TabLinkComponent, TabsComponent } from '@kudu/mfr-ui-kit';

import { ProjectSettingsModalComponent } from '@kudu/mfr-feature-project-settings';

import { ProjectPageComponent } from '../../project-page.component';

@Component({
  selector: 'lib-header',
  imports: [KuduIconComponent, TabsComponent, TabLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private dialogService = inject(KuduDialogService);

  private page = inject(ProjectPageComponent);

  public project = this.page.project;

  public onOpenSettings() {
    const project = this.project();

    if (!project) {
      return;
    }

    this.dialogService.open(ProjectSettingsModalComponent, {
      data: {
        uuid: project.uuid,
      },
      hasBackdrop: true,
    });
  }
}
