import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import {
  MkAccordionComponent,
  MkAccordionItemComponent,
  MkAccordionItemContentDirective,
  MkButtonComponent,
} from '../core';

@Component({
  selector: `lib-rnd`,
  template: `{{ rnd }}`,
})
class RndComponent {
  public rnd = Math.random();
}

type Accordion = MkAccordionComponent;

const meta: Meta<Accordion> = {
  component: MkAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MkAccordionItemComponent,
        MkAccordionItemContentDirective,
        MkButtonComponent,
        RndComponent,
      ],
    }),
  ],
  argTypes: {
    multiple: { control: 'boolean' },
  },
  args: {
    multiple: false,
  },
};

export default meta;

type Story = StoryObj<Accordion>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-accordion [multiple]="multiple">
        <mk-accordion-item>
          <button mk-button> Preview </button>

          <div mkAccordionItemContent>
            <div>Preview Content</div>
          </div>
        </mk-accordion-item>

        <mk-accordion-item>
          <button mk-button> HTML </button>

          <div mkAccordionItemContent>
            <div>HTML Content</div>
          </div>
        </mk-accordion-item>

        <mk-accordion-item>
          <button mk-button> Random </button>

          <div mkAccordionItemContent>
            <lib-rnd />
          </div>
        </mk-accordion-item>
      </mk-accordion>
    `,
  }),
};

export const Lazy: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-accordion [multiple]="multiple">
        <mk-accordion-item>
          <button mk-button> Preview </button>

          <ng-template mkAccordionItemContent>
            <div>Preview Content</div>
          </ng-template>
        </mk-accordion-item>

        <mk-accordion-item>
          <button mk-button> HTML </button>

          <ng-template mkAccordionItemContent>
            <div>HTML Content</div>
          </ng-template>
        </mk-accordion-item>

        <mk-accordion-item>
          <button mk-button> Random </button>

          <ng-template mkAccordionItemContent>
            <lib-rnd />
          </ng-template>
        </mk-accordion-item>
      </mk-accordion>
    `,
  }),
};
