import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { MkOptionComponent, MkSelectComponent } from '../core';

type Select = MkSelectComponent<unknown> & { multiple: boolean };

const meta: Meta<Select> = {
  component: MkSelectComponent,
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

type Story = StoryObj<Select>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-select placeholder="Character" ${argsToTemplate(args)}>
        <mk-option value="luke-skywalker"> Luke Skywalker </mk-option>
        <mk-option value="han-solo"> Han Solo </mk-option>
        <mk-option value="yoda"> Yoda </mk-option>
      </mk-select>
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
      <mk-select placeholder="Character" ${argsToTemplate(args)}>
        <mk-option value="luke-skywalker"> Luke Skywalker </mk-option>
        <mk-option value="han-solo"> Han Solo </mk-option>
        <mk-option value="yoda"> Yoda </mk-option>
      </mk-select>
    `,
  }),
};
