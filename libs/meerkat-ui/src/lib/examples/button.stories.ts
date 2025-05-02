import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import {
  MkButtonComponent,
  MkRippleDirective,
  MkSize,
  MkSizeDirective,
} from '../core';

type Button = MkButtonComponent & {
  mkSize: MkSize;
  mkRipple: boolean;
};

const meta: Meta<Button> = {
  component: MkButtonComponent,
  argTypes: {
    kind: {
      name: 'Kind',
      control: 'select',
      options: ['outlined', 'bordered', 'filled'],
    },
    mkSize: { name: 'Size', control: 'select', options: ['sm', 'md', 'lg'] },
    mkRipple: { name: 'Ripple', control: 'boolean' },
  },
  args: {
    kind: 'outlined',
    mkSize: 'md',
    mkRipple: false,
  },
  decorators: [
    moduleMetadata({
      imports: [MkSizeDirective, MkRippleDirective],
    }),
  ],
};

export default meta;
type Story = StoryObj<Button>;

export const Outlined: Story = {
  render: ({ mkRipple, ...args }) => ({
    props: args,
    template: `
      <button mk-button ${argsToTemplate(args)} ${mkRipple ? 'mkRipple' : ''}>
        Click Me
      </button>
    `,
  }),
};

export const Filled: Story = {
  args: {
    kind: 'filled',
  },
  render: ({ mkRipple, ...args }) => ({
    props: args,
    template: `
      <button mk-button ${argsToTemplate(args)} ${mkRipple ? 'mkRipple' : ''}>
        Click Me
      </button>
    `,
  }),
};
