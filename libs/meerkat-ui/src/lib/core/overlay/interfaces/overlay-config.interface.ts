import { MkOverlayPlacement } from './overlay-placement.interface';

export interface MkOverlayConfig {
  width?: 'origin-width' | 'self-width';
  placement?: MkOverlayPlacement;
  lockX?: boolean;
  lockY?: boolean;
  gap?: number;
}
