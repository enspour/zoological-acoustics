import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import {
  KuduButtonComponent,
  KuduRippleDirective,
  KuduSize,
  KuduSizeDirective,
} from '../core';

type Button = KuduButtonComponent & { kuduSize: KuduSize; kuduRipple: boolean };

const meta: Meta<Button> = {
  component: KuduButtonComponent,
  argTypes: {
    kind: { name: 'Kind', control: 'select', options: ['outlined', 'filled'] },
    kuduSize: { name: 'Size', control: 'select', options: ['sm', 'md', 'lg'] },
    kuduRipple: { name: 'Ripple', control: 'boolean' },
  },
  args: {
    kind: 'outlined',
    kuduSize: 'sm',
    kuduRipple: false,
  },
  decorators: [
    moduleMetadata({
      imports: [KuduSizeDirective, KuduRippleDirective],
    }),
  ],
};

export default meta;
type Story = StoryObj<Button>;

export const Outlined: Story = {
  render: ({ kuduRipple, ...args }) => ({
    props: args,
    template: `
      <button kudu-button ${argsToTemplate(args)} ${kuduRipple ? 'kuduRipple' : ''}>
        Click Me
      </button>
    `,
  }),
};

export const Filled: Story = {
  args: {
    kind: 'filled',
  },
  render: ({ kuduRipple, ...args }) => ({
    props: args,
    template: `
      <button kudu-button ${argsToTemplate(args)} ${kuduRipple ? 'kuduRipple' : ''}>
        Click Me
      </button>
    `,
  }),
};
