"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { ShieldCheck, ChevronRight, Lock, User } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const [activeTab, setActiveTab] = useState<'COMMANDER' | 'OPERATOR'>('OPERATOR');
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        // eslint-disable-next-line
        setSessionId(Math.random().toString(36).substr(2, 9).toUpperCase());
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network delay for "tactical" feel
        await new Promise(resolve => setTimeout(resolve, 800));
        await login(email, password); // This will trigger the router push in AuthContext
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row font-sans overflow-hidden">

            {/* Left Panel - Visuals */}
            <div className="relative w-full md:w-1/2 lg:w-3/5 bg-[url('/login-bg.png')] bg-cover bg-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                {/* Animated Fog Layer */}
                <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog1.png')] animate-fog opacity-30 mix-blend-screen z-0"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 z-10"></div>

                <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
                    <div className="animate-fade-in-down">
                        <div className="flex items-center gap-4 mb-2">
                            <img src="/logo.png" alt="Vanguard" className="w-16 h-16 object-contain" />
                            <h1 className="text-6xl font-black italic tracking-tighter">
                                VANGUARD
                            </h1>
                        </div>
                        <p className="font-mono text-sm opacity-60 tracking-[0.3em] uppercase">Tactical Fleet Command</p>
                    </div>

                    <div className="space-y-6 max-w-md animate-fade-in-up">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                                <ShieldCheck className="text-heritage-red" />
                            </div>
                            <div>
                                <h3 className="font-bold">Role-Based Access</h3>
                                <p className="text-xs text-gray-400">Secure entry for Commanders & Operators.</p>
                            </div>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent"></div>

                        <p className="text-[10px] font-mono opacity-40">
                            SYSTEM STATUS: ONLINE<br />
                            REGION: SRI LANKA (LK)<br />
                            ENCRYPTION: AES-256
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8 relative">
                <div className="absolute inset-0 scan-line opacity-5 pointer-events-none"></div>

                <div className="w-full max-w-md space-y-8 z-10">

                    {/* Role Tabs */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
                        <button
                            onClick={() => setActiveTab('OPERATOR')}
                            className={`py-3 text-xs font-bold uppercase tracking-wider transition-all rounded ${activeTab === 'OPERATOR'
                                ? 'bg-white text-black shadow-lg scale-[1.02]'
                                : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            Operator
                        </button>
                        <button
                            onClick={() => setActiveTab('COMMANDER')}
                            className={`py-3 text-xs font-bold uppercase tracking-wider transition-all rounded ${activeTab === 'COMMANDER'
                                ? 'bg-heritage-red text-white shadow-lg shadow-heritage-red/20 scale-[1.02]'
                                : 'text-gray-500 hover:text-heritage-red'
                                }`}
                        >
                            Commander
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email ID</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={activeTab === 'COMMANDER' ? "kushan@tuff79.com" : "udaya@tuff79.lk"}
                                    className="w-full bg-black border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-700 font-mono text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all font-mono text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 rounded-lg font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all group ${activeTab === 'COMMANDER'
                                ? 'bg-heritage-red hover:bg-[#b3161a] text-white shadow-[0_0_20px_rgba(225,28,33,0.3)]'
                                : 'bg-white hover:bg-gray-200 text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                                }`}
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    INITIALIZE SESSION <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-[10px] text-gray-600 font-mono">
                            UNAUTHORIZED ACCESS IS PROHIBITED BY LAW.<br />
                            SESSION ID: {sessionId || 'INITIALIZING...'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
