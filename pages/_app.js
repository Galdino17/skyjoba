import '../styles/globals.css'
import { auth } from '../src/lib/firebase'
import { NextUIProvider } from '@nextui-org/react';

import { Provider_Game} from '../src/componentes/AppContext'

function MyApp({ Component, pageProps }) {
  if (!auth) return(<></>)
  return (
    <NextUIProvider>
      <Provider_Game>
        <Component {...pageProps} />
      </Provider_Game>
    </NextUIProvider>
  )
}

export default MyApp
