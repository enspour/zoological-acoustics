import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { MkSize, MkSizeDirective, MkSwitchComponent } from '../../core';

type Switch = MkSwitchComponent & {
  mkSize: MkSize;
};

const meta: Meta<Switch> = {
  component: MkSwitchComponent,
  argTypes: {
    mkSize: { name: 'Size', control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    mkSize: 'md',
  },
  decorators: [
    moduleMetadata({
      imports: [MkSizeDirective],
    }),
  ],
};

export default meta;
type Story = StoryObj<Switch>;

export const Outlined: Story = {
  render: (args) => ({
    props: args,
    template: `
      <input mk-switch ${argsToTemplate(args)} />
    `,
  }),
};
