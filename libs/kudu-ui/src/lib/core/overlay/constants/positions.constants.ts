import { KuduOverlayPosition } from '../interfaces';

export const FALLBACK_POSITIONS: Record<
  KuduOverlayPosition,
  KuduOverlayPosition[]
> = {
  left: ['right', 'left-under', 'left-above', 'right-under', 'right-above'],
  'left-under': ['left', 'left-above', 'right-under', 'right', 'right-above'],
  'left-above': ['left', 'left-under', 'right-above', 'right', 'right-under'],
  right: ['left', 'right-under', 'right-above', 'left-under', 'left-above'],
  'right-under': ['right', 'right-above', 'left-under', 'left', 'left-above'],
  'right-above': ['right', 'right-under', 'left-above', 'left', 'left-under'],
  under: ['above', 'under-left', 'under-right', 'above-left', 'above-right'],
  'under-left': ['under', 'under-right', 'above-left', 'above', 'above-right'],
  'under-right': ['under', 'under-left', 'above-right', 'above', 'above-left'],
  above: ['under', 'above-left', 'above-right', 'under-left', 'under-right'],
  'above-left': ['above', 'above-right', 'under-left', 'under', 'under-right'],
  'above-right': ['above', 'above-left', 'under-right', 'under', 'under-left'],
};
