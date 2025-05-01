import { ChangeDetectionStrategy, Component, model } from '@angular/core';

import {
  MkOptionComponent,
  MkSelectComponent,
  MkSizeDirective,
} from '@meerkat-ui';

import { GanttGrouping } from '@octo/mfr-data-access-gantt';

@Component({
  selector: 'lib-grouping',
  imports: [MkSelectComponent, MkOptionComponent, MkSizeDirective],
  templateUrl: './grouping.component.html',
  styleUrl: './grouping.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupingComponent {
  public grouping = model.required<GanttGrouping>();
}
