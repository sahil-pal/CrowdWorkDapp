import './assets/styles/App.css';
import React, { useEffect, useState } from "react";
import { Footer } from './modules/homepage/presentation/component/Footer';
import { Header } from './modules/homepage/presentation/component/Header';
import { SideMenu } from './modules/homepage/presentation/component/SideMenu';
import { Homepage } from './modules/homepage/presentation/pages/Homepage';

function App() {

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
    } else {
      setErrorMessage("Install MetaMask Extension");
    }
  }, []);

  return (
    <>
      {
        errorMessage ? (
          <p className='error-box'>
            Error : {errorMessage}
            <a href='https://metamask.io/download/' target={'_blank'} rel="noreferrer">Click Here To Download</a>
          </p>
        ) : 
        <>
          <div className="container">
            <Header/>
          </div>
          <main>
            <div className="container">
              <div className="row space-between">
                <SideMenu/>
                <Homepage/>
              </div>
            </div>
          </main>
          <Footer/>
         </>
        }
    </>
  );
}
  

export default App;
