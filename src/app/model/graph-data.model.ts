export interface GraphData{
  name: string,
  numOfNodes: number,
  matrixArray: number[]
}

export function instanceOfGraphData(object: any): object is GraphData {
  return 'name' in object && 'numOfNodes' in object && 'matrixArray'in object;
}
