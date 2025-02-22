import { Component, Input } from '@angular/core';
import { AdjacencyMatrix } from '../../model/adjacency-matrix';

@Component({
  selector: 'matrix-view',
  imports: [],
  templateUrl: './matrix-view.component.html',
  styleUrl: './matrix-view.component.scss'
})
export class MatrixViewComponent {
  @Input() matrix:number[][] = [];
}
