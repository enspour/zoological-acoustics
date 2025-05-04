import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { MkCheckboxComponent, MkSize, MkSizeDirective } from '../../core';

type Checkbox = MkCheckboxComponent & {
  mkSize: MkSize;
};

const meta: Meta<Checkbox> = {
  component: MkCheckboxComponent,
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
type Story = StoryObj<Checkbox>;

export const Outlined: Story = {
  render: (args) => ({
    props: args,
    template: `
      <input mk-checkbox ${argsToTemplate(args)} />
    `,
  }),
};
