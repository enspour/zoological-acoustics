import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';

import {
  KuduAutofocusDirective,
  KuduButtonComponent,
  KuduIconComponent,
} from '@kudu-ui';

@Component({
  selector: 'lib-kanban-column-creation',
  imports: [KuduIconComponent, KuduButtonComponent, KuduAutofocusDirective],
  templateUrl: './kanban-column-creation.component.html',
  styleUrl: './kanban-column-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnCreationComponent {
  public isCreation = signal(false);

  public byCreate = output<string>();

  public onStart() {
    this.isCreation.set(true);
  }

  public onClose() {
    this.isCreation.set(false);
  }

  public onCreate(title: string) {
    this.byCreate.emit(title);
    this.isCreation.set(false);
  }
}
