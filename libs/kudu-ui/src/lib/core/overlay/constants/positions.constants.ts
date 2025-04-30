import { KuduOverlayConfig, KuduOverlayPlacement } from '../interfaces';

type KuduOverlayPositionGetter = (
  originRect: DOMRect,
  elementRect: DOMRect,
  config: Required<KuduOverlayConfig>,
) => { left: number; top: number };

export const POSITION_GETTER: Record<
  KuduOverlayPlacement,
  KuduOverlayPositionGetter
> = {
  left: (originRect, elementRect, config) => ({
    left: originRect.left - elementRect.width - config.gap,
    top: originRect.top + originRect.height / 2 - elementRect.height / 2,
  }),
  'left-top': (originRect, elementRect, config) => ({
    left: originRect.left - elementRect.width - config.gap,
    top: originRect.top,
  }),
  'left-bottom': (originRect, elementRect, config) => ({
    left: originRect.left - elementRect.width - config.gap,
    top: originRect.bottom - elementRect.height,
  }),
  right: (originRect, elementRect, config) => ({
    left: originRect.right + config.gap,
    top: originRect.top + originRect.height / 2 - elementRect.height / 2,
  }),
  'right-top': (originRect, elementRect, config) => ({
    left: originRect.right + config.gap,
    top: originRect.top,
  }),
  'right-bottom': (originRect, elementRect, config) => ({
    left: originRect.right + config.gap,
    top: originRect.bottom - elementRect.height,
  }),
  top: (originRect, elementRect, config) => ({
    top: originRect.top - elementRect.height - config.gap,
    left: originRect.right - originRect.width / 2 - elementRect.width / 2,
  }),
  'top-left': (originRect, elementRect, config) => ({
    top: originRect.top - elementRect.height - config.gap,
    left: originRect.left,
  }),
  'top-right': (originRect, elementRect, config) => ({
    top: originRect.top - elementRect.height - config.gap,
    left: originRect.right - elementRect.width,
  }),
  bottom: (originRect, elementRect, config) => ({
    top: originRect.bottom + config.gap,
    left: originRect.right - originRect.width / 2 - elementRect.width / 2,
  }),
  'bottom-left': (originRect, elementRect, config) => ({
    top: originRect.bottom + config.gap,
    left: originRect.left,
  }),
  'bottom-right': (originRect, elementRect, config) => ({
    top: originRect.bottom + config.gap,
    left: originRect.right - elementRect.width,
  }),
};
