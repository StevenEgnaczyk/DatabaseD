import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../config/firebase.js";

export const Auth = () => {
    const signInWithGoogle = async () => {    
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error.message);
        }
    };
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  );
};