import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { AlgoType } from '../../model/algo-type.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-algorithm-dialog',
  imports: [MatDialogModule, MatRadioModule, FormsModule, MatButtonModule],
  templateUrl: './algorithm-dialog.component.html',
  styleUrl: './algorithm-dialog.component.scss'
})
export class AlgorithmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AlgorithmDialogComponent>);
  readonly data = inject<AlgoType>(MAT_DIALOG_DATA);
  readonly algo = model(this.data);

  optoins = [
    {value: AlgoType.Node, name: 'Node Iterator Algorithm'},
    {value: AlgoType.Link, name: 'Edge Iterator Algorithm'},
    {value: AlgoType.Matrix, name: 'Matrix Multiplication Algorithm'},
  ]

  onNoClick(): void {
    this.dialogRef.close();
  }
}
