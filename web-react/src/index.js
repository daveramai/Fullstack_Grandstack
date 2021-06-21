import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

//Auth0
import { Auth0Provider } from '@auth0/auth0-react';
//App with Apollo, Auto0 and Reach hooks
import AppWithApollo from './components/AppWithApollo';

ReactDOM.render(
  <React.StrictMode>
    {/* inject auth0 here */}
      <Auth0Provider
      domain="daveramai.us.auth0.com"
      clientId="ZfVPhizcRgw9mVB6kkHLjzpph9ocSmsI"
      redirectUri={window.location.origin}
      audience="https://mybusinessreviews.com"
      >
        <AppWithApollo/>
      </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
