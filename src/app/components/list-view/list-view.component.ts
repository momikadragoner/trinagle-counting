import { Component, input } from '@angular/core';
import { Link } from '../../model/link.model';

@Component({
  selector: 'list-view',
  imports: [],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {
  list = input<number[][]>();
  selectedLinks = input<Link[]>();

  isLinkSelected(i:number, j:number): boolean {
    return (this.selectedLinks()?.filter(x => (x.source.id == i && x.target.id == j)).length ?? 0) > 0;
  }
}
