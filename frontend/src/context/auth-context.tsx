"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../supabase-config';

type UserRole = 'COMMANDER' | 'OPERATOR';

import { useRouter } from 'next/navigation';

interface AuthContextType {
    role: UserRole;
    user: any;
    login: (email: string, pass: string) => Promise<void>;
    setRole: (role: UserRole) => void;
    isCommander: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<UserRole>('OPERATOR');
    const [user, setUser] = useState<any>(null);
    const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    const router = useRouter();

    const login = async (email: string, pass: string) => {
        // In a real app, we would use supabase.auth.signInWithPassword({ email, password: pass })
        // For this demo, we mock the logic to switch roles based on email
        console.log(`Authenticating ${email}...`);

        if (email.includes('commander')) {
            setRole('COMMANDER');
            setUser({ id: 'cmd-01', email });
        } else {
            setRole('OPERATOR');
            setUser({ id: 'opr-01', email });
        }

        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ role, user, login, setRole, isCommander: role === 'COMMANDER' }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
