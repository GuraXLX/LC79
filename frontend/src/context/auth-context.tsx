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
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/check-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (res.ok && data.found) {
                setRole(data.role);
                setUser({ id: data.id, email: email });

                if (data.role === 'COMMANDER') {
                    router.push('/');
                } else {
                    router.push('/driver');
                }
            } else {
                // Fallback for demo/dev if API fails or user not found (e.g. init first user)
                console.warn("User not found in DB, falling back to mock logic");
                if (email.includes('commander')) {
                    setRole('COMMANDER');
                    setUser({ id: 'cmd-01', email });
                    router.push('/');
                } else {
                    setRole('OPERATOR');
                    setUser({ id: 'opr-01', email });
                    router.push('/driver');
                }
            }
        } catch (error) {
            console.error("Login Error:", error);
            // Fallback
            if (email.includes('commander')) {
                setRole('COMMANDER');
                setUser({ id: 'cmd-01', email });
                router.push('/');
            } else {
                setRole('OPERATOR');
                setUser({ id: 'opr-01', email });
                router.push('/driver');
            }
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
