type WheelDirection = 'forward' | 'back';

export const getWheelDirection = (event: WheelEvent): WheelDirection => {
  return event.deltaY < 0 ? 'forward' : 'back';
};
