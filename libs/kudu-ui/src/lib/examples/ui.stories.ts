import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import {
  KuduAutocompleteComponent,
  KuduButtonComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
  KuduOptionComponent,
  KuduRippleDirective,
  KuduSelectComponent,
} from '../core';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        KuduInputContainerComponent,
        KuduInputComponent,
        KuduButtonComponent,
        KuduRippleDirective,
        KuduAutocompleteComponent,
        KuduSelectComponent,
        KuduOptionComponent,
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <div>
        <button kudu-button kind="outlined">Outlined Button</button>
        <button kudu-button kind="filled">Filled Button</button>
        <button kudu-button kuduRipple>Ripple</button>
      </div>

      <kudu-input-container>
        <input kudu-input placeholder="Input" />
      </kudu-input-container>

      <kudu-autocomplete placeholder="Character">
        <kudu-option value="luke-skywalker"> Luke Skywalker </kudu-option>
        <kudu-option value="han-solo"> Han Solo </kudu-option>
        <kudu-option value="yoda"> Yoda </kudu-option>
      </kudu-autocomplete>

      <kudu-select placeholder="Character">
        <kudu-option value="luke-skywalker"> Luke Skywalker </kudu-option>
        <kudu-option value="han-solo"> Han Solo </kudu-option>
        <kudu-option value="yoda"> Yoda </kudu-option>
      </kudu-select>
    `,
  }),
};
