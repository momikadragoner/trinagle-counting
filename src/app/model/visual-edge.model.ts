import { VisualNode } from "./visual-node.model";

export interface VisualEdge {
    start: VisualNode;
    end: VisualNode;
    path?: string;
    strokeColor?: string;
    strokeWidth?: string;
}
