import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-kanban-page',
  imports: [],
  templateUrl: './kanban-page.component.html',
  styleUrl: './kanban-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanPageComponent {}
