import { KuduOverlayConfig, KuduOverlayPlacement } from '../interfaces';

type KuduOverlayLayoutGetter = (
  origin: DOMRect,
  self: DOMRect,
  config: Required<KuduOverlayConfig>,
) => { left: number; top: number };

export const LAYOUT_GETTER: Record<
  KuduOverlayPlacement,
  KuduOverlayLayoutGetter
> = {
  left: (origin, self, config) => ({
    left: origin.left - self.width - config.gap,
    top: origin.top + origin.height / 2 - self.height / 2,
  }),
  'left-top': (origin, self, config) => ({
    left: origin.left - self.width - config.gap,
    top: origin.top,
  }),
  'left-bottom': (origin, self, config) => ({
    left: origin.left - self.width - config.gap,
    top: origin.bottom - self.height,
  }),
  right: (origin, self, config) => ({
    left: origin.right + config.gap,
    top: origin.top + origin.height / 2 - self.height / 2,
  }),
  'right-top': (origin, self, config) => ({
    left: origin.right + config.gap,
    top: origin.top,
  }),
  'right-bottom': (origin, self, config) => ({
    left: origin.right + config.gap,
    top: origin.bottom - self.height,
  }),
  top: (origin, self, config) => ({
    top: origin.top - self.height - config.gap,
    left: origin.right - origin.width / 2 - self.width / 2,
  }),
  'top-left': (origin, self, config) => ({
    top: origin.top - self.height - config.gap,
    left: origin.left,
  }),
  'top-right': (origin, self, config) => ({
    top: origin.top - self.height - config.gap,
    left: origin.right - self.width,
  }),
  bottom: (origin, self, config) => ({
    top: origin.bottom + config.gap,
    left: origin.right - origin.width / 2 - self.width / 2,
  }),
  'bottom-left': (origin, self, config) => ({
    top: origin.bottom + config.gap,
    left: origin.left,
  }),
  'bottom-right': (origin, self, config) => ({
    top: origin.bottom + config.gap,
    left: origin.right - self.width,
  }),
};
