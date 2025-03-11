import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatrixViewComponent } from '../matrix-view/matrix-view.component';
import { TileComponent } from '../tile/tile.component';
import { GraphComponent } from "../graph/graph.component";
import { GraphConverterService } from '../../services/graph-converter.service';
import { CodeViewComponent } from '../code-view/code-view.component';
import { AlgorithmService } from '../../services/algorithm.service';
import { Snapshot } from '../../model/snapshot.model';
import { Demo } from '../../model/demo.model';
import { Graph } from '../../model/graph.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatrixFormComponent } from "../graph-dialog/matrix-form/matrix-form.component";
import { MatDialog } from '@angular/material/dialog';
import { GraphDialogComponent } from '../graph-dialog/graph-dialog.component';
import { MediaControlComponent } from "../media-control/media-control.component";

@Component({
  selector: 'frame-component',
  imports: [MatButtonModule, MatGridListModule, MatrixViewComponent, TileComponent, GraphComponent, CodeViewComponent, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MediaControlComponent],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent implements OnInit {

  private gcs = inject(GraphConverterService);
  private algs = inject(AlgorithmService);
  readonly graphDialog = inject(MatDialog);

  graphArray: number[] = [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
  graphMatrix: number[][] = this.gcs.ArrayToMatrix(this.graphArray, 4);
  demo: Demo;
  currentStep: number = 0;

  constructor() {
    let graph: Graph = this.gcs.MatrixToNodes(this.graphMatrix);
    let result = this.algs.DemoNodeIterator(graph);
    let sequence = this.algs.getSnapshotSequence();
    console.log(sequence);
    this.demo = {
      algoName: "Node iteration", snapshotSequence: sequence, graph: graph, currentStepIndex: 0, pseudoCode:
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

  openGraphDialog() {
    const dialogRef = this.graphDialog.open(GraphDialogComponent, {
      width: '30rem',
      height: '34rem',
      data: { name: "My Graph", numOfNodes: 3, matrixArray: [] },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);
        //TODO
      }
    });
  }

  stepChangeHandler(newValue: number) {
    //TODO
  }
}
