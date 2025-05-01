import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import {
  MkAutocompleteComponent,
  MkButtonComponent,
  MkInputComponent,
  MkInputContainerComponent,
  MkOptionComponent,
  MkRippleDirective,
  MkSelectComponent,
} from '../core';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        MkInputContainerComponent,
        MkInputComponent,
        MkButtonComponent,
        MkRippleDirective,
        MkAutocompleteComponent,
        MkSelectComponent,
        MkOptionComponent,
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
        <button mk-button kind="outlined">Outlined Button</button>
        <button mk-button kind="filled">Filled Button</button>
        <button mk-button mkRipple>Ripple</button>
      </div>

      <mk-input-container>
        <input mk-input placeholder="Input" />
      </mk-input-container>

      <mk-autocomplete placeholder="Character">
        <mk-option value="luke-skywalker"> Luke Skywalker </mk-option>
        <mk-option value="han-solo"> Han Solo </mk-option>
        <mk-option value="yoda"> Yoda </mk-option>
      </mk-autocomplete>

      <mk-select placeholder="Character">
        <mk-option value="luke-skywalker"> Luke Skywalker </mk-option>
        <mk-option value="han-solo"> Han Solo </mk-option>
        <mk-option value="yoda"> Yoda </mk-option>
      </mk-select>
    `,
  }),
};
