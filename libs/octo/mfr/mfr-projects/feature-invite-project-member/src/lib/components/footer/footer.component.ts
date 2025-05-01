import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MkButtonComponent } from '@meerkat-ui';

import { UniqueComponent } from '@octo/mfr-util-unique-component';

@Component({
  selector: 'lib-footer',
  imports: [MkButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent extends UniqueComponent {}
