import { SelectItems } from '../../../../choiceside-components/lib'
import { createModule } from 'vuex-class-component'

const VuexModule = createModule({
  namespaced: 'funds-box',
  strict: false,
})

export class FundsBox extends VuexModule {
  creditFunds = 0
  depositFunds = 0

  creditFundsItems: SelectItems[] = [
    {
      value: 0,
      text: 'не має потреби отримання кредитних коштів',
    },
    {
      value: 0.2,
      text: 'можливо буде потреба отримання кредитних коштів',
    },
    {
      value: 0.4,
      text: 'є, але не значна отримання кредитних коштів',
    },
    {
      value: 0.6,
      text: 'є потреба отримання кредитних коштів',
    },
    {
      value: 0.8,
      text: 'значна потреба отримання кредитних коштів',
    },
    {
      value: 1,
      text: 'пріоритетна потреба отримання кредитних коштів',
    },
  ]
  depositFundsItems: SelectItems[] = [
    {
      value: 0,
      text: 'не має потреби внесення депозитних коштів',
    },
    {
      value: 0.2,
      text: 'можливо буде потреба внесення депозитних коштів',
    },
    {
      value: 0.4,
      text: 'є, але не значна внесення депозитних коштів',
    },
    {
      value: 0.6,
      text: 'є потреба внесення депозитних коштів',
    },
    {
      value: 0.8,
      text: 'значна потреба внесення депозитних коштів',
    },
    {
      value: 1,
      text: 'пріоритетна потреба внесення депозитних коштів',
    },
  ]
}
