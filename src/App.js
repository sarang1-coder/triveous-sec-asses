import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Button } from '@mui/material'
import { ThemeProvider, BaseStyles } from '@primer/react'
import ProtectedRoute, { RequireAuth } from './utils/PrivateRoute'
import { AuthProvider, UserAuthContextProvider } from './utils/useAuth'
import SignInSide from './Components/Authentication/SignIn'
import Home from './Components/Pages/Home'
import SignUp from './Components/Authentication/Signup'
import Layout from './Components/Layout'

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <div>
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
          <Toaster />
        </div>
      </BaseStyles>
    </ThemeProvider>
  )
}

export default App
