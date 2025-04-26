import { KuduColorHsv } from '../interfaces';

import { kuduHexToRgb } from './hex-to-rgb.util';
import { kuduRgbToHsv } from './rgb-to-hsv.util';

export const kuduHexToHsv = (hex: string): KuduColorHsv => {
  const rgb = kuduHexToRgb(hex);
  return kuduRgbToHsv(rgb);
};
