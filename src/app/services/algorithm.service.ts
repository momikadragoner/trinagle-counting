import { Injectable } from '@angular/core';
import { Graph } from '../model/graph.model';
import { Node } from '../model/node.model';
import { Link } from '../model/link.model';
import { Snapshot } from '../model/snapshot.model';
import { pairs } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  private log: Snapshot[] = [];

  clearLog() {
    this.log = [];
  }

  getSnapshotSequence() {
    return this.log;
  }

  private logLine(line: number, nodes: Node[], links: Link[], variables: any) {
    this.log.push({ lineIndex: line, usedNodes: nodes, usedLinks: links, variables: variables });
  }

  public DemoNodeIterator(graph: Graph): number {
    let count = 0; // Line 1
    this.logLine(0, [], [], { count })
    graph.nodes.forEach(v => { // Line 2
      this.logLine(1, [v], [], { count, v })
      this.adjacent(v, graph).forEach(pair => { // Line 3
        let u = pair[0];
        let w = pair[1];
        this.logLine(2, [v, u, w], [], { count, v, u, w })
        this.logLine(3, [v, u, w], [{ source: u, target: w }], { count, v, u, w })
        if (this.containsLink(pair, graph.links)) { // Line 4
          count = count + 1; // Line 5
          this.logLine(4, [v, u, w], [{ source: u, target: w }], { count, v, u, w })
        } // Line 6
        this.logLine(5, [v], [], { count, v, pair })
      }); // Line 7
      this.logLine(6, [], [], { count })
    }); // Line 8
    this.logLine(7, [], [], { count })
    let result: number = count / 3; // Line 9
    this.logLine(8, [], [], { count, result })
    return result;
  }

  private adjacent(v: Node, graph: Graph): [Node, Node][] {
    let pairs: [Node, Node][] = [];
    let neighbours = graph.links.filter(l => l.source == v || l.target == v).map(l => l.source == v ? l.target : l.source);
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
