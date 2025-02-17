import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './components/Dashboard';
import ProjectPage from './pages/ProjectPage';
import HomePage from './pages/HomePage';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6f61',
    },
    secondary: {
      main: '#ffcc5c',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;