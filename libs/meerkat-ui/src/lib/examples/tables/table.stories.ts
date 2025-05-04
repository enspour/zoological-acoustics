import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import {
  MkSize,
  MkSizeDirective,
  MkSortDirective,
  MkSortPipe,
  MkTableComponent,
  MkTableDataCellComponent,
  MkTableHeaderComponent,
  MkTableHeaderSortDirective,
} from '../../core';

type Table = MkTableComponent & {
  animals: { name: string }[];
  mkSize: MkSize;
};

const meta: Meta<Table> = {
  component: MkTableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MkTableDataCellComponent,
        MkTableHeaderComponent,
        MkTableHeaderSortDirective,
        MkSortDirective,
        MkSortPipe,
        MkSizeDirective,
      ],
    }),
  ],
  argTypes: {
    mkSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    animals: [
      { name: 'Meerkat' },
      { name: 'Octopus' },
      { name: 'Gorilla' },
      { name: 'Rabbit' },
      { name: 'Raccoon' },
      { name: 'Dolphin' },
    ],
    mkSize: 'md',
  },
};

export default meta;

type Story = StoryObj<Table>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <table mk-table mkSort #sortRef="mkSort" [style.width.%]="100">
        <thead>
          <tr>
            <th mk-th mkThSort="name">Название</th>
          </tr>
        </thead>
        <tbody>
          @let animals = this.animals | mkSort: sortRef.config();

          @for (animal of animals; track animal.name) {
            <tr>
              <td mk-td>{{ animal.name }}</td>
            </tr>
          }
        </tbody>
      </table>
    `,
  }),
};
