import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import {
  MkInputColorComponent,
  MkInputContainerComponent,
  MkSize,
  MkSizeDirective,
} from '../../core';

type Input = MkInputColorComponent & {
  mkSize: MkSize;
};

const meta: Meta<Input> = {
  component: MkInputColorComponent,
  decorators: [
    moduleMetadata({
      imports: [MkInputContainerComponent, MkSizeDirective],
    }),
  ],
  argTypes: {
    mkSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    value: '#ffffff',
    mkSize: 'md',
  },
};

export default meta;

type Story = StoryObj<MkInputColorComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-input-container>
        <input mk-input-color [(value)]="value" [mkSize]="mkSize"/>
      </mk-input-container>
    `,
  }),
};
