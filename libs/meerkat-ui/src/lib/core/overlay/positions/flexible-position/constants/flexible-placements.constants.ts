import { MkOverlayFlexiblePlacement } from '../interfaces';

export const PLACEMENT_FALLBACK: Record<
  MkOverlayFlexiblePlacement,
  MkOverlayFlexiblePlacement[]
> = {
  left: ['right', 'left-bottom', 'left-top', 'right-bottom', 'right-top'],
  'left-bottom': ['left', 'left-top', 'right-bottom', 'right', 'right-top'],
  'left-top': ['left', 'left-bottom', 'right-top', 'right', 'right-bottom'],
  right: ['left', 'right-bottom', 'right-top', 'left-bottom', 'left-top'],
  'right-bottom': ['right', 'right-top', 'left-bottom', 'left', 'left-top'],
  'right-top': ['right', 'right-bottom', 'left-top', 'left', 'left-bottom'],
  bottom: ['top', 'bottom-left', 'bottom-right', 'top-left', 'top-right'],
  'bottom-left': ['bottom', 'bottom-right', 'top-left', 'top', 'top-right'],
  'bottom-right': ['bottom', 'bottom-left', 'top-right', 'top', 'top-left'],
  top: ['bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
  'top-left': ['top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'],
  'top-right': ['top', 'top-left', 'bottom-right', 'bottom', 'bottom-left'],
};
