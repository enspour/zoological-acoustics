import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IconRegisterService {
  private assets = 'assets';

  public getIcon(icon: string) {
    return `url(${this.assets}/${icon}.svg)`;
  }
}
