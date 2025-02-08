import { Component, Input } from '@angular/core';
import { AdjacencyMatrix } from '../../model/adjacency-matrix';

@Component({
  selector: 'matrix-view',
  imports: [],
  templateUrl: './matrix-view.component.html',
  styleUrl: './matrix-view.component.scss'
})
export class MatrixViewComponent {
  @Input() matrix:AdjacencyMatrix = new AdjacencyMatrix(3, [1,0,1,0,1,1,0,0,0]);
  range = new Array(this.matrix.n).fill(0);
}
