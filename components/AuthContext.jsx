"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/service/firebaseConfig";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Sign in error:", error.message);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Sign out error:", error.message);
        }
    };

    /**
     * Returns the Firebase ID token for the current user.
     * Used to authenticate API route requests.
     */
    const getIdToken = async () => {
        if (!user) return null;
        return user.getIdToken();
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut, getIdToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
