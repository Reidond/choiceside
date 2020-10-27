export const computeProbableValue = (t: number, expectedVector: number[]) => {
  return expectedVector.map((v) => {
    const first = Math.abs(t - v)
    const minV = Math.min(...expectedVector)
    return Number((first / Math.max(t - minV, minV - t)).toPrecision(3))
  })
}
