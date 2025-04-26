import { KuduColorRgb } from '../interfaces';

const toHex = (n: number) =>
  Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');

export const kuduRgbToHex = ({ r, g, b, a }: KuduColorRgb) => {
  if (a === 1) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(Math.floor(a * 255))}`;
};
