"use client";

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

type UserRole = 'COMMANDER' | 'OPERATOR';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    role: UserRole;
    user: User | null;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => void;
    setRole: (role: UserRole) => void;
    isCommander: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<UserRole>('OPERATOR');
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const login = async (email: string, _pass: string) => {
        // In a real app, we would use supabase.auth.signInWithPassword({ email, password: _pass })
        // For this demo, we mock the logic to switch roles based on email
        console.log(`Authenticating ${email}...`);

        if (email.includes('commander')) {
            setRole('COMMANDER');
            setUser({ id: 'cmd-01', email });
            router.push('/');
        } else {
            setRole('OPERATOR');
            setUser({ id: 'opr-01', email });
            router.push('/driver');
        }
    };

    const logout = () => {
        setUser(null);
        setRole('OPERATOR');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ role, user, login, logout, setRole, isCommander: role === 'COMMANDER' }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
