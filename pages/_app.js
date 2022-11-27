import '../styles/globals.css'
import { auth } from '../src/lib/firebase'
import { ChakraProvider } from '@chakra-ui/react'

import { Provider_Game} from '../src/componentes/AppContext'

function MyApp({ Component, pageProps }) {
  if (!auth) return(<></>)
  return (
    <ChakraProvider>
      <Provider_Game>
        <Component {...pageProps} />
      </Provider_Game>
    </ChakraProvider>
  )
}

export default MyApp
