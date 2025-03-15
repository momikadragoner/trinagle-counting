import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatrixViewComponent } from '../matrix-view/matrix-view.component';
import { TileComponent } from '../tile/tile.component';
import { GraphComponent } from "../graph/graph.component";
import { GraphConverterService } from '../../services/graph-converter.service';
import { CodeViewComponent } from '../code-view/code-view.component';
import { Demo } from '../../model/demo.model';
import { Graph } from '../../model/graph.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { GraphDialogComponent } from '../graph-dialog/graph-dialog.component';
import { MediaControlComponent } from "../media-control/media-control.component";
import { VariableViewComponent } from "../variable-view/variable-view.component";
import { DemoBuilderService } from '../../services/demo-builder.service';
import { AlgoType } from '../../model/algo-type.model';

@Component({
  selector: 'frame-component',
  imports: [MatButtonModule, MatGridListModule, MatrixViewComponent, TileComponent, GraphComponent, CodeViewComponent, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MediaControlComponent, VariableViewComponent],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent implements OnInit {

  private gcs = inject(GraphConverterService);
  private demoBuilder = inject(DemoBuilderService);
  readonly graphDialog = inject(MatDialog);

  graphArray: number[] = [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
  graphMatrix: number[][] = this.gcs.ArrayToMatrix(this.graphArray, 4);
  currentStep: number = 0;
  demo: Demo;

  constructor() {
    let graph: Graph = this.gcs.MatrixToNodes(this.graphMatrix);
    this.demo = this.demoBuilder
    .setAlgorithm(AlgoType.Node)
    .setGraph(graph)
    .build();
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
}
