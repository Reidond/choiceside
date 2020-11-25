import { Matrix, matrix } from 'mathjs'
import { chunk } from './chunk'

export const parseTextToMatrix = (raw: string, chunks: number): Matrix =>
  matrix(
    chunk(
      raw
        .split('\n')
        .filter((e) => e)
        .map((v) => Number(v.replace(',', '.'))),
      chunks
    )
  )

export const parseTextToArray = (
  raw: string,
  chunks: number
): Array<number[]> =>
  chunk(
    raw
      .split('\n')
      .filter((e) => e)
      .map((v) => Number(v.replace(',', '.'))),
    chunks
  )
