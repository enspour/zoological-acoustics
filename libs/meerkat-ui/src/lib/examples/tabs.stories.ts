import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import {
  MkInputComponent,
  MkSize,
  MkSizeDirective,
  MkTabComponent,
  MkTabContentDirective,
  MkTabsComponent,
} from '../core';

@Component({
  selector: `lib-rnd`,
  template: `{{ rnd }}`,
})
class RndComponent {
  public rnd = Math.random();
}

type Tabs = MkTabsComponent & { mkSize: MkSize };

const meta: Meta<Tabs> = {
  component: MkTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MkTabComponent,
        MkTabContentDirective,
        MkInputComponent,
        MkSizeDirective,
        RndComponent,
      ],
    }),
  ],
  argTypes: {
    currentIndex: { control: 'number' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    mkSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    currentIndex: 0,
    orientation: 'horizontal',
    mkSize: 'sm',
  },
};

export default meta;

type Story = StoryObj<Tabs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-tabs 
        [currentIndex]="currentIndex" 
        [orientation]="orientation"
        [mkSize]="mkSize" 
      >
        <mk-tab name="Preview"> Preview Content </mk-tab>
        <mk-tab name="HTML"> HTML Content </mk-tab>
        <mk-tab name="Random"> <lib-rnd /> </mk-tab>
      </mk-tabs>
    `,
  }),
};

export const Lazy: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-tabs 
        [currentIndex]="currentIndex" 
        [orientation]="orientation"
        [mkSize]="mkSize" 
      >
        <mk-tab name="Preview">
          <ng-template mkTabContent> Preview Content </ng-template>
        </mk-tab>

        <mk-tab name="HTML">
          <ng-template mkTabContent> HTML Content </ng-template>
        </mk-tab>

        <mk-tab name="Random">
          <ng-template mkTabContent> <lib-rnd /> </ng-template>
        </mk-tab>
      </mk-tabs>
    `,
  }),
};
