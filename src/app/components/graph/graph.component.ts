import { AfterViewInit, Component, input, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { Link } from '../../model/link.model';
import { Node } from '../../model/node.model';
import { GraphConverterService } from '../../services/graph-converter.service';

@Component({
  selector: 'graph',
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements AfterViewInit, OnChanges {
  constructor(private ngZone: NgZone) { }

  gcs: GraphConverterService = new GraphConverterService();

  @Input() matrix: number[][] = [];
  selectedNodes = input<Node[]>();

  simulation: d3.Simulation<Node, undefined> | undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedNodes'] != undefined) {
      this.simulation?.alphaTarget(0).restart();
    }
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const data = this.gcs.MatrixToNodes(this.matrix);
      const nodes: Node[] = data.nodes;
      const links: Link[] = data.links;

      const width = 250;
      const height = 250;

      const svg = d3.select('#graph-container')
        .attr('width', width)
        .attr('height', height);

      this.simulation = d3
        .forceSimulation(nodes)
        .force('link', d3.forceLink(links).id((d: d3.SimulationNodeDatum) => d.index ?? ''))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));

      const link = svg
        .append('g')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke', 'gray') // Set stroke color
        .attr('stroke-width', 2); // Set stroke width

      const node = svg
        .append('g')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr("fill", "orange");

      node.append("title")
        .text(d => d.id);

      function ticked(selectedNodes: Node[] | undefined) {
        link
          .attr('x1', (d) => (d.source as Node).x ?? 0)
          .attr('y1', (d) => (d.source as Node).y ?? 0)
          .attr('x2', (d) => (d.target as Node).x ?? 0)
          .attr('y2', (d) => (d.target as Node).y ?? 0);

        node
          .attr('cx', (d) => d.x ?? 0)
          .attr('cy', (d) => d.y ?? 0)
          .attr("fill", d => color(selectedNodes?.map(x => x.id).includes(d.id) ? '0' : '1'));
      }

      this.simulation.on('tick', () => ticked(this.selectedNodes()));
    });
  }
}
