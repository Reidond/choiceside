/* declare module 'mathjs' {
  import 'mathjs'

  const math: math.MathJsStatic

  interface Matrix {}

  namespace math {
    type FactoryFunction<T> = (scope: any) => T

    interface FactoryFunctionMap {
      [key: string]: FactoryFunction<any> | FactoryFunctionMap
    }

    interface MathJsStatic extends FactoryDependencies {
      row<T>(value: Array<T> | Matrix, index: number): Array<T> | Matrix
    }

    interface FactoryDependencies {
      rowDependencies: FactoryFunctionMap
    }
  }
} */
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
