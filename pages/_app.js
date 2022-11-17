import '../styles/globals.css'

import { Provider_Game} from '../src/componentes/AppContext'

function MyApp({ Component, pageProps }) {
  return (
    <Provider_Game>
      <Component {...pageProps} />
    </Provider_Game>
  )
}

export default MyApp
