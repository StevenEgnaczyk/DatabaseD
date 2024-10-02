import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../config/firebase.js";
import {useRef} from "react";
import "./auth.css";
export const Auth = () => {
    const textRef = useRef(null);

    const signInWithGoogle = async () => {    
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleTextRotation = () => {
      const textElement = textRef.current;
      if(textElement){
        textElement.classList.add("rotate");

        setTimeout(() => {
          textElement.classList.remove("rotate");
        }, 2000);
      }
    };

  return ( 
    <div className="auth-container" onClick={handleTextRotation}>
      <div className="static-text" ref={textRef}>Databased</div>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  );
};