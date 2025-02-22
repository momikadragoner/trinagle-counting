import { Injectable } from '@angular/core';
import { Link } from '../model/link.model';
import { Node } from '../model/node.model';
import { Graph } from '../model/graph.model';


@Injectable({
  providedIn: 'root'
})
export class GraphConverterService {

  constructor() { }

  public MatrixToNodes(matrix: number[][]): Graph {
    const nodes: Node[] = [];
    const links: Link[] = [];
    for (let i = 0; i < matrix.length; i++) {
      nodes.push({ id: i });
    }
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
      for (let j = 0; j < row.length; j++) {
        const value = row[j];
        if (value == 1) links.push({ source: nodes[i], target: nodes[j] });
      }
    }
    return { nodes: nodes, links: links };
  }

  public ArrayToMatrix(array: number[], n: number): number[][] {
    const matrix: number[][] = [];
    for (let index = 0; index < n * n; index += n) {
      matrix.push(array.slice(index, index + n))
    }
    return matrix;
  }
}
