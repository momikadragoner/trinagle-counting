export interface VisualNode {
  id: string;
  edges: string[];
  distance?: number;
  parent?: string;
  color?: string;
  group?: number;
  x?: string;
  y?: string;
  width?: string;
  height?: string;
  midX?: string;
  midY?: string;
  classList?: string;
  adjacent?: string[];
}
