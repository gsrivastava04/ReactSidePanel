import React, { useEffect, useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/dashboard/dashboard';
import Onboarding from './onboarding/onboarding';
import Login from './components/login/login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

import { theme } from './theme/theme';
import SessionTimeoutDialog from './components/login/sessionTimeoutDialog';

const SESSION_TIMEOUT = 10 * 60; // 10 min in seconds
const WARNING_TIME = 2 * 60; // 2 min in seconds

const SessionTimeoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showDialog, setShowDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SESSION_TIMEOUT);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const resetTimer = useCallback(() => {
    setLastActivity(Date.now());
    setShowDialog(false);
    setTimeLeft(SESSION_TIMEOUT);
  }, []);

  useEffect(() => {
    const activityHandler = () => resetTimer();
    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('keydown', activityHandler);
    window.addEventListener('mousedown', activityHandler);
    window.addEventListener('touchstart', activityHandler);
    return () => {
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keydown', activityHandler);
      window.removeEventListener('mousedown', activityHandler);
      window.removeEventListener('touchstart', activityHandler);
    };
  }, [resetTimer]);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      if (intervalId) clearInterval(intervalId);
      const id = setInterval(() => {
        const elapsed = Math.floor((Date.now() - lastActivity) / 1000);
        const left = SESSION_TIMEOUT - elapsed;
        setTimeLeft(left);
        if (left <= WARNING_TIME && left > 0) {
          setShowDialog(true);
        } else if (left <= 0) {
          setShowDialog(false);
          localStorage.removeItem('isLoggedIn');
          window.location.href = '/login';
        }
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [lastActivity]);

  const handleContinue = () => {
    resetTimer();
  };
  const handleLogout = () => {
    setShowDialog(false);
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  return (
    <>
      {children}
      <SessionTimeoutDialog open={showDialog} timeLeft={timeLeft} onContinue={handleContinue} onLogout={handleLogout} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionTimeoutProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                localStorage.getItem('isLoggedIn') === 'true'
                  ? <Navigate to="/dashboard" replace />
                  : <Navigate to="/login" replace />
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              } />
            </Routes>
          </BrowserRouter>
        </SessionTimeoutProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;