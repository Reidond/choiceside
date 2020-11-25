import 'mathjs'

declare module 'mathjs' {
  interface MathJsStatic extends FactoryDependencies {
    row<T>(value: Array<T> | Matrix, index: number): Array<T> | Matrix
    column<T>(value: Array<T> | Matrix, index: number): Array<T> | Matrix
  }

  interface FactoryDependencies {
    rowDependencies: FactoryFunctionMap
    columnDependencies: FactoryFunctionMap
  }
}
