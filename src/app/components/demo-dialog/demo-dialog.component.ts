import { Component, inject, model, OnInit } from '@angular/core';
import { AlgoType } from '../../model/algo-type.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DemoData } from '../../model/demo-data.model';
import { CookieService } from '../../services/cookie.service';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { GraphData } from '../../model/graph-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-demo-dialog',
  imports: [MatDialogModule, MatRadioModule, FormsModule, MatButtonModule, MatListModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './demo-dialog.component.html',
  styleUrl: './demo-dialog.component.scss'
})
export class DemoDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DemoDialogComponent>);
  readonly data = inject<DemoData>(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private cookieService = inject(CookieService);
  private snackBar = inject(MatSnackBar);

  graphControl = this.formBuilder.control([this.data.graphData], Validators.required);
  algoControl = this.formBuilder.control([this.data.algoType], Validators.required);
  demoForm: FormGroup;

  algoOptoins = [
    { value: AlgoType.Node, name: 'Node Iterator Algorithm' },
    { value: AlgoType.Link, name: 'Edge Iterator Algorithm' },
    { value: AlgoType.Matrix, name: 'Matrix Multiplication Algorithm' },
  ]

  graphs: GraphData[] = [];

  defaultGraphs: GraphData[] = [
    {
      name: 'Star', numOfNodes: 6, matrixArray: [
        0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0,
      ]
    },
    {
      name: 'Complete', numOfNodes: 6, matrixArray: [
        0, 1, 1, 1, 1, 1,
        0, 0, 1, 1, 1, 1,
        0, 0, 0, 1, 1, 1,
        0, 0, 0, 0, 1, 1,
        0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0,
      ]
    },
    {
      name: 'Complete biparite', numOfNodes: 6, matrixArray: [
        0, 0, 0, 1, 1, 1,
        0, 0, 0, 1, 1, 1,
        0, 0, 0, 1, 1, 1,
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ]
    },
    {
      name: 'Grid', numOfNodes: 7, matrixArray: [
        0, 1, 1, 1, 1, 1, 0,
        0, 0, 1, 0, 0, 1, 1,
        0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0,
      ]
    },
    {
      name: 'Euglena viridis', numOfNodes: 5, matrixArray: [
        0, 1, 1, 1, 0,
        0, 0, 1, 1, 0,
        0, 0, 0, 0, 1,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
      ]
    }
  ]

  constructor() {
    this.demoForm = this.formBuilder.group({
      algo: this.algoControl,
      graph: this.graphControl
    });
  }

  ngOnInit() {
    const cookieGraphs = this.cookieService.getAllGraphs() || [];
    this.graphs = cookieGraphs.concat(this.defaultGraphs);

    if (this.data.graphData) {
      const initialGraph = this.graphs.find(g => g === this.data.graphData);
      if (initialGraph) {
        this.graphControl.setValue([initialGraph]);
      }
    }
  }

  close() {
    if (this.demoForm.valid) {
      const algoValue = this.demoForm.get('algo')?.value[0];
      const graphValue = this.demoForm.get('graph')?.value[0];
      this.dialogRef.close({ algoType: algoValue, graphData: graphValue });
    } else {
      this.openSnackBar('Form invalid', "Dismiss");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
