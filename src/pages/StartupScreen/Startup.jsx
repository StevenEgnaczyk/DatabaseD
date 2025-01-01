import React, {useRef, useState} from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword'; // Import ForgotPassword component
import './Startup.css';
import DocumentPreviewAnimation from "./components/DocumentPreviewAnimation";

import { BsChevronCompactDown } from "react-icons/bs";
import AboutPage from "./components/AboutPage";
import DropdownParent from "../Home/components/Dropdowns/DropdownParent";

const Startup = ({ user, setUser }) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const aboutPageRef = useRef(null);
  const landingPageRef = useRef(null)

  const [isOpenComponent, setIsOpenComponent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [audio] = useState(new Audio("./about-music.mp3"));
  const openInfoComponent = () => {
    // Start animation phase
    setIsAnimating(true);

    setTimeout(() => {
      if (isOpenComponent && landingPageRef.current) {
        // Scroll up when AboutPage is closed
        landingPageRef.current.scrollIntoView({ behavior: "smooth" });
        audio.pause();
        audio.currentTime = 2;
      } else if (aboutPageRef.current) {
        // Scroll down to AboutPage when it's opened
        aboutPageRef.current.scrollIntoView({ behavior: "smooth" });
        audio.currentTime = 2;
        audio.play()
      }

      // Delay toggling the component's visibility to allow smooth scroll
      setTimeout(() => {
        setIsOpenComponent((prevState) => !prevState);
        setIsAnimating(false); // End animation phase
      }, 650); // Adjust the delay as needed for the scroll duration
    }, 0);
  };

  const toggleAuthMode = () => {
    setIsSigningUp((prevState) => !prevState);
    if (!isSigningUp) {
      setIsForgotPassword(false);
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword((prevState) => !prevState);
    setIsSigningUp(false);
  };

  return (
      <div className={'landing-full-page'}>
        <div className="landing-container" ref={landingPageRef}>
          <div className={'left-landing'}>
            <div className="auth-container">
              <h1 className={'databased-title'}>DataBaseD</h1>
              {isForgotPassword ? (
                  <ForgotPassword setUser={setUser} />
              ) : isSigningUp ? (
                  <Signup setUser={setUser} />
              ) : (
                  <Login setUser={setUser} />
              )}

              {!isForgotPassword && (
                  <button className="swap-button" onClick={toggleAuthMode}>
                    <span>{isSigningUp ? "Already have an account? Login" : "Need an account? Sign up"}</span>
                  </button>
              )}
              {(!isForgotPassword && !isSigningUp) ? (
                  <button className="swap-button" onClick={toggleForgotPassword}>
                    <span>Forgot Password? Click Here</span>
                  </button>
              ) : !isSigningUp && (
                  <button className="swap-button" onClick={toggleForgotPassword}>
                    <span>Return to login? Click Here</span>
                  </button>
              )}
            </div>
            <BsChevronCompactDown onClick={openInfoComponent} className={'arrow-icon'}/>
          </div>

          <div className='scrolling-pages'>
            <DocumentPreviewAnimation />
          </div>
        </div>

        {(isOpenComponent || isAnimating) && (
            <div className={'about-page'} ref={aboutPageRef}>
              <AboutPage openInfoComponent={openInfoComponent}/>
            </div>
        )}
      </div>
  );
};

export default Startup;
