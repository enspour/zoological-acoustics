import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import {
  MkOptionComponent,
  MkSelectComponent,
  MkSize,
  MkSizeDirective,
} from '../../core';

type Select = MkSelectComponent & {
  value: string | string[];
  mkSize: MkSize;
};

const meta: Meta<Select> = {
  component: MkSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [MkOptionComponent, MkSizeDirective],
    }),
  ],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    mkSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    value: 'meerkat',
    placeholder: 'Select you favorite animal',
    mkSize: 'md',
  },
};

export default meta;

type Story = StoryObj<Select>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-select ${argsToTemplate(args)}>
        <mk-option value="meerkat"> Meerkat </mk-option>
        <mk-option value="krakenpus"> Octopus </mk-option>
        <mk-option value="gorilla"> Gorilla </mk-option>
        <mk-option value="rabbit"> Rabbit </mk-option>
        <mk-option value="raccoon"> Raccoon </mk-option>
        <mk-option value="dolphin"> Dolphin </mk-option>
      </mk-select>
    `,
  }),
};

export const Multiple: Story = {
  args: {
    value: ['meerkat'],
    placeholder: 'Animal',
  },
  render: (args) => ({
    props: args,
    template: `
      <mk-select ${argsToTemplate(args)}>
        <mk-option value="meerkat"> Meerkat </mk-option>
        <mk-option value="krakenpus"> Octopus </mk-option>
        <mk-option value="gorilla"> Gorilla </mk-option>
        <mk-option value="rabbit"> Rabbit </mk-option>
        <mk-option value="raccoon"> Raccoon </mk-option>
        <mk-option value="dolphin"> Dolphin </mk-option>
      </mk-select>
    `,
  }),
};
