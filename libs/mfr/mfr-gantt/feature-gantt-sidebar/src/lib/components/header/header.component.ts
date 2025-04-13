import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UniqueComponent } from '@kudu/mfr-util-unique-component';

@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {}
