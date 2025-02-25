import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.init";

export const AuthContext = createContext();
const auth = getAuth(app);

const ProviderContext = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const handleRegister = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const setUserNameAndPhoto = (userName) => {
        return updateProfile(auth.currentUser, {
            displayName: userName
        });
    }

    const handleEmailLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const handleLogOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // const userEmail = currentUser?.email || user?.email;
            // const loggedUser = { email: userEmail };

            // if (currentUser?.email) {
            //     axiosSecure.post('/jwt', loggedUser)
            //         .then(res => {
            //             setLoading(false);
            //         });
            // } else {
            //     axiosSecure.post('/logout', {})
            //         .then(res => {
            //             setLoading(false);
            //         });
            // }
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const authInfo = {
        user,
        loading,
        setLoading,
        handleRegister,
        setUserNameAndPhoto,
        handleEmailLogin,
        handleLogOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            { children }
        </AuthContext.Provider>
    );
};

export default ProviderContext;