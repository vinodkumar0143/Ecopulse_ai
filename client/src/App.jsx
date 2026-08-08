import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0d1811',
            color: '#ecfdf5',
            border: '1px solid rgba(52, 211, 153, 0.3)',
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
          <Route path="/assess" element={<FormPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
