import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { UserService } from '@kudu/mfr-data-access-user';

@Component({
  selector: 'lib-home-page',
  imports: [JsonPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private userService = inject(UserService);
  public user = this.userService.user;
}
