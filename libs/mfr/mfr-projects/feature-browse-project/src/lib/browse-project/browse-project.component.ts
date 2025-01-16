import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Project } from '@kudu/domain';

@Component({
  selector: 'lib-browse-project',
  imports: [],
  templateUrl: './browse-project.component.html',
  styleUrl: './browse-project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseProjectComponent {
  public project = input.required<Project>();
}
