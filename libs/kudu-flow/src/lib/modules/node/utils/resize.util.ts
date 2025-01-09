import { Point, ResizeDirection } from '../../../interfaces';
import { KuduFlowResizableNode } from '../interfaces';

const resizeNodeByNorth = <T extends KuduFlowResizableNode>(
  node: T,
  mousePosition: Point,
) => {
  const height = node.y + node.height - mousePosition.y;

  if (
    height < 0 ||
    (node.minHeight && node.minHeight > height) ||
    (node.maxHeight && node.maxHeight < height)
  ) {
    return null;
  }

  node.y = mousePosition.y;
  node.height = height;

  return node;
};

const resizeNodeByWest = <T extends KuduFlowResizableNode>(
  node: T,
  mousePosition: Point,
) => {
  const width = node.x + node.width - mousePosition.x;

  if (
    width < 0 ||
    (node.minWidth && node.minWidth > width) ||
    (node.maxWidth && node.maxWidth < width)
  ) {
    return null;
  }

  node.width = width;
  node.x = mousePosition.x;

  return node;
};

const resizeNodeBySouth = <T extends KuduFlowResizableNode>(
  node: T,
  mousePosition: Point,
) => {
  const height = mousePosition.y - node.y;

  if (
    height < 0 ||
    (node.minHeight && node.minHeight > height) ||
    (node.maxHeight && node.maxHeight < height)
  ) {
    return null;
  }

  node.height = height;

  return node;
};

const resizeNodeByEast = <T extends KuduFlowResizableNode>(
  node: T,
  mousePosition: Point,
) => {
  const width = mousePosition.x - node.x;

  if (
    width < 0 ||
    (node.minWidth && node.minWidth > width) ||
    (node.maxWidth && node.maxWidth < width)
  ) {
    return null;
  }

  node.width = width;

  return node;
};

/**
 * This method mutate the node.
 */
export const tryResizeNode = <T extends KuduFlowResizableNode>(
  node: T,
  direction: ResizeDirection,
  mousePosition: Point,
): T | null => {
  switch (direction) {
    case 'n':
      return resizeNodeByNorth(node, mousePosition);
    case 'e':
      return resizeNodeByEast(node, mousePosition);
    case 's':
      return resizeNodeBySouth(node, mousePosition);
    case 'w':
      return resizeNodeByWest(node, mousePosition);
    case 'nw': {
      const n = resizeNodeByNorth(node, mousePosition);
      const w = resizeNodeByWest(node, mousePosition);
      return n || w;
    }
    case 'ne': {
      const n = resizeNodeByNorth(node, mousePosition);
      const e = resizeNodeByEast(node, mousePosition);
      return n || e;
    }
    case 'es': {
      const e = resizeNodeByEast(node, mousePosition);
      const s = resizeNodeBySouth(node, mousePosition);
      return e || s;
    }

    case 'sw': {
      const s = resizeNodeByWest(node, mousePosition);
      const w = resizeNodeByWest(node, mousePosition);
      return s || w;
    }
  }
};
