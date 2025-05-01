import { MkColorRgb } from '../interfaces';

const pattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;

export const mkHexToRgb = (hex: string): MkColorRgb => {
  const result = pattern.exec(hex);

  if (!result) {
    throw new Error('Invalid HEX color format');
  }

  return {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16),
    a: result[4] ? Number.parseInt(result[4], 16) / 255 : 1,
  };
};
