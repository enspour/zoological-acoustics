import { MkColorHsv } from '../interfaces';

import { mkHexToRgb } from './hex-to-rgb.util';
import { mkRgbToHsv } from './rgb-to-hsv.util';

export const mkHexToHsv = (hex: string): MkColorHsv => {
  const rgb = mkHexToRgb(hex);
  return mkRgbToHsv(rgb);
};
