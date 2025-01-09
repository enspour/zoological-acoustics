import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';

import { KuduInputComponent } from './input.component';

const meta: Meta<KuduInputComponent> = {
  component: KuduInputComponent,
  argTypes: {
    kind: { control: 'select', options: ['outlined', 'filled'] },
  },
  args: {
    kind: 'outlined',
  },
};

export default meta;

type Story = StoryObj<KuduInputComponent>;

export const Outlined: Story = {
  render: (args) => ({
    props: args,
    template: `
      <input kudu-input ${argsToTemplate(args)}/>
    `,
  }),
};
