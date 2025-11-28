import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import './i18n'
import { Bounce, ToastContainer } from 'react-toastify'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import App from './App.jsx'
import { store } from './app/store'

const root = createRoot(document.getElementById('root'))

const rollbarConfig = {
  accessToken: '96d1a94dd5ca4d1da2901655829fb0d8',
  environment: 'testenv',
}

root.render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  </StrictMode>,
)
