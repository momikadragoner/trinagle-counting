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
import { MatSelectModule } from '@angular/material/select';
import { GraphDialogComponent } from '../graph-dialog/graph-dialog.component';
import { MediaControlComponent } from "../media-control/media-control.component";
import { VariableViewComponent } from "../variable-view/variable-view.component";
import { DemoBuilderService } from '../../services/demo-builder.service';
import { AlgoType } from '../../model/algo-type.model';
import { AlgorithmDialogComponent } from '../algorithm-dialog/algorithm-dialog.component';
import { CookieService } from '../../services/cookie.service';
import { SelectGraphDialogComponent } from '../select-graph-dialog/select-graph-dialog.component';

@Component({
  selector: 'frame-component',
  imports: [MatButtonModule, MatGridListModule, MatrixViewComponent, TileComponent, GraphComponent, CodeViewComponent, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MediaControlComponent, VariableViewComponent, MatSelectModule],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent implements OnInit {

  private converter = inject(GraphConverterService);
  private demoBuilder = inject(DemoBuilderService);
  private cookieService = inject(CookieService);
  readonly graphDialog = inject(MatDialog);

  graphArray: number[] = [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
  graphMatrix: number[][] = this.converter.ArrayToMatrix(this.graphArray, 4);
  graph: Graph = this.converter.MatrixToNodes(this.graphMatrix);
  algo: AlgoType = AlgoType.Node;
  currentStep: number = 0;
  demo: Demo;
  drawerOpened: boolean = false;

  constructor() {
    let graph: Graph = this.converter.MatrixToNodes(this.graphMatrix);
    this.demo = this.demoBuilder
      .setAlgorithm(this.algo)
      .setGraph(graph)
      .build();
  }

  ngOnInit(): void {

  }

  algoChanged(algo: AlgoType) {
    this.algo = algo;
    this.currentStep = 0;
    this.demo = this.demoBuilder
      .setAlgorithm(algo)
      .setGraph(this.graph)
      .build();
  }

  graphChanged(graphArray: number[], numOfNodes: number) {
    let graph: Graph = this.converter.ArrayToNodes(graphArray, numOfNodes);
    this.graph = graph;
    this.currentStep = 0;
    this.demo = this.demoBuilder
      .setAlgorithm(this.algo)
      .setGraph(graph)
      .build();
  }

  openGraphDialog() {
    const dialogRef = this.graphDialog.open(GraphDialogComponent, {
      width: '30rem',
      height: '34rem',
      data: { name: "My Graph", numOfNodes: 3, matrixArray: [] },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.drawerOpened = false;
        this.cookieService.saveGraph(result);
        this.graphChanged(result.matrixArray, result.numOfNodes)
        //TODO
      }
    });
  }

  openAlgoDialog() {
    const dialogRef = this.graphDialog.open(AlgorithmDialogComponent, {
      data: this.algo,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.drawerOpened = false;
        this.algoChanged(result);
      }
    });
  }

  openSelectGraphDialog() {
    const dialogRef = this.graphDialog.open(SelectGraphDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.drawerOpened = false;
        this.graphChanged(result.matrixArray, result.numOfNodes)
      }
    });
  }
}
