import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import {
  MkButtonComponent,
  MkSize,
  MkSizeDirective,
  MkTooltipDirective,
} from '../../core';

type Tooltip = MkTooltipDirective & {
  mkSize: MkSize;
};

const meta: Meta<Tooltip> = {
  component: MkTooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [MkButtonComponent, MkSizeDirective],
    }),
  ],
  argTypes: {
    mkSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    mkSize: 'md',
  },
};

export default meta;

type Story = StoryObj<Tooltip>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <button mk-button kind="bordered" mkTooltip="Meerkat!"> 
        Hover Me 
      </button>
    `,
  }),
};
