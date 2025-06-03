import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ProjectService } from '@kraken/mfr-data-access-project';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-project-page',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnChanges {
  private projectService = inject(ProjectService);

  public projectUuid = input.required<string>();

  public project = this.projectService.project;
  public error = this.projectService.error;
  public isLoading = this.projectService.isLoading;

  ngOnChanges(): void {
    this.projectService.setProject(this.projectUuid());
  }
}
