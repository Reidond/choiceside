import { matrix, Matrix } from 'mathjs'

interface TaskObjectRaw {
  Показники: string
  'Група показників'?: string
  [key: string]: unknown
}

export enum ParsingStrategy {
  values = 'Показники',
  groupValues = 'Група показників',
}

export const canBeParsed = (
  data: Array<Record<string, unknown>>
): Promise<ParsingStrategy> => {
  return new Promise((resolve, reject) => {
    data.some((v) => '__EMPTY' in v) && reject()
    data.some((v) => 'Таблиця 1' in v) && reject()
    data.some((v) => 'Table 1' in v) && reject()
    data.every((v) => ParsingStrategy.values in v) &&
      resolve(ParsingStrategy.values)
    data.some((v) => ParsingStrategy.groupValues in v) &&
      resolve(ParsingStrategy.groupValues)
    return reject()
  })
}

const removeKey = (key: string, { [key]: _, ...rest }) => rest

export const parseXLSXToMatrix = async (
  data: Array<Record<string, unknown>>
): Promise<{ expression: string; rawMatrix: Array<Array<number[]>> }> => {
  const type = await canBeParsed(data)
  const d = data.map((v) => v as TaskObjectRaw)
  const rawMatrix: Array<Array<number[]>> = []
  switch (type) {
    case ParsingStrategy.values:
      const temp1: Record<string, Array<number[]>> = {}
      const [expression] = d[0]['Показники'].split('')
      d.forEach((v) => {
        const [name, index] = v['Показники'].split('')
        const key = `${name}${index}`
        if (!(key in temp1)) {
          temp1[key] = []
        }
      })
      d.forEach((v) => {
        const [name, index] = v['Показники'].split('')
        const key = `${name}${index}`
        if (key in temp1) {
          temp1[key].push(
            Object.entries(
              removeKey('Показники', removeKey('Група показників', v))
            ).map((v) => v[1] as number)
          )
        }
      })
      Object.values(temp1).forEach((v) => {
        rawMatrix.push(v)
      })
      return Promise.resolve({
        expression,
        rawMatrix,
      })
    case ParsingStrategy.groupValues:
      return Promise.reject()
    default:
      return Promise.reject()
  }
}
