import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';

import { KuduInputComponent, KuduInputContainerComponent } from '../core';

const meta: Meta<KuduInputComponent> = {
  component: KuduInputComponent,
  decorators: [
    moduleMetadata({
      imports: [KuduInputContainerComponent],
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

type Story = StoryObj<KuduInputComponent>;

export const Outlined: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kudu-input-container>
        <input kudu-input ${argsToTemplate(args)}/>
      </kudu-input-container>
    `,
  }),
};
