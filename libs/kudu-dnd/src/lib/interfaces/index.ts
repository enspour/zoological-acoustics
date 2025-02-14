export interface Point {
  x: number;
  y: number;
}

export interface KuduDrag {
  event: DragEvent;
}

export interface KuduDrop<
  Draggable = any,
  PrevContainer = any,
  NextContainer = any,
> {
  event: DragEvent;
  draggable: Draggable;
  prevIndex: number;
  prevContainer: PrevContainer;
  nextIndex: number;
  nextContainer: NextContainer;
}
