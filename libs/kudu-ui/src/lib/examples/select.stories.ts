import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { KuduOptionComponent, KuduSelectComponent } from '../core';

type Select = KuduSelectComponent & { multiple: boolean };

const meta: Meta<Select> = {
  component: KuduSelectComponent,
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

type Story = StoryObj<Select>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kudu-select placeholder="Character" ${argsToTemplate(args)}>
        <kudu-option value="luke-skywalker"> Luke Skywalker </kudu-option>
        <kudu-option value="han-solo"> Han Solo </kudu-option>
        <kudu-option value="yoda"> Yoda </kudu-option>
      </kudu-select>
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
      <kudu-select placeholder="Character" ${argsToTemplate(args)}>
        <kudu-option value="luke-skywalker"> Luke Skywalker </kudu-option>
        <kudu-option value="han-solo"> Han Solo </kudu-option>
        <kudu-option value="yoda"> Yoda </kudu-option>
      </kudu-select>
    `,
  }),
};
