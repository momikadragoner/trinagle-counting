import { Injectable } from '@angular/core';
import { Graph } from '../model/graph.model';
import { Node } from '../model/node.model';
import { Link } from '../model/link.model';
import { Snapshot } from '../model/snapshot.model';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor() { }

  public DemoNodeIterator(graph: Graph): Snapshot[] {
    let sequence: Snapshot[] = [];
    let count = 0;
    sequence.push({ lineIndex: 0, usedNodes: [], usedLinks: [] });
    sequence.push({ lineIndex: 1, usedNodes: [], usedLinks: [] });
    graph.nodes.forEach(v => {
      this.adjacent(v, graph).forEach(pair => {
        sequence.push({ lineIndex: 2, usedNodes: [v], usedLinks: [] });
        sequence.push({ lineIndex: 3, usedNodes: [v, pair[0], pair[1]], usedLinks: [] });
        if (this.containsLink(pair, graph.links)) {
          count = count + 1;
          sequence.push({ lineIndex: 4, usedNodes: [v, pair[0], pair[1]], usedLinks: [] });
        }
      });
      sequence.push({ lineIndex: 5, usedNodes: [v], usedLinks: [] });
    });
    sequence.push({ lineIndex: 6, usedNodes: [], usedLinks: [] });
    sequence.push({ lineIndex: 7, usedNodes: [], usedLinks: [] });
    let result: Number = count / 3;
    sequence.push({ lineIndex: 8, usedNodes: [], usedLinks: [] });
    return sequence;
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
