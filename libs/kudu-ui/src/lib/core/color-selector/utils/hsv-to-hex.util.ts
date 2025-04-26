import { KuduColorHsv } from '../interfaces';

import { kuduHsvToRgb } from './hsv-to-rgb.util';
import { kuduRgbToHex } from './rgb-to-hex.util';

export const kuduHsvToHex = (hsv: KuduColorHsv) => {
  const rgb = kuduHsvToRgb(hsv);
  return kuduRgbToHex(rgb);
};
