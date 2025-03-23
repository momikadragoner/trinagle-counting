import { Component, HostBinding, inject, model, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatrixFormComponent } from "./matrix-form/matrix-form.component";
import { GraphFormComponent } from './graph-form/graph-form.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GraphData } from '../../model/graph-data.model';
import { color } from 'd3';


@Component({
  selector: 'app-graph-dialog',
  imports: [MatDialogContent, MatDialogTitle, MatButtonModule, MatrixFormComponent, GraphFormComponent],
  templateUrl: './graph-dialog.component.html',
  styleUrl: './graph-dialog.component.scss'
})
export class GraphDialogComponent {
  readonly dialogRef = inject(MatDialogRef<GraphDialogComponent>);
  readonly data = inject<GraphData>(MAT_DIALOG_DATA);
  readonly newGraph = model(this.data);

  currentContent = 0

  changeContent(content: number) {
    this.currentContent = content;
  }

  graphComplete() {
    this.dialogRef.close(this.newGraph());
  }
}
