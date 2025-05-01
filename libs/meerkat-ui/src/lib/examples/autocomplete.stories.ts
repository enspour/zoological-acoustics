import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { MkAutocompleteComponent, MkOptionComponent } from '../core';

type Autocomplete = MkAutocompleteComponent & { multiple: boolean };

const meta: Meta<Autocomplete> = {
  component: MkAutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [MkOptionComponent],
    }),
  ],
  argTypes: {
    multiple: { control: 'boolean' },
  },
  args: {
    multiple: false,
  },
};

export default meta;

type Story = StoryObj<Autocomplete>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-autocomplete placeholder="Character" ${argsToTemplate(args)}>
        <mk-option value="luke-skywalker"> Luke Skywalker </mk-option>
        <mk-option value="han-solo"> Han Solo </mk-option>
        <mk-option value="yoda"> Yoda </mk-option>
      </mk-autocomplete>
    `,
  }),
};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <mk-autocomplete placeholder="Character" ${argsToTemplate(args)}>
        <mk-option value="luke-skywalker"> Luke Skywalker </mk-option>
        <mk-option value="han-solo"> Han Solo </mk-option>
        <mk-option value="yoda"> Yoda </mk-option>
      </mk-autocomplete>
    `,
  }),
};
