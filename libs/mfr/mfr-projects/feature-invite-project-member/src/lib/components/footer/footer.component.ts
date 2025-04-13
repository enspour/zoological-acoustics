import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduButtonComponent } from '@kudu-ui';

import { UniqueComponent } from '@kudu/mfr-util-unique-component';

@Component({
  selector: 'lib-footer',
  imports: [KuduButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent extends UniqueComponent {}
