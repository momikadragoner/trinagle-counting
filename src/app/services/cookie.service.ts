import { Injectable } from '@angular/core';
import { GraphData, instanceOfGraphData } from '../model/graph-data.model';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  public saveGraph(graph: GraphData): boolean {
    let graphs = this.getAllGraphs() ?? [];
    if (this.isGraphSaved(graph.name)) {
      throw Error('A graph with name "' + graph.name + '" alredy exists.')
    }
    graphs.push(graph);
    this.setCookie('graphs', graphs);
    return true;
  }

  public isGraphSaved(name: string): boolean {
    let graphs = this.getAllGraphs();
    if (graphs == undefined) return false;
    for (let i = 0; i < graphs.length; i++) {
      const graph = graphs[i]
      if (graph.name == name) return true;
    }
    return false;
  }

  public getGraph(name: string): GraphData | undefined {
    let graphs = this.getAllGraphs();
    if (graphs == undefined) return undefined;
    for (let i = 0; i < graphs.length; i++) {
      const graph = graphs[i]
      if (graph.name == name) return graph;
    }
    return undefined;
  }

  public getAllGraphs(): GraphData[] | undefined {
    if (!this.cookieExists('graphs')) return undefined;
    let graphs = this.getCookie('graphs');
    if (!Array.isArray(graphs)) return undefined;
    if (graphs.every(g => instanceOfGraphData(g))) {
      return graphs;
    }
    return undefined;
  }

  public deleteGraph(graphName: string): boolean {
    let graphs = this.getAllGraphs();
    if (graphs == undefined) return false;
    graphs = graphs.filter(g => g?.name != graphName);
    this.setCookie('graphs', graphs);
    return true;
  }

  private cookieExists(cookieName: string): boolean {
    return document.cookie.split(";").some((item) => item.trim().startsWith(cookieName + "="));
  }

  private setCookie(name: string, value: object): void {
    document.cookie = name + "=" + JSON.stringify(value);
  }

  private getCookie(cookieName: string): any {
    let value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(cookieName + "="))
      ?.split("=")[1];
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }
}
