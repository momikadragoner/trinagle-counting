import { AfterViewInit, Component, Input, NgZone, OnInit } from '@angular/core';
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
export class GraphComponent implements AfterViewInit {
  constructor(private ngZone: NgZone) { }

  @Input() matrix: number[][] = [];

  gcs: GraphConverterService = new GraphConverterService();

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const data = this.gcs.MatrixToNodes(this.matrix);
      const nodes: Node[] = data.nodes;
      const links: Link[] = data.links;

      const width = 250;
      const height = 250;

      const svg = d3.select('#graph-container')
        .attr('width', width)
        .attr('height', height);

      const simulation = d3
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

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => (d.source as Node).x ?? 0)
          .attr('y1', (d) => (d.source as Node).y ?? 0)
          .attr('x2', (d) => (d.target as Node).x ?? 0)
          .attr('y2', (d) => (d.target as Node).y ?? 0);

        node
          .attr('cx', (d) => d.x ?? 0)
          .attr('cy', (d) => d.y ?? 0);
      });
    });
    // const data = this.gcs.MatrixToNodes(this.matrix);
    // const nodes: Node[] = data.nodes;
    // const links: Link[] = data.links;

    // const width = 250;
    // const height = 250;

    // const svg = d3.select('.graph')
    //   .attr('width', width)
    //   .attr('height', height);

    // const simulation = d3
    //   .forceSimulation(nodes)
    //   .force('link', d3.forceLink(links).id((d:d3.SimulationNodeDatum) => d.index ?? ''))
    //   .force('charge', d3.forceManyBody())
    //   .force('center', d3.forceCenter(width / 2, height / 2));

    // const link = svg
    //   .append('g')
    //   .selectAll('line')
    //   .data(links)
    //   .enter()
    //   .append('line')
    //   .attr('stroke', 'gray') // Set stroke color
    //   .attr('stroke-width', 2); // Set stroke width

    // const node = svg
    //   .append('g')
    //   .selectAll('circle')
    //   .data(nodes)
    //   .enter()
    //   .append('circle')
    //   .attr('r', 10)
    //   .attr("fill", "orange");

    // simulation.on('tick', () => {
    //   link
    //     .attr('x1', (d) => (d.source as Node).x ?? 0)
    //     .attr('y1', (d) => (d.source as Node).y ?? 0)
    //     .attr('x2', (d) => (d.target as Node).x ?? 0)
    //     .attr('y2', (d) => (d.target as Node).y ?? 0);

    //   node
    //     .attr('cx', (d) => d.x ?? 0)
    //     .attr('cy', (d) => d.y ?? 0);
    // });
  }
}
