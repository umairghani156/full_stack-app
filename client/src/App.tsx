
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './redux'
import ProfilePage from './pages/Profile'


function App() {
 

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route element={<Layout/>}>
       <Route path='/' element={<Dashboard />} />
       <Route path='/dashboard' element={<Dashboard />} />
       <Route path='/history' element={<History />} />
       <Route path='/profile' element={<ProfilePage />} />
       
      </Route>
    </Routes>
    <Toaster position="top-right" />
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
