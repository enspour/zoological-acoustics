import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { KuduCalendarComponent, KuduSize, KuduSizeDirective } from '../core';

type Calendar = KuduCalendarComponent & {
  multiple: boolean;
  kuduSize: KuduSize;
};

const meta: Meta<Calendar> = {
  component: KuduCalendarComponent,
  decorators: [
    moduleMetadata({
      imports: [KuduSizeDirective],
    }),
  ],
  args: {
    kuduSize: 'sm',
  },
  argTypes: {
    kuduSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<Calendar>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kudu-calendar ${argsToTemplate(args)} />
    `,
  }),
};
