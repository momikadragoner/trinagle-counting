import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'graph',
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    interface Node extends d3.SimulationNodeDatum {
      id: number;
    }

    interface Link extends d3.SimulationLinkDatum<d3.SimulationNodeDatum>{
      source: Node;
      target: Node;
    }

    const nodes: Node[] = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];

    const links: Link[] = [
      { source: nodes[0], target: nodes[1] },
      { source: nodes[1], target: nodes[2] },
      { source: nodes[1], target: nodes[3] },
    ];

    const width = 250;
    const height = 250;

    const svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height);

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d:d3.SimulationNodeDatum) => d.index ?? ''))
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
  }
}
