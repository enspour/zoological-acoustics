import { KuduOverlayConfig, KuduOverlayPosition } from '../interfaces';

type KuduOverlayLayoutGetter = (
  origin: DOMRect,
  self: DOMRect,
  config: Required<KuduOverlayConfig>,
) => { left: number; top: number };

export const LAYOUT_GETTER: Record<
  KuduOverlayPosition,
  KuduOverlayLayoutGetter
> = {
  left: (origin, self, config) => ({
    left: origin.left - self.width - config.gap,
    top: origin.top + origin.height / 2 - self.height / 2,
  }),
  'left-above': (origin, self, config) => ({
    left: origin.left - self.width - config.gap,
    top: origin.top,
  }),
  'left-under': (origin, self, config) => ({
    left: origin.left - self.width - config.gap,
    top: origin.bottom - self.height,
  }),
  right: (origin, self, config) => ({
    left: origin.right + config.gap,
    top: origin.top + origin.height / 2 - self.height / 2,
  }),
  'right-above': (origin, self, config) => ({
    left: origin.right + config.gap,
    top: origin.top,
  }),
  'right-under': (origin, self, config) => ({
    left: origin.right + config.gap,
    top: origin.bottom - self.height,
  }),
  above: (origin, self, config) => ({
    top: origin.top - self.height - config.gap,
    left: origin.right - origin.width / 2 - self.width / 2,
  }),
  'above-left': (origin, self, config) => ({
    top: origin.top - self.height - config.gap,
    left: origin.left,
  }),
  'above-right': (origin, self, config) => ({
    top: origin.top - self.height - config.gap,
    left: origin.right - self.width,
  }),
  under: (origin, self, config) => ({
    top: origin.bottom + config.gap,
    left: origin.right - origin.width / 2 - self.width / 2,
  }),
  'under-left': (origin, self, config) => ({
    top: origin.bottom + config.gap,
    left: origin.left,
  }),
  'under-right': (origin, self, config) => ({
    top: origin.bottom + config.gap,
    left: origin.right - self.width,
  }),
};
