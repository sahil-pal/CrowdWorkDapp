import { ThirdwebProvider } from '@thirdweb-dev/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { WalletContextProvider } from './modules/auth/provider/WalletContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThirdwebProvider>
    <BrowserRouter>
      <WalletContextProvider>
          <App/>
      </WalletContextProvider>
    </BrowserRouter>
  </ThirdwebProvider>
);

