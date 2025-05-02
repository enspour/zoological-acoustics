import { Meta, StoryObj } from '@storybook/angular';

import { MkVirtualScrollComponent } from '../core';

type VirtualScroll = MkVirtualScrollComponent<string> & {
  height: number;
};

const meta: Meta<VirtualScroll> = {
  component: MkVirtualScrollComponent,
  argTypes: {
    height: { control: 'number' },
    elements: { control: { disable: true } },
    elementHeight: { control: 'number' },
  },
  args: {
    height: 500,
    elements: [...Array(10000)].map((_, i) => `Element #${i}`),
    elementHeight: 30,
  },
};

export default meta;

type Story = StoryObj<VirtualScroll>;

export const Example: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-virtual-scroll
        #virtualization="mkVirtualization"
        [elements]="elements"
        [elementHeight]="elementHeight"
        [style.height.px]="height"
      >
        @for (element of virtualization.elementsToRender(); track element) {
          <div [style.height.px]="elementHeight">
            {{ element }}
          </div>
        }
      </mk-virtual-scroll>
    `,
  }),
};
