import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InfoCreatorSectionComponent } from '../info-creator-section/info-creator-section.component';
import { InfoExecutorsSectionComponent } from '../info-executors-section/info-executors-section.component';
import { InfoResourcesSectionComponent } from '../info-resources-section/info-resources-section.component';

@Component({
  selector: 'lib-info-tab',
  imports: [
    InfoExecutorsSectionComponent,
    InfoCreatorSectionComponent,
    InfoResourcesSectionComponent,
  ],
  templateUrl: './info-tab.component.html',
  styleUrl: './info-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoTabComponent {}
