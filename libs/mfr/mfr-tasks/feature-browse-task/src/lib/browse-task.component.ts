import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Task } from '@kudu/domain';

@Component({
  selector: 'lib-browse-task',
  imports: [],
  templateUrl: './browse-task.component.html',
  styleUrl: './browse-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseTaskComponent {
  public task = input.required<Task>();
}
