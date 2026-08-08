import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0d1811',
            color: '#ecfdf5',
            border: '1px solid rgba(62, 220, 129, 0.3)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            fontSize: '13px',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)',
          },
        }}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/assess"
            element={
              <ProtectedRoute>
                <FormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
