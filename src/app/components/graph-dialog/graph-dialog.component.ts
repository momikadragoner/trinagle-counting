import { Component, inject, model, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatrixFormComponent } from "./matrix-form/matrix-form.component";
import { GraphFormComponent } from './graph-form/graph-form.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GraphDialogData } from './graph-dialog-data.model';


@Component({
  selector: 'app-graph-dialog',
  imports: [MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatButtonModule, MatrixFormComponent, GraphFormComponent],
    // animations: [
    //   trigger('flyInOut', [
    //     state('in', style({opacity: '1'})),
    //     transition('void => *', [style({opacity: '0'}), animate(1000)]),
    //     transition('* => void', [animate(1000, style({opacity: '1'}))]),
    //   ]),
    // ],
  templateUrl: './graph-dialog.component.html',
  styleUrl: './graph-dialog.component.scss'
})
export class GraphDialogComponent {
  readonly dialogRef = inject(MatDialogRef<GraphDialogComponent>);
  readonly data = inject<GraphDialogData>(MAT_DIALOG_DATA);
  readonly newGraph = model(this.data);

  currentStep = 0

  nextStep(value:[string, number]) {
    this.newGraph.set({name: value[0], numOfNodes: value[1], matrixArray:[]});
    this.currentStep++;
  }

  graphComplete(value:number[]) {
    this.newGraph.update(x => x = {name: x.name, numOfNodes: x.numOfNodes, matrixArray: value});
    this.dialogRef.close(this.newGraph());
  }
}
