import { Injectable } from '@angular/core';
import { Link } from '../model/link.model';
import { Node } from '../model/node.model';
import { Graph } from '../model/graph.model';

@Injectable({
  providedIn: 'root'
})
export class GraphConverterService {

  public matrixToNodes(matrix: number[][]): Graph {
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

  public matrixToList(matrix: number[][]): number[][] {
    const list:number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
      list.push([]);
    }
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const element = matrix[i][j];
        if (element == 1) {
          list[i].push(j);
          list[j].push(i);
        }
      }
      list[i].sort();
    }
    return list;
  }

  public arrayToMatrix(array: number[], n: number): number[][] {
    const matrix: number[][] = [];
    for (let index = 0; index < n * n; index += n) {
      matrix.push(array.slice(index, index + n))
    }
    return matrix;
  }

  public arrayToNodes(array: number[], n: number): Graph {
    return this.matrixToNodes(this.arrayToMatrix(array, n));
  }

  public nodesToMatrix(graph: Graph): number[][] {
    let n = graph.nodes.length;
    let matrix: number[][] = []
    for (let i = 0; i < n; i++) {
      matrix.push([])
      for (let j = 0; j < n; j++) {
        matrix[i].push(graph.links.filter(l => l.source.id == i && l.target.id == j).length > 0 ? 1 : 0);
      }
    }
    return matrix;
  }

  public arrayToList(array:number[], n: number): number[][] {
    return this.matrixToList(this.arrayToMatrix(array, n));
  }

}
