import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
} from '@angular/core';

import { MkComponentTeleport, MkTemplateTeleport } from '../interfaces';

export interface MkTeleportRef {
  attach(to: Element): void;
  dispose(): void;
}

export class MkTemplateTeleportRef<C = any> implements MkTeleportRef {
  private embeddedViewRef: EmbeddedViewRef<C> | null = null;

  constructor(private teleport: MkTemplateTeleport) {}

  public attach(to: Element) {
    this.embeddedViewRef?.destroy();
    this.embeddedViewRef = this.teleport.vcRef.createEmbeddedView(
      this.teleport.template,
      this.teleport.context,
      { injector: this.teleport.injector },
    );

    this.embeddedViewRef.rootNodes.forEach((rootNode) =>
      to.appendChild(rootNode),
    );
  }

  public dispose() {
    this.embeddedViewRef?.destroy();
  }
}

export class MkComponentTeleportRef<C = any> implements MkTeleportRef {
  private componentRef: ComponentRef<C> | null = null;

  constructor(
    private teleport: MkComponentTeleport,
    private appRef: ApplicationRef,
  ) {}

  public get ComponentRef() {
    return this.componentRef;
  }

  public attach(to: Element) {
    this.componentRef?.destroy();
    this.componentRef = this.createComponent(this.teleport);

    this.updateInputs();

    const componentHost = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    to.appendChild(componentHost);
  }

  public dispose() {
    this.componentRef?.destroy();
  }

  private createComponent(teleport: MkComponentTeleport) {
    if (teleport.vcRef) {
      return teleport.vcRef.createComponent(teleport.component, {
        injector: teleport.injector,
      });
    }

    const environmentInjector = teleport.injector?.get(
      EnvironmentInjector,
      this.appRef.injector,
    );

    const componentRef = createComponent(teleport.component, {
      elementInjector: teleport.injector,
      environmentInjector: environmentInjector || this.appRef.injector,
    });

    this.appRef.attachView(componentRef.hostView);

    return componentRef;
  }

  private updateInputs() {
    if (!this.componentRef) {
      return;
    }

    const inputs = Object.keys(this.teleport.inputs || {});

    for (const input of inputs) {
      this.componentRef.setInput(input, this.teleport.inputs![input]);
    }
  }
}
