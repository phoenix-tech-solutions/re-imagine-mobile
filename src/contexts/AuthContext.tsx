import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

const AuthContext = createContext<{
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email, password) => Promise<any>;
    signUp: (email, password, fullName) => Promise<any>;
    signOut: () => Promise<any>;
    resetPassword: (email) => Promise<any>;
}>({ user: null, session: null, loading: true, signIn: async () => {}, signUp: async () => {}, signOut: async () => {}, resetPassword: async () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const value = {
        user,
        session,
        loading,
        signIn: (email, password) =>
            supabase.auth.signInWithPassword({ email, password }),
        signUp: (email, password, fullName) =>
            supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } }),
        signOut: () => supabase.auth.signOut(),
        resetPassword: (email) => supabase.auth.resetPasswordForEmail(email),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};