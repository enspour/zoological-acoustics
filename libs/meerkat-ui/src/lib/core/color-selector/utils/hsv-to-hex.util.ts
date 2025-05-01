import { MkColorHsv } from '../interfaces';

import { mkHsvToRgb } from './hsv-to-rgb.util';
import { mkRgbToHex } from './rgb-to-hex.util';

export const mkHsvToHex = (hsv: MkColorHsv) => {
  const rgb = mkHsvToRgb(hsv);
  return mkRgbToHex(rgb);
};
