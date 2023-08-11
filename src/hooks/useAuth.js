"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';

const AuthContext = createContext({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    signInWithGitHub: async () => {},
    signInWithGoogle: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
});

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(true);
                router.push('/login');
            }
            setInitialLoading(false);
        });
    }, [auth]);

    const signUp = async (email, password) => {
        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                router.push('/');
                setLoading(false);
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };

    const signIn = async (email, password) => {
        setLoading(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                router.push('/');
                setLoading(false);
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };

    const signInWithGitHub = async () => {
        setLoading(true);

        const provider = new GithubAuthProvider();

        await signInWithPopup(auth, provider)
            .then((userCredential) => {
                setUser(userCredential.user);
                router.push('/');
                setLoading(false);
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };

    const signInWithGoogle = async () => {
        setLoading(true);

        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider)
            .then((userCredential) => {
                setUser(userCredential.user);
                router.push('/');
                setLoading(false);
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };

    const logout = async () => {
        setLoading(true);

        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };

    const memoedValue = useMemo(() => ({
        user,
        signUp,
        signIn,
        signInWithGitHub,
        signInWithGoogle,
        loading,
        logout,
        error,
    }), [user, loading]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}