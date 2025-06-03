import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';

import {
  MkAutofocusDirective,
  MkButtonComponent,
  MkIconComponent,
} from '@meerkat-ui';

@Component({
  selector: 'lib-kanban-column-creation',
  imports: [MkIconComponent, MkButtonComponent, MkAutofocusDirective],
  templateUrl: './kanban-column-creation.component.html',
  styleUrl: './kanban-column-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnCreationComponent {
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
