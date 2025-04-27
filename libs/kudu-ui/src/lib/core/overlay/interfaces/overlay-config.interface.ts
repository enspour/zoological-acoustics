import { KuduOverlayPlacement } from './overlay-placement.interface';

export interface KuduOverlayConfig {
  width?: 'origin-width' | 'self-width';
  placement?: KuduOverlayPlacement;
  lockX?: boolean;
  lockY?: boolean;
  gap?: number;
}
