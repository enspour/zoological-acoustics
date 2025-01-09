import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { KuduOptionComponent } from '../options';
import { KuduAutocompleteComponent } from './autocomplete.component';

type Autocomplete = KuduAutocompleteComponent & { multiple: boolean };

const meta: Meta<Autocomplete> = {
  component: KuduAutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [KuduOptionComponent],
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
      <kudu-autocomplete placeholder="Character" ${argsToTemplate(args)}>
        <kudu-option value="luke-skywalker"> Luke Skywalker </kudu-option>
        <kudu-option value="han-solo"> Han Solo </kudu-option>
        <kudu-option value="yoda"> Yoda </kudu-option>
      </kudu-autocomplete>
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
      <kudu-autocomplete placeholder="Character" ${argsToTemplate(args)}>
        <kudu-option value="luke-skywalker"> Luke Skywalker </kudu-option>
        <kudu-option value="han-solo"> Han Solo </kudu-option>
        <kudu-option value="yoda"> Yoda </kudu-option>
      </kudu-autocomplete>
    `,
  }),
};
