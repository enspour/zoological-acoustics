import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import {
  MkInputComponent,
  MkInputContainerComponent,
  MkSize,
  MkSizeDirective,
} from '../../core';

type Input = MkInputComponent & {
  placeholder: string;
  mkSize: MkSize;
};

const meta: Meta<Input> = {
  component: MkInputComponent,
  decorators: [
    moduleMetadata({
      imports: [MkInputContainerComponent, MkSizeDirective],
    }),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    mkSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    placeholder: 'Type you favorite animal...',
    mkSize: 'md',
  },
};

export default meta;

type Story = StoryObj<MkInputComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mk-input-container>
        <input mk-input ${argsToTemplate(args)}/>
      </mk-input-container>
    `,
  }),
};
