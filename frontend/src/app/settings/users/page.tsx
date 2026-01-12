"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Shield, ShieldAlert, Trash2, User, UserCheck, UserX } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

/* 
  NOTE: In a real production app, this page should be protected by middleware 
  to ensure only COMMANDER role can access it. Currently relied on client-side routing.
*/

type UserRole = 'COMMANDER' | 'OPERATOR';

interface UserData {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    created_at: string;
}

export default function UserManagement() {
    const { t } = useLanguage();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    // New User Form State
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'OPERATOR' as UserRole,
        password: 'temp_password_123' // default placeholder
    });

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchUsers();
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            if (res.ok) {
                setShowAddModal(false);
                setNewUser({ name: '', email: '', role: 'OPERATOR', password: 'temp_password_123' });
                fetchUsers();
            } else {
                alert('Failed to create user');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const toggleRole = async (user: UserData) => {
        const newRole = user.role === 'COMMANDER' ? 'OPERATOR' : 'COMMANDER';
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });
            if (res.ok) fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 font-sans">
            {/* Header */}
            <header className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/settings" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">System Users</h1>
                        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Access Control & Roles</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-heritage-red hover:bg-[#b3161a] px-6 py-3 rounded font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(225,28,33,0.3)] transition-all"
                >
                    <Plus size={18} /> New User
                </button>
            </header>

            {/* Users List */}
            <div className="max-w-6xl mx-auto">
                {loading ? (
                    <div className="text-center py-20 opacity-50 font-mono">Loading Personnel Records...</div>
                ) : (
                    <div className="grid gap-4">
                        {users.map((user) => (
                            <div key={user.id} className="bg-[#121212] border border-white/10 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/20 transition-all group">
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${user.role === 'COMMANDER' ? 'bg-heritage-red text-white' : 'bg-white/10 text-gray-400'
                                        }`}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{user.name}</h3>
                                        <p className="font-mono text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                                    <div className="flex flex-col items-end">
                                        <span className={`text-[10px] uppercase font-bold tracking-widest py-1 px-2 rounded ${user.role === 'COMMANDER' ? 'bg-heritage-red/20 text-heritage-red border border-heritage-red/50' : 'bg-blue-900/20 text-blue-400 border border-blue-500/30'
                                            }`}>
                                            {user.role}
                                        </span>
                                        <span className="text-[10px] text-gray-600 font-mono mt-1">ID: {user.id.slice(0, 8)}</span>
                                    </div>

                                    <div className="h-8 w-px bg-white/10 hidden md:block"></div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleRole(user)}
                                            title="Toggle Role"
                                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                        >
                                            {user.role === 'COMMANDER' ? <ShieldAlert size={18} /> : <Shield size={18} />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            title="Revoke Access"
                                            className="p-2 hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 w-full max-w-md relative">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">Authorize Personnel</h2>

                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-600" size={16} />
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 pl-10 focus:border-heritage-red/50 focus:outline-none transition-colors"
                                        placeholder="Sgt. Perera"
                                        value={newUser.name}
                                        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Email ID</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-heritage-red/50 focus:outline-none transition-colors"
                                    placeholder="user@tuff79.lk"
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Initial Role</label>
                                    <select
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-heritage-red/50 focus:outline-none transition-colors"
                                        value={newUser.role}
                                        onChange={e => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                                    >
                                        <option value="OPERATOR">Operator</option>
                                        <option value="COMMANDER">Commander</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Password</label>
                                    <input
                                        type="text"
                                        disabled
                                        className="w-full bg-white/5 border border-white/5 rounded-lg p-3 text-gray-500 cursor-not-allowed"
                                        value="check email (mock)"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-heritage-red hover:bg-[#b3161a] py-4 rounded-lg font-bold uppercase tracking-widest mt-4 shadow-[0_0_20px_rgba(225,28,33,0.3)] transition-all"
                            >
                                <UserCheck size={18} className="inline mr-2" />
                                Create Profile
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
