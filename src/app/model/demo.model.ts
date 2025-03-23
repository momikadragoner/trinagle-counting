import { AlgoType } from "./algo-type.model";
import { Graph } from "./graph.model";
import { Snapshot } from "./snapshot.model";

export interface Demo {
  algoName: string,
  algoType: AlgoType,
  graph: Graph,
  adjMatrix: number[][],
  pseudoCode: String,
  snapshotSequence: Snapshot[]
}
