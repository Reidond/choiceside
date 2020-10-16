import { atom, useSetRecoilState } from 'recoil'
import { FormGrid } from './AlternativesNumberX.styles'
import { NumericInput } from '@blueprintjs/core'
import { InlineMath } from 'react-katex'

export const alternativesNumberXState = atom({
  key: 'alternativesNumberXState',
  default: 0,
})

export const AlternativesNumberX = () => {
  const setAlernativesNumberX = useSetRecoilState(alternativesNumberXState)

  const handleValueChange = (valueAsNumber: number) => {
    setAlernativesNumberX(valueAsNumber)
  }

  return (
    <FormGrid>
      <InlineMath math="X" />
      <NumericInput onValueChange={handleValueChange} large={true} min={0} />
    </FormGrid>
  )
}
