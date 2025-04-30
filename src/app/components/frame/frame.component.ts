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
import { MatSnackBar } from '@angular/material/snack-bar';
import { GraphDialogComponent } from '../graph-dialog/graph-dialog.component';
import { MediaControlComponent } from "../media-control/media-control.component";
import { VariableViewComponent } from "../variable-view/variable-view.component";
import { DemoBuilderService } from '../../services/demo-builder.service';
import { AlgoType } from '../../model/algo-type.model';
import { AlgorithmDialogComponent } from '../algorithm-dialog/algorithm-dialog.component';
import { CookieService } from '../../services/cookie.service';
import { SelectGraphDialogComponent } from '../select-graph-dialog/select-graph-dialog.component';
import { GraphData } from '../../model/graph-data.model';
import { DemoDialogComponent } from '../demo-dialog/demo-dialog.component';
import { ListViewComponent } from "../list-view/list-view.component";

@Component({
  selector: 'frame-component',
  imports: [MatButtonModule, MatGridListModule, MatrixViewComponent, TileComponent, GraphComponent, CodeViewComponent, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MediaControlComponent, VariableViewComponent, MatSelectModule, ListViewComponent],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent {

  private converter = inject(GraphConverterService);
  private demoBuilder = inject(DemoBuilderService);
  private cookieService = inject(CookieService);
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  graphData: GraphData;
  graphArray: number[] = [
    0, 1, 1, 1, 0,
    0, 0, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ];
  graphMatrix: number[][] = this.converter.arrayToMatrix(this.graphArray, 5);
  graphList: number[][] = this.converter.matrixToList(this.graphMatrix);
  graph: Graph = this.converter.matrixToNodes(this.graphMatrix);
  algo: AlgoType = AlgoType.Node;
  currentStep: number = 0;
  demo: Demo;
  drawerOpened: boolean = false;

  constructor() {
    let graph: Graph = this.converter.matrixToNodes(this.graphMatrix);
    this.graphData = { name: "Example Graph", numOfNodes: 5, matrixArray: this.graphArray };
    this.demo = this.demoBuilder
      .setAlgorithm(this.algo)
      .setGraph(graph)
      .build();
  }

  rebuildDemo(algo: AlgoType, newGraphData: GraphData): void {
    this.currentStep = 0;
    this.algo = algo;
    this.graphData = newGraphData;
    let graph: Graph = this.converter.arrayToNodes(newGraphData.matrixArray, newGraphData.numOfNodes);
    this.graph = graph;
    this.graphMatrix = this.converter.arrayToMatrix(newGraphData.matrixArray, newGraphData.numOfNodes);
    this.graphList = this.converter.matrixToList(this.graphMatrix);
    this.demo = this.demoBuilder
      .setAlgorithm(algo)
      .setGraph(graph)
      .build();
  }

  algoChanged(algo: AlgoType): void {
    this.rebuildDemo(algo, this.graphData)
  }

  graphChanged(newGraphData: GraphData): void {
    this.rebuildDemo(this.algo, newGraphData);
  }

  isAlgoEdge(): boolean {
    return this.algo == AlgoType.Link;
  }

  openGraphDialog() {
    const dialogRef = this.dialog.open(GraphDialogComponent, {
      width: '30rem',
      height: '34rem',
      data: { name: "My Graph", numOfNodes: 3, matrixArray: [] },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        this.drawerOpened = false;
        try {
          this.cookieService.saveGraph(result);
        } catch (error) {
          if (error instanceof Error) {
            this.openSnackBar(error.message, 'Dismiss')
          }
        }
        this.graphChanged(result);
      }
    });
  }

  openAlgoDialog() {
    const dialogRef = this.dialog.open(AlgorithmDialogComponent, {
      data: this.algo,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        this.drawerOpened = false;
        this.algoChanged(result);
      }
    });
  }

  openSelectGraphDialog() {
    const dialogRef = this.dialog.open(SelectGraphDialogComponent, {
      data: this.graphData,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        this.drawerOpened = false;
        this.graphChanged(result);
      }
    });
  }

  openDemoDialog() {
    const dialogRef = this.dialog.open(DemoDialogComponent, {
      data: { graphData: this.graphData, algoType: this.algo }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        this.drawerOpened = false;
        this.rebuildDemo(result.algoType, result.graphData);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
