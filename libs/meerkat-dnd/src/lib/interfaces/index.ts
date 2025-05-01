export interface Point {
  x: number;
  y: number;
}

export interface MkDndDrag {
  event: DragEvent;
}

export interface MkDndDrop<
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
