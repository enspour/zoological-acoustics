import { MkColorRgb } from '../interfaces';

export const mkRgbToHsv = (rgb: MkColorRgb) => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const a = rgb.a;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = (g - b) / delta + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
    a,
  };
};
