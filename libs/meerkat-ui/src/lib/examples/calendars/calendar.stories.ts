import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { MkCalendarComponent, MkSize, MkSizeDirective } from '../../core';

type Calendar = MkCalendarComponent & {
  mkSize: MkSize;
};

const meta: Meta<Calendar> = {
  component: MkCalendarComponent,
  decorators: [
    moduleMetadata({
      imports: [MkSizeDirective],
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

type Story = StoryObj<Calendar>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-calendar ${argsToTemplate(args)} />
    `,
  }),
};
