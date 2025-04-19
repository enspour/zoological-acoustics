export interface Point {
  x: number;
  y: number;
}

export interface KuduDndDrag {
  event: DragEvent;
}

export interface KuduDndDrop<
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
