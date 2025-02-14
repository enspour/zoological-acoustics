import { Meta, StoryObj } from '@storybook/angular';

import { KuduVirtualScrollComponent } from '../core';

type VirtualScroll = KuduVirtualScrollComponent<number> & {
  height: number;
};

const meta: Meta<VirtualScroll> = {
  component: KuduVirtualScrollComponent,
  argTypes: {
    height: { control: 'number' },
    elements: { control: { disable: true } },
    elementHeight: { control: 'number' },
  },
  args: {
    height: 500,
    elements: [...Array(10000)].map((_, i) => i),
    elementHeight: 30,
  },
};

export default meta;

type Story = StoryObj<VirtualScroll>;

export const Example: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kudu-virtual-scroll
        #virtualization="kuduVirtualization"
        [elements]="elements"
        [elementHeight]="elementHeight"
        [style.height.px]="height"
      >
        @for (element of virtualization.elementsToRender(); track element) {
          <div [style.height.px]="elementHeight">
            {{ element }}
          </div>
        }
      </kudu-virtual-scroll>
    `,
  }),
};
