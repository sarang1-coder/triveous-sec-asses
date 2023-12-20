import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Button } from '@mui/material'
import { Provider } from 'react-redux'
import ProtectedRoute, { RequireAuth } from './utils/PrivateRoute'
import { AuthProvider, UserAuthContextProvider } from './utils/useAuth'
import SignInSide from './Components/Authentication/SignIn'
import Home from './Components/Pages/Home'
import SignUp from './Components/Authentication/Signup'
import Layout from './Components/Layout'
import store from './utils/store/store'

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/" element={<SignInSide />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </UserAuthContextProvider>
        </Router>
      </Provider>
      <Toaster />
    </div>
  )
}

export default App
