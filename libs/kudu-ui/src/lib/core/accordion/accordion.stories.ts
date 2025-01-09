import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { KuduButtonComponent } from '../button';
import { KuduAccordionItemComponent } from './components/accordion-item/accordion-item.component';
import { KuduAccordionComponent } from './components/accordion/accordion.component';
import { KuduAccordionItemContentDirective } from './directives/accordion-item-content.directive';

@Component({
  selector: `lib-rnd`,
  template: `{{ rnd }}`,
})
class RndComponent {
  public rnd = Math.random();
}

type Accordion = KuduAccordionComponent;

const meta: Meta<Accordion> = {
  component: KuduAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        KuduAccordionItemComponent,
        KuduAccordionItemContentDirective,
        KuduButtonComponent,
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
      <kudu-accordion [multiple]="multiple">
        <kudu-accordion-item>
          <button kudu-button> Preview </button>

          <div kuduAccordionItemContent>
            <div>Preview Content</div>
          </div>
        </kudu-accordion-item>

        <kudu-accordion-item>
          <button kudu-button> HTML </button>

          <div kuduAccordionItemContent>
            <div>HTML Content</div>
          </div>
        </kudu-accordion-item>

        <kudu-accordion-item>
          <button kudu-button> Random </button>

          <div kuduAccordionItemContent>
            <lib-rnd />
          </div>
        </kudu-accordion-item>
      </kudu-accordion>
    `,
  }),
};

export const Lazy: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kudu-accordion [multiple]="multiple">
        <kudu-accordion-item>
          <button kudu-button> Preview </button>

          <ng-template kuduAccordionItemContent>
            <div>Preview Content</div>
          </ng-template>
        </kudu-accordion-item>

        <kudu-accordion-item>
          <button kudu-button> HTML </button>

          <ng-template kuduAccordionItemContent>
            <div>HTML Content</div>
          </ng-template>
        </kudu-accordion-item>

        <kudu-accordion-item>
          <button kudu-button> Random </button>

          <ng-template kuduAccordionItemContent>
            <lib-rnd />
          </ng-template>
        </kudu-accordion-item>
      </kudu-accordion>
    `,
  }),
};
