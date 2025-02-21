import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { EmployeesService } from '@kudu/mfr-data-access-employees';
import { provideKanbanDataAccess } from '@kudu/mfr-data-access-kanban';

import { KanbanBoardComponent } from '@kudu/mfr-feature-kanban-board';
import { KanbanToolbarComponent } from '@kudu/mfr-feature-kanban-toolbar';

@Component({
  selector: 'lib-kanban-page',
  imports: [KanbanBoardComponent, KanbanToolbarComponent],
  templateUrl: './kanban-page.component.html',
  styleUrl: './kanban-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideKanbanDataAccess()],
})
export class KanbanPageComponent implements OnInit {
  private employeesService = inject(EmployeesService);

  ngOnInit(): void {
    this.employeesService.reload();
  }
}
