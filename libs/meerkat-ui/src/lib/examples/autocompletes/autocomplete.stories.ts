import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import {
  MkAutocompleteComponent,
  MkOptionComponent,
  MkSize,
  MkSizeDirective,
} from '../../core';

type Autocomplete = MkAutocompleteComponent & {
  value: string | string[];
  mkSize: MkSize;
};

const meta: Meta<Autocomplete> = {
  component: MkAutocompleteComponent,
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

type Story = StoryObj<Autocomplete>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-autocomplete ${argsToTemplate(args)}>
        <mk-option value="meerkat"> Meerkat </mk-option>
        <mk-option value="octopus"> Octopus </mk-option>
        <mk-option value="gorilla"> Gorilla </mk-option>
        <mk-option value="rabbit"> Rabbit </mk-option>
        <mk-option value="raccoon"> Raccoon </mk-option>
        <mk-option value="dolphin"> Dolphin </mk-option>
      </mk-autocomplete>
    `,
  }),
};

export const Multiple: Story = {
  args: {
    value: ['meerkat'],
  },
  render: (args) => ({
    props: args,
    template: `
      <mk-autocomplete ${argsToTemplate(args)}>
        <mk-option value="meerkat"> Meerkat </mk-option>
        <mk-option value="octopus"> Octopus </mk-option>
        <mk-option value="gorilla"> Gorilla </mk-option>
        <mk-option value="rabbit"> Rabbit </mk-option>
        <mk-option value="raccoon"> Raccoon </mk-option>
        <mk-option value="dolphin"> Dolphin </mk-option>
      </mk-autocomplete>
    `,
  }),
};
