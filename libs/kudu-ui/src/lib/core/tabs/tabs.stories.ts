import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { KuduInputComponent } from '../input';
import { KuduSize, KuduSizeDirective } from '../size';
import { KuduTabComponent } from './components/tab/tab.component';
import { KuduTabsComponent } from './components/tabs/tabs.component';
import { KuduTabContentDirective } from './directives/tab-content.directive';

@Component({
  selector: `lib-rnd`,
  template: `{{ rnd }}`,
})
class RndComponent {
  public rnd = Math.random();
}

type Tabs = KuduTabsComponent & { kuduSize: KuduSize };

const meta: Meta<Tabs> = {
  component: KuduTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        KuduTabComponent,
        KuduTabContentDirective,
        KuduInputComponent,
        KuduSizeDirective,
        RndComponent,
      ],
    }),
  ],
  argTypes: {
    currentIndex: { control: 'number' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    kuduSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    currentIndex: 0,
    orientation: 'horizontal',
    kuduSize: 'sm',
  },
};

export default meta;

type Story = StoryObj<Tabs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kudu-tabs 
        [currentIndex]="currentIndex" 
        [orientation]="orientation"
        [kuduSize]="kuduSize" 
      >
        <kudu-tab name="Preview"> Preview Content </kudu-tab>
        <kudu-tab name="HTML"> HTML Content </kudu-tab>
        <kudu-tab name="Random"> <lib-rnd /> </kudu-tab>
      </kudu-tabs>
    `,
  }),
};

export const Lazy: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kudu-tabs 
        [currentIndex]="currentIndex" 
        [orientation]="orientation"
        [kuduSize]="kuduSize" 
      >
        <kudu-tab name="Preview">
          <ng-template kuduTabContent> Preview Content </ng-template>
        </kudu-tab>

        <kudu-tab name="HTML">
          <ng-template kuduTabContent> HTML Content </ng-template>
        </kudu-tab>

        <kudu-tab name="Random">
          <ng-template kuduTabContent> <lib-rnd /> </ng-template>
        </kudu-tab>
      </kudu-tabs>
    `,
  }),
};
