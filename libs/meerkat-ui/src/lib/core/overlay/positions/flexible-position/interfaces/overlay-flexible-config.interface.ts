import { MkOverlayFlexiblePlacement } from './overlay-flexible-placement.interface';

export interface MkOverlayFlexibleConfig {
  width?: 'origin-width' | 'self-width';
  placement?: MkOverlayFlexiblePlacement;
  lockX?: boolean;
  lockY?: boolean;
  gap?: number;
}
