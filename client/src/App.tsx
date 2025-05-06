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
import ProtectedRoute from './route/ProtectedRoutes'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={
           
              <Layout />
           
          }>
            <Route path='/' element={
               <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
              } />
            <Route path='/dashboard' element={
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>} />
            <Route path='/history' element={
              <ProtectedRoute>
              <History />
              </ProtectedRoute>} />
            <Route path='/profile' element={
              <ProtectedRoute>
              <ProfilePage />
              </ProtectedRoute>} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  )
}

export default App
