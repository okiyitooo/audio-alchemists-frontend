import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './components/Dashboard';
import ProjectPage from './pages/ProjectPage';
import HomePage from './pages/HomePage';
import CreateProjectPage from './pages/CreateProjectPage';
import EditProjectPage from './pages/EditProjectPage';
import TrackEditorPage from './pages/TrackEditorPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/Layout';

const theme = createTheme({
  
  palette: {
    primary: {
      main: '#3f51b5', // primary color (Indigo)
    },
    secondary: {
      main: '#f50057', // Secondary color (Pink A400)
    },
    background: {
      default: '#f4f6f8', // Slightly off-white background
      paper: '#ffffff',   // Background for Paper components
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Default buttons to not be all caps
        },
      },
    },
    MuiPaper: { // Default elevation for Paper
        styleOverrides: {
            root: {
                elevation: 1,
            }
        }
    }
  },
});

function App() {
  // if the user is logged in, '/' should be the dashboard
  // if the user is not logged in, '/' should be the home page
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            {localStorage.getItem('token') ? 
            (
              <Route path="/" element={<Dashboard />} />
            )
            : 
            (
              <Route path="/" element={<HomePage />} />
            )}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-project" element={<CreateProjectPage />} />
            <Route path="/projects/:id/edit" element={<EditProjectPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/projects/:projectId/tracks/:trackId" element = {<TrackEditorPage/>}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;