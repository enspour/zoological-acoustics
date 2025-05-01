import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { TaskBoard } from '@octo/domain';

import { TaskBoardsService } from '@octo/mfr-data-access-task-boards';

import { TaskBoardMoreComponent } from '@octo/mfr-ui-task-board';

@Component({
  selector: 'lib-kanban-board-tab',
  imports: [RouterLink, RouterLinkActive, TaskBoardMoreComponent],
  templateUrl: './kanban-board-tab.component.html',
  styleUrl: './kanban-board-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardTabComponent {
  private taskBoardsService = inject(TaskBoardsService);

  public board = input.required<TaskBoard>();

  public byClick = output<Event>();

  @HostListener('click', ['$event'])
  public onClick(event: Event) {
    this.byClick.emit(event);
  }

  public onRename() {
    console.log(this.board());
  }

  public async onDelete() {
    await this.taskBoardsService.deleteBoard(this.board());
  }
}
