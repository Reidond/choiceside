import 'mathjs'

declare module 'mathjs' {
  interface FactoryFunctionMap {
    [key: string]: FactoryFunction<unknown> | FactoryFunctionMap
  }

  interface MathJsStatic extends FactoryDependencies {
    row<T>(value: Array<T> | Matrix, index: number): Array<T> | Matrix
  }

  interface FactoryDependencies {
    rowDependencies: FactoryFunctionMap
  }
}
