import { KuduOverlayPosition } from './overlay-position.interface';

export interface KuduOverlayConfig {
  width?: 'origin-width' | 'self-width';
  position?: KuduOverlayPosition;
  lockX?: boolean;
  lockY?: boolean;
  gap?: number;
}
