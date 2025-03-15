import { inject, Injectable } from '@angular/core';
import { Demo } from '../model/demo.model';
import { Graph } from '../model/graph.model';
import { AlgorithmService } from './algorithm.service';
import { AlgoType } from '../model/algo-type.model';

@Injectable({
  providedIn: 'root'
})
export class DemoBuilderService {

  private algs = inject(AlgorithmService);
  private demo: Demo = {
    algoName: "",
    algoType: AlgoType.None,
    snapshotSequence: [],
    graph: { nodes: [], links: [] },
    pseudoCode: ""
  };

  public setAlgorithm(algoType: AlgoType): DemoBuilderService {
    switch (algoType) {
      case AlgoType.Node:
        this.demo.algoName = "Node iteration";
        this.demo.algoType = algoType;
        this.demo.pseudoCode = `count = 0
    for each node v ∈ V do
      for each pair of distinct neighbor u and w in adj(v) do
        if (u, w) ∈ E then
          count = count + 1
        end if
      end for
    end for
    return count/3 `;
        break;
      case AlgoType.Link:

        break;
      case AlgoType.Matrix:

        break;
      default:
        break;
    }
    return this;
  }

  public setGraph(graph: Graph): DemoBuilderService {
    this.demo.graph = graph
    return this;
  }

  public build(): Demo {
    this.algs.NodeIteratorTrinagleCount(this.demo.graph);
    this.demo.snapshotSequence = this.algs.getSnapshotSequence();
    return this.demo;
  }
}
