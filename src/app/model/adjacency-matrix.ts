export class AdjacencyMatrix {
  n: number = 0
  matrix: number[][] = []

  constructor(n: number = 0, array: number[] = []) {
    this.n = n;
    if (array.length != n * n) {
      throw new Error('Length of array inconsitent with number of vertecies');
    }
    for (let index = 0; index < n * n; index += n) {
      this.matrix.push(array.slice(index, index + n))
    }
  }
}
