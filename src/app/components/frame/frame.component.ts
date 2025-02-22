import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatrixViewComponent } from '../matrix-view/matrix-view.component';
import { TileComponent } from '../tile/tile.component';
import { GraphComponent } from "../graph/graph.component";
import { AdjacencyMatrix } from '../../model/adjacency-matrix';
import { GraphConverterService } from '../../services/graph-converter.service';
import { CodeViewComponent } from '../code-view/code-view.component';
import { AlgorithmService } from '../../services/algorithm.service';
import { Snapshot } from '../../model/snapshot.model';
import { Demo } from '../../model/demo.model';
import { Graph } from '../../model/graph.model';

@Component({
  selector: 'frame',
  imports: [MatButtonModule, MatGridListModule, MatrixViewComponent, TileComponent, GraphComponent, CodeViewComponent],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent implements OnInit {

  gcs:GraphConverterService = new GraphConverterService();
  algs:AlgorithmService = new AlgorithmService();
  graphArray:number[] = [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
  graphMatrix:number[][] =this.gcs.ArrayToMatrix(this.graphArray, 4);
  demo:Demo;

  constructor() {
    let graph:Graph = this.gcs.MatrixToNodes(this.graphMatrix);
    let sequence = this.algs.DemoNodeIterator(graph);
    console.log(sequence);
    this.demo = {algoName: "Node iteration", snapshotSequence: sequence, graph: graph, currentStepIndex: 0, pseudoCode:
      `count = 0
      for each node v ∈ V do
        for each pair of distinct neighbor u and w in adj(v) do
          if (u, w) ∈ E then
            count = count + 1
          end if
        end for
      end for
      return count/3 `}
  }

  ngOnInit(): void {

  }
}
