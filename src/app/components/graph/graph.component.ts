import { AfterViewInit, Component, ElementRef, inject, input, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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

  private ngZone = inject(NgZone);
  graph = input<Graph>({ nodes: [], links: [] });
  selectedNodes = input<Node[]>();

  private simulation: d3.Simulation<Node, undefined> | undefined;
  private svg: d3.Selection<d3.BaseType, unknown, HTMLElement, undefined> | undefined;
  private link: d3.Selection<any, any, any, any> | undefined;
  private node: d3.Selection<any, any, any, any> | undefined;
  private width = 300;
  private height = 300;
  private color = d3.scaleOrdinal(d3.schemeCategory10);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedNodes']) {
      this.updateNodeColors();
      this.simulation?.alphaTarget(0.3).restart();
    }
    if (changes['graph'] && !changes['graph'].isFirstChange()) {
      this.initializeSimulation(this.graph().nodes, this.graph().links);
    }
  }

  ngAfterViewInit(): void {
    const element = document.getElementById('full-width-container');
    if (element) {
      this.width = element.offsetWidth;
    }
    this.initializeSimulation(this.graph().nodes, this.graph().links);
  }

  private initializeSimulation(nodes: Node[], links: Link[]): void {
    d3.select('#graph-container').selectAll("*").remove()

    this.svg = d3.select('#graph-container')
      .attr('width', this.width)
      .attr('height', this.height);

    this.simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: d3.SimulationNodeDatum) => d.index ?? '').distance(50))
      .force('collide', d3.forceCollide())
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width / 2, this.height / 2)).alphaDecay(0.0228).alphaMin(0.001);

    this.svg?.append('g');

    this.link = this.svg!.select('g')
      .attr('stroke', 'gray')
      .selectAll('line')
      .data(links, (d: any) => `${d.source.uuid}-${d.target.uuid}`)
      .enter()
      .append('line')
      .attr('stroke-width', 2);

    this.node = this.svg!.select('g')
      .selectAll('circle')
      .data(nodes, (d: any) => d.uuid)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr("fill", this.color("0"))
      .call(d3.drag<SVGCircleElement, Node>()
        .on('start', (event: any, d: any) => {
          if (!event.active) this.simulation?.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event: any, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event: any, d: any) => {
          if (!event.active) this.simulation?.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    this.node?.append("title")
      .text(d => d.id);

    this.simulation.on('tick', () => {
      this.ngZone.runOutsideAngular(() => {
        this.ticked();
      });
    });
  }

  private updateNodeColors(): void {
    if (this.node) {
      this.node.attr("fill", d => this.color(this.selectedNodes()?.map(x => x.id).includes(d.id) ? '1' : '0'));
    }
  }

  private ticked(): void {
    if (this.link && this.node) {
      this.link
        .attr('x1', (d) => (d.source as Node).x!)
        .attr('y1', (d) => (d.source as Node).y!)
        .attr('x2', (d) => (d.target as Node).x!)
        .attr('y2', (d) => (d.target as Node).y!);

      this.node
        .attr('cx', (d) => d.x ?? 0)
        .attr('cy', (d) => d.y ?? 0);

    }
  }

  ngOnDestroy(): void {
    if (this.simulation) {
      this.simulation.stop();
    }
  }
}
