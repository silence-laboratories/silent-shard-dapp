// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import './index.css';

import React, { ErrorInfo } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { AnalyticEvent, EventName, trackAnalyticEvent } from './api/analytic';
import App from './App';
import NavBar from './components/NavBar';
import ErrorState from './screens/ErrorState';

const logError = (error: Error, info: ErrorInfo) => {
  trackAnalyticEvent(
    EventName.unexpected_error,
    new AnalyticEvent() //
      .setWallet()
      .setError((error as Error).message)
      .setErrorStack(info.componentStack ?? '')
  );
};

function ErrorFallback() {
  const handleReload = async () => {
    location.reload();
  };
  return (
    <div className="app-container">
      <NavBar />
      <ErrorState
        onRetryClick={handleReload}
        step={{ progressBarValue: 0, onGoingBackClick: handleReload }}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
