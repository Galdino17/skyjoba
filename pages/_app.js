import '../styles/globals.css'
import { auth } from '../src/lib/firebase'

import { Provider_Game} from '../src/componentes/AppContext'

function MyApp({ Component, pageProps }) {
  if (!auth) return(<></>)
  return (
    <Provider_Game>
      <Component {...pageProps} />
    </Provider_Game>
  )
}

export default MyApp
