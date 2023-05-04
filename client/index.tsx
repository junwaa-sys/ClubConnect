import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'

import App from './components/App'
import { MantineProvider } from '@mantine/core'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <MantineProvider
      theme={{
        colors: {
          brand: [
            '#EFF6F3',
            '#D2E5DE',
            '#B4D4C8',
            '#97C4B3',
            '#7AB39D',
            '#5DA288',
            '#4A826D',
            '#386152',
            '#254136',
            '#13201B',
          ],
        },
        primaryColor: 'brand',
      }}
    >
      <Auth0Provider
        domain="tohora-2023-daniel.au.auth0.com"
        clientId="1gFRX3MGnRmPTQTORzxr1e1ExtK1KROo"
        redirectUri={window.location.origin}
        audience="https://clubconnect/api"
      >
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      </Auth0Provider>
    </MantineProvider>
  )
})
