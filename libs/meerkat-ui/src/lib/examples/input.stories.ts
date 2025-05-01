import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { MkInputComponent, MkInputContainerComponent } from '../core';

const meta: Meta<MkInputComponent> = {
  component: MkInputComponent,
  decorators: [
    moduleMetadata({
      imports: [MkInputContainerComponent],
    }),
  ],
  argTypes: {
    kind: { control: 'select', options: ['outlined', 'filled'] },
  },
  args: {
    kind: 'outlined',
  },
};

export default meta;

type Story = StoryObj<MkInputComponent>;

export const Outlined: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-input-container>
        <input mk-input ${argsToTemplate(args)}/>
      </mk-input-container>
    `,
  }),
};
