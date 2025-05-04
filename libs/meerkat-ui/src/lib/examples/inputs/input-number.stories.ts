import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import {
  MkInputContainerComponent,
  MkInputNumberComponent,
  MkSize,
  MkSizeDirective,
} from '../../core';

type Input = MkInputNumberComponent & {
  mkSize: MkSize;
};

const meta: Meta<Input> = {
  component: MkInputNumberComponent,
  decorators: [
    moduleMetadata({
      imports: [MkInputContainerComponent, MkSizeDirective],
    }),
  ],
  argTypes: {
    mkSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    value: 0,
    mkSize: 'md',
  },
};

export default meta;

type Story = StoryObj<MkInputNumberComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-input-container>
        <input mk-input-number [(value)]="value" [mkSize]="mkSize"/>
      </mk-input-container>
    `,
  }),
};
