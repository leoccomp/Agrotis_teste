import Home from './pages/Home';
import { ToastContainer } from 'react-toastify'

import './global.css';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Home />
      <ToastContainer autoClose={3000} position="bottom-center" theme='colored' />
    </>
  )
}

export default App
