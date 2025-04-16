import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InfoCreatorSectionComponent } from '../info-creator-section/info-creator-section.component';
import { InfoDeadlineSectionComponent } from '../info-deadline-section/info-deadline-section.component';
import { InfoExecutorsSectionComponent } from '../info-executors-section/info-executors-section.component';

@Component({
  selector: 'lib-info-tab',
  imports: [
    InfoExecutorsSectionComponent,
    InfoCreatorSectionComponent,
    InfoDeadlineSectionComponent,
  ],
  templateUrl: './info-tab.component.html',
  styleUrl: './info-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoTabComponent {}
