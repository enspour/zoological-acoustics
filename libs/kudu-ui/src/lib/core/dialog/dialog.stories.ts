import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { KuduButtonComponent } from '../button';
import { KuduSize, KuduSizeDirective } from '../size';
import { KuduDialogContainerComponent } from './components/dialog-container/dialog-container.component';

type DialogContainer = KuduDialogContainerComponent & {
  kuduSize: KuduSize;
};

const meta: Meta<DialogContainer> = {
  component: KuduDialogContainerComponent,
  decorators: [
    moduleMetadata({
      imports: [KuduButtonComponent, KuduSizeDirective],
    }),
  ],
  argTypes: {
    kuduSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    kuduSize: 'sm',
  },
};

export default meta;

type Story = StoryObj<DialogContainer>;

// TODO: Not opening dialog at clicking
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kudu-dialog-container [kuduSize]="kuduSize">
        <button kudu-button> Open Dialog </button>
      </kudu-dialog-container>
    `,
  }),
};
