import { ChangeDetectionStrategy, Component, model } from '@angular/core';

import {
  KuduOptionComponent,
  KuduSelectComponent,
  KuduSizeDirective,
} from '@kudu-ui';

import { GanttGrouping } from '@kudu/mfr-data-access-gantt';

@Component({
  selector: 'lib-grouping',
  imports: [KuduSelectComponent, KuduOptionComponent, KuduSizeDirective],
  templateUrl: './grouping.component.html',
  styleUrl: './grouping.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupingComponent {
  public grouping = model.required<GanttGrouping>();
}
