import { inject, Injectable } from '@angular/core';
import { Demo } from '../model/demo.model';
import { Graph } from '../model/graph.model';
import { AlgorithmService } from './algorithm.service';
import { AlgoType } from '../model/algo-type.model';
import { GraphConverterService } from './graph-converter.service';

@Injectable({
  providedIn: 'root'
})
export class DemoBuilderService {

  private algs = inject(AlgorithmService);
  private converter = inject(GraphConverterService);
  private demo: Demo = {
    algoName: "",
    algoType: AlgoType.None,
    snapshotSequence: [],
    graph: { nodes: [], links: [] },
    adjMatrix: [],
    pseudoCode: ""
  };

  public setAlgorithm(algoType: AlgoType): DemoBuilderService {
    this.demo.algoType = algoType;
    switch (algoType) {
      case AlgoType.Node:
        this.demo.algoName = "Node Iterator Algorithm";
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
        this.demo.algoName = "Edge Iterator Algorithm";
        this.demo.pseudoCode = `count = 0
          for each edge (u, v) ∈ E do
          adj1 = {x|x ∈ adj(u), x > u}
          adj2 = {x|x ∈ adj(v), x > v}
          counte = |intersection(adj1, adj2)|
          count+ = counte
          end for
          return count`;
        break;
      case AlgoType.Matrix:
          this.demo.algoName = "Matrix Multiplication Algorithm"
          this.demo.pseudoCode = `count = 0
          compute A^2
          for i = 1...n do
          for j = 1...n do
          count = count + A[i,j] · (A^2)[i,j]
          end for
          end for
          return count`
        break;
      default:
        break;
    }
    return this;
  }

  public setGraph(graph: Graph): DemoBuilderService {
    this.demo.graph = graph
    this.demo.adjMatrix = this.converter.NodesToMatrix(graph);
    return this;
  }

  public build(): Demo {
    switch (this.demo.algoType) {
      case AlgoType.Node:
        this.algs.NodeIteratorTrinagleCount(this.demo.graph);
        break;
      case AlgoType.Link:
        this.algs.EdgeIteratorTrinagleCount(this.demo.graph);
        break;
      case AlgoType.Matrix:
        this.algs.MatrixMultiplicationTriangleCount(this.demo.adjMatrix);
        break;
      default:
        break;
    }
    this.demo.snapshotSequence = this.algs.getSnapshotSequence();
    return {
      algoName: this.demo.algoName,
      algoType: this.demo.algoType,
      snapshotSequence: this.demo.snapshotSequence,
      graph: this.demo.graph,
      adjMatrix: this.demo.adjMatrix,
      pseudoCode: this.demo.pseudoCode
    };
  }
}
