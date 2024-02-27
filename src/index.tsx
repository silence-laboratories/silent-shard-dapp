// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import './index.css';
import 'animate.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

// import { MetaMaskProvider } from '@metamask/sdk-react'; // TODO: Use metamask/sdk for v3.1
import mixpanel from 'mixpanel-browser';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const MIX_PANEL_TOKEN = process.env.REACT_APP_MIX_PANEL_TOKEN!;
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <MetaMaskProvider
      debug={false}
      sdkOptions={{
        enableAnalytics: false,
        logging: {
          developerMode: false,
        },
        dappMetadata: {
          name: 'Silent Shard dApp',
          url: window.location.href,
        },
        checkInstallationImmediately: true,
      }}> */}
    <App />
    {/* </MetaMaskProvider> */}
  </React.StrictMode>
);

mixpanel.init(MIX_PANEL_TOKEN, {
  autotrack: true,
  track_pageview: true,
  loaded: function () {
    mixpanel.track('Mixpanel Loaded on dApp');
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
