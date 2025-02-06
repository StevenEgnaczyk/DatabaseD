import React, {useRef, useState} from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import './Startup.css';
import { BsChevronCompactDown } from "react-icons/bs";
import AboutPage from "./components/AboutPage";
import DocumentPreviewAnimation from "./components/DocumentPreviewAnimation";

const Startup = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const aboutPageRef = useRef(null);
  const landingPageRef = useRef(null);

  const [isOpenComponent, setIsOpenComponent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [audio] = useState(new Audio("./about-music.mp3"));

  const toggleAuthMode = () => {
    setIsSigningUp((prevState) => !prevState);
    setIsForgotPassword(false);
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword((prevState) => !prevState);
    setIsSigningUp(false);
  };

  const openInfoComponent = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (isOpenComponent && landingPageRef.current) {
        landingPageRef.current.scrollIntoView({ behavior: "smooth" });
        audio.pause();
        audio.currentTime = 2;
      } else if (aboutPageRef.current) {
        aboutPageRef.current.scrollIntoView({ behavior: "smooth" });
        audio.currentTime = 2;
        audio.play();
      }
      setTimeout(() => {
        setIsOpenComponent((prevState) => !prevState);
        setIsAnimating(false);
      }, 650);
    }, 0);
  };

  return (
    <div className={'landing-full-page'}>
      <div className="landing-container" ref={landingPageRef}>
        <div className={'left-landing'}>
          <div className="auth-container">
            <h1 className={'databased-title'}>DataBaseD</h1>
            {isForgotPassword ? (
              <ForgotPassword />
            ) : isSigningUp ? (
              <Signup />
            ) : (
              <Login />
            )}
            {!isForgotPassword && (
              <button className="swap-button" onClick={toggleAuthMode}>
                <span>{isSigningUp ? "Already have an account? Login" : "Need an account? Sign up"}</span>
              </button>
            )}
            <button className="swap-button" onClick={toggleForgotPassword}>
              <span>{!isForgotPassword ? "Forgot Password? Click Here" : "Click to return to Home Screen"}</span>
            </button>
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
