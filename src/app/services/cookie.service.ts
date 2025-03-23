import { Injectable } from '@angular/core';
import { GraphData } from '../model/graph-data.model';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  public saveGraph(graph: GraphData) {
    let graphs = [];
    if (this.cookieExists('graphs')) {
      graphs = this.getCookie('graphs');
    }
    graphs.push(graph);
    this.setCookie('graphs', graphs);
  }

  public getAllGraphs() {
    if (this.cookieExists('graphs')) {
      return this.getCookie('graphs');
    }
  }

  public deleteGraph(graphName:string) {
    let graphs: GraphData[] = [];
    if (this.cookieExists('graphs')) {
      graphs = this.getCookie('graphs');
    }
    graphs = graphs.filter(g => g?.name != graphName);
    this.setCookie('graphs', graphs);
  }

  private cookieExists(cookieName: string): boolean {
    return document.cookie.split(";").some((item) => item.trim().startsWith(cookieName + "="));
  }

  private setCookie(name: string, value: object) {
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
