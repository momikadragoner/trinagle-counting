import { Component, input, Input } from '@angular/core';
import { AdjacencyMatrix } from '../../model/adjacency-matrix';
import { Link } from '../../model/link.model';

@Component({
  selector: 'matrix-view',
  imports: [],
  templateUrl: './matrix-view.component.html',
  styleUrl: './matrix-view.component.scss'
})
export class MatrixViewComponent {
  matrix = input<number[][]>();
  selectedLinks = input<Link[]>();

  isLinkSelected(i:number, j:number): boolean {
    return (this.selectedLinks()?.filter(x => (x.source.id == i && x.target.id == j) || (x.source.id == j && x.target.id == i)).length ?? 0) > 0;
  }
}

