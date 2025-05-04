import { Component } from '@angular/core';
import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import {
  MkInputComponent,
  MkSize,
  MkSizeDirective,
  MkTabComponent,
  MkTabContentDirective,
  MkTabsComponent,
} from '../../core';

@Component({
  selector: `lib-rnd`,
  template: `You are {{ animal }}`,
})
class RndAnimalComponent {
  private animals = [
    'Meerkat',
    'Octopus',
    'Gorilla',
    'Rabbit',
    'Raccoon',
    'Dolphin',
  ];

  public animal = this.animals[this.getRndIndex()];

  public getRndIndex() {
    return Math.floor(Math.random() * this.animals.length);
  }
}

type Tabs = MkTabsComponent & {
  mkSize: MkSize;
};

const meta: Meta<Tabs> = {
  component: MkTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MkTabComponent,
        MkTabContentDirective,
        MkInputComponent,
        MkSizeDirective,
        RndAnimalComponent,
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
    mkSize: 'md',
  },
};

export default meta;

type Story = StoryObj<Tabs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-tabs ${argsToTemplate(args)}>
        <mk-tab name="Meerkat"> Meerkat </mk-tab>
        <mk-tab name="Octopus"> Octopus </mk-tab>
        <mk-tab name="Gorilla"> Gorilla </mk-tab>
        <mk-tab name="Random animal"> <lib-rnd /> </mk-tab>
      </mk-tabs>
    `,
  }),
};

export const Lazy: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-tabs ${argsToTemplate(args)}>
        <mk-tab name="Meerkat">
          <ng-template mkTabContent> Meerkat </ng-template>
        </mk-tab>

        <mk-tab name="Octopus">
          <ng-template mkTabContent> Octopus </ng-template>
        </mk-tab>

        <mk-tab name="Gorilla">
          <ng-template mkTabContent> Gorilla </ng-template>
        </mk-tab>

        <mk-tab name="You are ???">
          <ng-template mkTabContent> <lib-rnd /> </ng-template>
        </mk-tab>
      </mk-tabs>
    `,
  }),
};
