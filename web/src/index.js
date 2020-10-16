import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import { RecoilRoot } from 'recoil'
import { render } from 'react-dom'

import Routes from 'src/Routes'

import './index.scss'
import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/table/lib/css/table.css'
import '@blueprintjs/core/lib/css/blueprint.css'

render(
  <RecoilRoot>
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider>
        <Routes />
      </RedwoodProvider>
    </FatalErrorBoundary>
  </RecoilRoot>,
  document.getElementById('redwood-app')
)
