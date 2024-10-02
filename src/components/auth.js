import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, provider } from "../config/firebase.js";
import { useEffect, useState } from "react";

export const Auth = () => {
    const [user, setUser] = useState(null);

    const signInWithGoogle = async () => {    
        try {
            console.log("Initiating sign-in...");
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.log("Error initiating sign-in: ", error);
        }
    };

    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    const user = result.user;
                    setUser(user); // Update state with user information
                    console.log("User signed in: ", user);
                } else {
                    console.log("No user signed in.");
                }
            } catch (error) {
                console.log("Error handling redirect result: ", error);
            }
        };

        handleRedirectResult();
    }, []);

    return (
        <div>
            {user ? (
                <h2>Welcome! You are signed in as {user.email}</h2>
            ) : (
                <button onClick={signInWithGoogle}>Sign in With Google</button>
            )}
        </div>
    );
};
