import { Injectable } from '@angular/core';
import { Graph } from '../model/graph.model';
import { Node } from '../model/node.model';
import { Link } from '../model/link.model';
import { Snapshot } from '../model/snapshot.model';
import { pairs } from 'd3';
import { identity } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  private sequence: Snapshot[] = [];

  private clearSequence(): void {
    this.sequence = [];
  }

  public getSnapshotSequence(): Snapshot[] {
    return this.sequence;
  }

  private logLine(line: number, nodes: Node[], links: Link[], variables: any) {
    this.sequence.push({ lineIndex: line, usedNodes: nodes, usedLinks: links, variables: variables });
  }

  public NodeIteratorTrinagleCount(graph: Graph): number {
    this.clearSequence();
    let count = 0; // Line 1
    this.logLine(0, [], [], { count })
    graph.nodes.forEach(v => { // Line 2
      this.logLine(1, [v], [], { count, v })
      this.adjacentPairs(v, graph).forEach(pair => { // Line 3
        let u = pair[0];
        let w = pair[1];
        this.logLine(2, [v, u, w], [], { count, v, u, w })
        this.logLine(3, [v, u, w], [{ source: u, target: w }], { count, v, u, w })
        if (this.containsLink(pair, graph.links)) { // Line 4
          count = count + 1; // Line 5
          this.logLine(4, [v, u, w], [{ source: u, target: w }], { count, v, u, w })
        } // Line 6
        this.logLine(5, [v], [], { count, v, u, w })
      }); // Line 7
      this.logLine(6, [], [], { count })
    }); // Line 8
    this.logLine(7, [], [], { count })
    let result: number = count / 3; // Line 9
    this.logLine(8, [], [], { count, result })
    return result;
  }

  public EdgeIteratorTrinagleCount(list: number[][]): number {
    this.clearSequence()
    let count = 0;
    this.logLine(0, [], [], { count });
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; j++) {
        const source = i;
        const target = list[i][j];
        if (source > target) continue;
        let u = { id: source };
        let v = { id: target };
        this.logLine(1, [u, v], [], { count, u, v });
        let adj1 = this.adjacent(u, list);
        let edgeList1 = this.listToEdge(u.id, adj1);
        this.logLine(2, [u, v], edgeList1, { count, u, v, adj1 });
        let adj2 = this.adjacent(v, list);
        let edgeList2 = this.listToEdge(v.id, adj2);
        this.logLine(3, [u, v], edgeList2, { count, u, v, adj1, adj2 });
        let common_neighbors = adj1.filter(value => adj2.includes(value));
        let common_list: Link[] = [];
        common_neighbors.forEach(item => {
          common_list.push({ target: { id: item }, source: { id: target } });
          common_list.push({ target: { id: item }, source: { id: source } });
        })
        this.logLine(4, [u, v], common_list, { count, u, v, adj1, adj2, common_neighbors });
        count += common_neighbors.length;
        this.logLine(5, [u, v], [], { count, u, v, adj1, adj2, common_neighbors });
      }
    }
    this.logLine(6, [], [], { count });
    let result = count;
    this.logLine(7, [], [], { count, result });
    return count;
  }

  public MatrixMultiplicationTriangleCount(adjMatrix: number[][]): number {
    this.clearSequence()
    let A = adjMatrix;
    let n = adjMatrix.length;
    let count = 0;
    this.logLine(0, [], [], { A, count });
    let A2 = this.matrixCubed(adjMatrix);
    this.logLine(1, [], [], { A, count, A2 });
    for (let i = 0; i < n; i++) {
      this.logLine(2, [], [], { A, count, A2, i, n });
      for (let j = 0; j < n; j++) {
        this.logLine(3, [{ id: i }, { id: j }], [{ source: { id: i }, target: { id: j } }], { A, count, A2, i, n, j });
        count = count + A[i][j] * A2[i][j];
        this.logLine(4, [{ id: i }, { id: j }], [{ source: { id: i }, target: { id: j } }], { A, count, A2, i, n, j });
      }
      this.logLine(5, [], [], { A, count, A2, i, n });
    }
    this.logLine(6, [], [], { A, count, A2 });
    let result = count;
    this.logLine(7, [], [], { A, count, A2, result });
    return result;
  }

  private matrixCubed(matrix: number[][]): number[][] {
    let resultMatrix: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
      resultMatrix.push([]);
      for (let j = 0; j < matrix.length; j++) {
        let sum = 0;
        for (let k = 0; k < matrix.length; k++) {
          sum += matrix[i][k] * matrix[k][j];
        }
        resultMatrix[i].push(sum);
      }
    }
    return resultMatrix;
  }

  private adjacent(node: Node, list: number[][]): number[] {
    return list[node.id].filter(x => x > node.id);
  }

  private listToEdge(source: number, targetList: number[]): Link[] {
    return targetList.map(x => { return { source: { id: source }, target: { id: x } }; });
  }

  private adjacentPairs(v: Node, graph: Graph): [Node, Node][] {
    let pairs: [Node, Node][] = [];
    let neighbours = graph.links
      .filter(l => l.source == v || l.target == v)
      .map(l => l.source == v ? l.target : l.source);
    for (let i = 0; i < neighbours.length; i++) {
      const fst = neighbours[i];
      for (let j = i + 1; j < neighbours.length; j++) {
        const snd = neighbours[j];
        pairs.push([fst, snd]);
      }
    }
    return pairs;
  }

  private containsLink(pair: [Node, Node], links: Link[]): boolean {
    return links.filter(l => l.source == pair[0] && l.target == pair[1]).length > 0 ||
      links.filter(l => l.source == pair[1] && l.target == pair[0]).length > 0;
  }
}
