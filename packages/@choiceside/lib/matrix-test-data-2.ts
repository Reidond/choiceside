import { Matrix } from 'mathjs'
import { parseTextToArray } from './parse-text-to-matrix'

export interface MatrixTestData<T> {
  raw: Array<number[]>
  resolved: Array<T>
}

export const K1 = (): MatrixTestData<number> => ({
  raw: parseTextToArray(
    `
1
0,13
0,05
0,8
0,02
0
0,01
0
0,18
0,74
0,49
0,15
0,31
0,04
0,26
0,04
`,
    8
  ),
  resolved: [0.321, 0.18, 0.11, 0.258, 0.07, 0.005, 0.056, 0.005],
})

export const K2 = (): MatrixTestData<number> => ({
  raw: parseTextToArray(
    `
0,99
0,12
0,06
0,01
0,03
0
0,02
0
1
0
0
1
0
1
1
0,45
1
0,43
0,21
0,01
0,1
0
0,05
0
1
1
1
1
1
0,03
0,78
1
`,
    8
  ),
  resolved: [0.175, 0.115, 0.113, 0.161, 0.112, 0.053, 0.137, 0.134],
})

export const K3 = (): MatrixTestData<number> => ({
  raw: parseTextToArray(
    `
1
1
0,32
0,08
0,21
0
0,15
0,02
1
1
1
0,28
1
0
0,08
0,05
1
1
0
0,63
1
0
0,02
0
`,
    8
  ),
  resolved: [0.261, 0.261, 0.137, 0.093, 0.22, 0, 0.019, 0.008],
})

export const K4 = (): MatrixTestData<number> => ({
  raw: parseTextToArray(
    `
1
0,99
1
0,19
0,08
0
0,04
0
0,93
0
0,52
0,26
0
0,9
0
0
`,
    8
  ),
  resolved: [0.32, 0.204, 0.271, 0.071, 0.018, 0.111, 0.007, 0],
})

export const K5 = (): MatrixTestData<number> => ({
  raw: parseTextToArray(
    `
1
0,7
1
0,15
0,14
0,06
0,38
0
1
0,24
1
1
0
1
0,98
0
`,
    8
  ),
  resolved: [0.214, 0.081, 0.214, 0.158, 0.01, 0.152, 0.171, 0],
})

export const D1 = (): MatrixTestData<number> => ({
  raw: parseTextToArray(
    `
0
0,42
0
0,08
0,06
0
0,61
0,9
0,6
1
0,4
1
1
1
0,2
1
0
1
0,16
1
1
1
0
0
0,27
1
0
0,04
0,18
0,07
0,72
0,33
0,9
1
0,33
0,98
1
1
0,69
1
0,69
0,16
0,03
0,03
0,026
0,02
0,043
0,016
`,
    8
  ),
  resolved: [0.101, 0.17, 0.051, 0.157, 0.16, 0.159, 0.068, 0.135],
})

export const D2 = (): MatrixTestData<number> => ({
  raw: parseTextToArray(
    `
1
0,25
0,31
0
0,02
0
0,01
0
0,96
0,96
0,92
0,96
0,74
1
0,92
0,96
0,4
1
0,8
1
1
1
1
1
`,
    8
  ),
  resolved: [0.096, 0.134, 0.118, 0.133, 0.118, 0.136, 0.131, 0.133],
})

export default {
  K1,
  K2,
  K3,
  K4,
  K5,
  D1,
  D2,
}
