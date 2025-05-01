import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';

import {
  MkAutofocusDirective,
  MkEditableComponent,
  MkIconComponent,
} from '@meerkat-ui';

@Component({
  selector: 'lib-kanban-task-creation',
  imports: [MkIconComponent, MkEditableComponent, MkAutofocusDirective],
  templateUrl: './kanban-task-creation.component.html',
  styleUrl: './kanban-task-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTaskCreationComponent {
  public isCreating = signal(false);

  public byCreate = output<string>();

  public onStart() {
    this.isCreating.set(true);
  }

  public onClose() {
    this.isCreating.set(false);
  }

  public onCreate(title: string) {
    this.byCreate.emit(title);
    this.isCreating.set(false);
  }
}
