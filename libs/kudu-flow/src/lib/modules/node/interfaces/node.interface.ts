export interface KuduFlowMovableNode {
  isMovable: true;
  x: number;
  y: number;
}

export interface KuduFlowResizableNode extends KuduFlowMovableNode {
  isResizable: true;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface KuduFlowRotatableNode {
  isRotatable: true;
  rotate: number;
}

export type KuduFlowNode = {
  id: string;
} & (KuduFlowMovableNode | { isMovable?: false }) &
  (KuduFlowResizableNode | { isResizable?: false }) &
  (KuduFlowRotatableNode | { isRotatable?: false });
