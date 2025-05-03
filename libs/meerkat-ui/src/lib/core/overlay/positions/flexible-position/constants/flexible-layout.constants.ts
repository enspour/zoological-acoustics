import {
  MkOverlayFlexibleConfig,
  MkOverlayFlexiblePlacement,
} from '../interfaces';

type MkOverlayFlexibleLayoutCalculator = (
  originRect: DOMRect,
  elementRect: DOMRect,
  config: Required<MkOverlayFlexibleConfig>,
) => DOMRect;

export const LAYOUT_CALCULATOR: Record<
  MkOverlayFlexiblePlacement,
  MkOverlayFlexibleLayoutCalculator
> = {
  left: (originRect, elementRect, config) =>
    new DOMRect(
      originRect.left - elementRect.width - config.gap,
      originRect.top + originRect.height / 2 - elementRect.height / 2,
      elementRect.width,
      elementRect.height,
    ),
  'left-top': (originRect, elementRect, config) =>
    new DOMRect(
      originRect.left - elementRect.width - config.gap,
      originRect.top,
      elementRect.width,
      elementRect.height,
    ),
  'left-bottom': (originRect, elementRect, config) =>
    new DOMRect(
      originRect.left - elementRect.width - config.gap,
      originRect.bottom - elementRect.height,
      elementRect.width,
      elementRect.height,
    ),
  right: (originRect, elementRect, config) =>
    new DOMRect(
      originRect.right + config.gap,
      originRect.top + originRect.height / 2 - elementRect.height / 2,
      elementRect.width,
      elementRect.height,
    ),
  'right-top': (originRect, elementRect, config) =>
    new DOMRect(
      originRect.right + config.gap,
      originRect.top,
      elementRect.width,
      elementRect.height,
    ),
  'right-bottom': (originRect, elementRect, config) =>
    new DOMRect(
      originRect.right + config.gap,
      originRect.bottom - elementRect.height,
      elementRect.width,
      elementRect.height,
    ),
  top: (originRect, elementRect, config) =>
    new DOMRect(
      originRect.right - originRect.width / 2 - elementRect.width / 2,
      originRect.top - elementRect.height - config.gap,
      elementRect.width,
      elementRect.height,
    ),
  'top-left': (originRect, elementRect, config) =>
    new DOMRect(
      originRect.left,
      originRect.top - elementRect.height - config.gap,
      elementRect.width,
      elementRect.height,
    ),
  'top-right': (originRect, elementRect, config) =>
    new DOMRect(
      originRect.right - elementRect.width,
      originRect.top - elementRect.height - config.gap,
      elementRect.width,
      elementRect.height,
    ),
  bottom: (originRect, elementRect, config) =>
    new DOMRect(
      originRect.right - originRect.width / 2 - elementRect.width / 2,
      originRect.bottom + config.gap,
      elementRect.width,
      elementRect.height,
    ),
  'bottom-left': (originRect, elementRect, config) =>
    new DOMRect(
      originRect.left,
      originRect.bottom + config.gap,
      elementRect.width,
      elementRect.height,
    ),
  'bottom-right': (originRect, elementRect, config) =>
    new DOMRect(
      originRect.right - elementRect.width,
      originRect.bottom + config.gap,
      elementRect.width,
      elementRect.height,
    ),
};
