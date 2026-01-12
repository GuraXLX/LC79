"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserPlus, Shield, User, Save, Lock } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';

export default function SettingsPage() {
    const { t } = useLanguage();
    const { role } = useAuth();
    const [loading, setLoading] = useState(false);

    // Mock Form State
    const [newUser, setNewUser] = useState({
        email: '',
        role: 'OPERATOR'
    });

    if (role !== 'COMMANDER') {
        return (
            <main className="min-h-screen bg-[#050505] text-white p-12 flex flex-col items-center justify-center text-center font-sans">
                <Lock size={48} className="text-heritage-red mb-4" />
                <h1 className="text-3xl font-black italic uppercase">Access Denied</h1>
                <p className="text-gray-500 font-mono mt-2 mb-8">This restricted area is for COMMANDERS only.</p>
                <Link href="/" className="bg-white/10 px-6 py-3 rounded font-bold uppercase hover:bg-white/20 transition-all">
                    Return to Fleet
                </Link>
            </main>
        );
    }

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: newUser.email,
                    role: newUser.role,
                    name: newUser.email.split('@')[0], // Extract name from email
                })
            });

            if (!res.ok) throw new Error('Failed to create account');

            alert(`✅ Account created successfully for ${newUser.email}`);
            setNewUser({ email: '', role: 'OPERATOR' });
        } catch (error) {
            console.error(error);
            alert('❌ Error creating account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
            <header className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
                <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-1 relative">
                        COMMAND SETTINGS <span className="text-heritage-red text-2xl absolute top-0 -right-6">®</span>
                    </h1>
                    <p className="font-mono text-[10px] md:text-xs text-heritage-red font-bold uppercase tracking-[0.3em] pl-1">
                        ADMINISTRATION & ACCESS CONTROL
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Create Account Section */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-[#121212] border border-white/10 p-8 rounded-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-heritage-red px-3 py-1 rounded-bl text-[10px] font-bold uppercase z-10">Admin Action</div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <UserPlus size={24} className="text-heritage-red" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black italic uppercase">Create Account</h2>
                                <p className="text-xs text-gray-500 font-mono">Grant fleet access to new personnel</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateUser} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="driver@vanguard.lk"
                                    className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:border-heritage-red outline-none font-mono"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Assign Role</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setNewUser({ ...newUser, role: 'OPERATOR' })}
                                        className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${newUser.role === 'OPERATOR' ? 'bg-white/10 border-white text-white' : 'bg-black border-white/10 text-gray-500 hover:border-white/30'}`}
                                    >
                                        <User size={20} />
                                        <span className="text-xs font-bold uppercase">Operator</span>
                                    </div>
                                    <div
                                        onClick={() => setNewUser({ ...newUser, role: 'COMMANDER' })}
                                        className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${newUser.role === 'COMMANDER' ? 'bg-heritage-red/20 border-heritage-red text-heritage-red' : 'bg-black border-white/10 text-gray-500 hover:border-white/30'}`}
                                    >
                                        <Shield size={20} />
                                        <span className="text-xs font-bold uppercase">Commander</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !newUser.email}
                                className="w-full bg-white text-black hover:bg-gray-200 py-3 rounded font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating...' : <><Save size={18} /> Create Account</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Dummy List of Existing Accounts */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-black italic uppercase mb-6 flex items-center gap-3">
                        Active Personnel <span className="text-sm font-mono font-normal text-gray-500 not-italic normal-case bg-white/5 px-2 py-0.5 rounded">2 Active</span>
                    </h2>

                    <div className="border border-white/10 rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-500 font-mono text-xs uppercase">
                                <tr>
                                    <th className="p-4">User Identity</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Access Level</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <p className="font-bold">Kushan (You)</p>
                                        <p className="text-xs text-gray-500 font-mono">kushan.commander@vanguard.lk</p>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-heritage-red/20 text-heritage-red text-[10px] font-bold uppercase rounded border border-heritage-red/30">Commander</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-xs font-mono text-gray-400 uppercase">Online</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-mono text-xs text-gray-500">FULL ACCESS</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <p className="font-bold">Udaya</p>
                                        <p className="text-xs text-gray-500 font-mono">udaya@vanguard.lk</p>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-[10px] font-bold uppercase rounded border border-blue-500/30">Operator</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                                            <span className="text-xs font-mono text-gray-400 uppercase">Offline</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-mono text-xs text-gray-500">LIMITED (Read/Log)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
