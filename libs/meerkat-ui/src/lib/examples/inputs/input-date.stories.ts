import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { MkDate } from '@meerkat-date';
import {
  MkInputContainerComponent,
  MkInputDateComponent,
  MkSize,
  MkSizeDirective,
} from '../../core';

type Input = MkInputDateComponent & {
  mkSize: MkSize;
};

const meta: Meta<Input> = {
  component: MkInputDateComponent,
  decorators: [
    moduleMetadata({
      imports: [MkInputContainerComponent, MkSizeDirective],
    }),
  ],
  argTypes: {
    mkSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    value: MkDate.now(),
    mkSize: 'md',
  },
};

export default meta;

type Story = StoryObj<MkInputDateComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-input-container>
        <input mk-input-date [(value)]="value" [mkSize]="mkSize"/>
      </mk-input-container>
    `,
  }),
};
