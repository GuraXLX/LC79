"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../supabase-config';

type UserRole = 'COMMANDER' | 'OPERATOR';

interface AuthContextType {
    role: UserRole;
    user: any;
    setRole: (role: UserRole) => void;
    isCommander: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<UserRole>('OPERATOR');
    const [user, setUser] = useState<any>(null);
    const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

    useEffect(() => {
        // Simulated auth check - in production would use supabase.auth.getSession()
        setUser({ id: '123', email: 'commander@lc79.lk' });
    }, []);

    return (
        <AuthContext.Provider value={{ role, user, setRole, isCommander: role === 'COMMANDER' }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
