import { useRecoilState } from 'recoil'
import {
  AlternativesNumberX,
  alternativesNumberXState,
} from 'src/components/AlternativesNumberX/AlternativesNumberX'
import GoalGroupTable from 'src/components/GoalGroupTable/GoalGroupTable'
import NumberGroupIndicator from 'src/components/NumberGroupIndicator/NumberGroupIndicator'

const HomePage = () => {
  const alternativesNumberX = useRecoilState(alternativesNumberXState)

  return (
    <div>
      <AlternativesNumberX />
      <NumberGroupIndicator />
      <NumberGroupIndicator />
      <GoalGroupTable />
      <pre>{alternativesNumberX}</pre>
    </div>
  )
}

export default HomePage
