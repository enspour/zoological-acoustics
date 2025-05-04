import { Component } from '@angular/core';
import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import {
  MkAccordionComponent,
  MkAccordionItemComponent,
  MkAccordionItemContentDirective,
  MkButtonComponent,
  MkSize,
  MkSizeDirective,
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

type Accordion = MkAccordionComponent & {
  mkSize: MkSize;
};

const meta: Meta<Accordion> = {
  component: MkAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MkAccordionItemComponent,
        MkAccordionItemContentDirective,
        MkButtonComponent,
        MkSizeDirective,
        RndAnimalComponent,
      ],
    }),
  ],
  argTypes: {
    multiple: { control: 'boolean' },
    mkSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    multiple: false,
    mkSize: 'md',
  },
};

export default meta;

type Story = StoryObj<Accordion>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-accordion ${argsToTemplate(args)}>
        <mk-accordion-item>
          <button mk-button> Meerkat </button>

          <div mkAccordionItemContent> Meerkat </div>
        </mk-accordion-item>

        <mk-accordion-item>
          <button mk-button> Octopus </button>

          <div mkAccordionItemContent> Octopus </div>
        </mk-accordion-item>

        <mk-accordion-item>
          <button mk-button> You are ??? </button>

          <div mkAccordionItemContent><lib-rnd /> </div>
        </mk-accordion-item>
      </mk-accordion>
    `,
  }),
};

export const Lazy: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-accordion ${argsToTemplate(args)}>
        <mk-accordion-item>
          <button mk-button> Meerkat </button>

          <ng-template mkAccordionItemContent> Meerkat </ng-template>
        </mk-accordion-item>

        <mk-accordion-item>
          <button mk-button> Octopus </button>

          <ng-template mkAccordionItemContent> Octopus </ng-template>
        </mk-accordion-item>

        <mk-accordion-item>
          <button mk-button> You are ??? </button>

          <ng-template mkAccordionItemContent>  <lib-rnd /> </ng-template>
        </mk-accordion-item>
      </mk-accordion>
    `,
  }),
};
