import {createContext, useContext} from 'react';

import {
    useAddress,
    useMetamask,
    useDisconnect } from "@thirdweb-dev/react";
  
const WalletContext = createContext();
  
export const WalletContextProvider = ({ children }) => {
   
    const address = useAddress();
    const connect = useMetamask();
    const disconnect = useDisconnect({ reconnectPrevious: true });
  
    return (
      <WalletContext.Provider
        value={{
          address,
          connect,
          disconnect,
        }}
      >
        {children}
      </WalletContext.Provider>
    );
};
  
export const useWalletContext = () => useContext(WalletContext);