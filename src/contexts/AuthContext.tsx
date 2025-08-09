import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
export { type User, type Session } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<any>;
    signUp: (email: string, password: string, fullName: string) => Promise<any>;
    signOut: () => Promise<any>;
    resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signIn: async () => {},
    signUp: async () => {},
    signOut: async () => {},
    resetPassword: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
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

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    interface SignInFn {
        (email: string, password: string): Promise<any>;
    }

    interface SignUpFn {
        (email: string, password: string, fullName: string): Promise<any>;
    }

    interface SignOutFn {
        (): Promise<any>;
    }

    interface ResetPasswordFn {
        (email: string): Promise<any>;
    }

    interface AuthContextValue {
        user: User | null;
        session: Session | null;
        loading: boolean;
        signIn: SignInFn;
        signUp: SignUpFn;
        signOut: SignOutFn;
        resetPassword: ResetPasswordFn;
    }

    const value: AuthContextValue = {
        user,
        session,
        loading,
        signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
        signUp: (email, password, fullName) =>
            supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name: fullName } },
            }),
        signOut: () => supabase.auth.signOut(),
        resetPassword: (email) => supabase.auth.resetPasswordForEmail(email),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
