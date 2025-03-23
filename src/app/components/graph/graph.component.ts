import { AfterViewInit, Component, input, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { Link } from '../../model/link.model';
import { Node } from '../../model/node.model';
import { GraphConverterService } from '../../services/graph-converter.service';
import { Graph } from '../../model/graph.model';

@Component({
  selector: 'graph',
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements AfterViewInit, OnChanges, OnDestroy {
  constructor(private ngZone: NgZone) { }

  gcs: GraphConverterService = new GraphConverterService();

  graph = input<Graph>({ nodes: [], links: [] });
  selectedNodes = input<Node[]>();

  private simulation: d3.Simulation<Node, undefined> | undefined;
  private width = 300;
  private height = 300;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedNodes'] != undefined) {
      this.simulation?.alphaTarget(0).restart();
    }
    if (changes['graph'] != undefined) {
      this.ngAfterViewInit();
    }
  }

  ngAfterViewInit(): void {
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const nodes: Node[] = this.graph().nodes;
    const links: Link[] = this.graph().links;

    d3.select('#graph-container').selectAll("*").remove()

    const svg = d3.select('#graph-container')
      .attr('width', this.width)
      .attr('height', this.height);

    this.simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: d3.SimulationNodeDatum) => d.index ?? '').distance(50))
      .force('collide', d3.forceCollide().radius(5))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width / 2, this.height / 2)).alphaDecay(0.0228).alphaMin(0.001);

    const link = svg
      .append('g')
      .attr('stroke', 'gray')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 2);

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

    node.call(d3.drag<SVGCircleElement, Node>()
      .on('start', (event: any, d: any) => {
        if (!event.active) this.simulation?.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }))
      .on("drag", (event: any, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event: any, d: any) => {
        if (!event.active) this.simulation?.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    function ticked(selectedNodes: Node[] | undefined) {
      link
        .attr('x1', (d) => d.source.x!)
        .attr('y1', (d) => d.source.y!)
        .attr('x2', (d) => d.target.x!)
        .attr('y2', (d) => d.target.y!);

      node
        .attr('cx', (d) => d.x ?? 0)
        .attr('cy', (d) => d.y ?? 0)
        .attr("fill", d => color(selectedNodes?.map(x => x.id).includes(d.id) ? '0' : '1'));
        console.log(1);

    }

    this.ngZone.runOutsideAngular(() => {
      this.simulation?.on('tick', () => ticked(this.selectedNodes()));
    });
  }

  ngOnDestroy(): void {
    if (this.simulation) {
      this.simulation.stop();
    }
  }
}
