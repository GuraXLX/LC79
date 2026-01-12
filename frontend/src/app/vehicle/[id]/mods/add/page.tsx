"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Box, Save, Calendar, Tag, DollarSign } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function AddPart() {
    const router = useRouter();
    const params = useParams();
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push(`/vehicle/${params.id}`);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 font-sans flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <header className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                    <Link href={`/vehicle/${params.id}`} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">{t('addPart')}</h1>
                        <p className="font-mono text-gray-500 text-sm">MODIFICATIONS // {params.id}</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-[#121212] border border-white/10 p-8 rounded-lg space-y-6">

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Part Name / Component</label>
                            <input type="text" placeholder="e.g. Old Man Emu BP-51 Suspension Kit" className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:border-heritage-red outline-none font-bold uppercase" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Category</label>
                                <div className="relative">
                                    <Tag className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <select className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none appearance-none font-bold uppercase">
                                        <option>Suspension</option>
                                        <option>Armor / Protection</option>
                                        <option>Lighting / Electrical</option>
                                        <option>Performance / Engine</option>
                                        <option>Interior / Comfort</option>
                                        <option>Recovery / Winch</option>
                                        <option>Wheels / Tires</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Installation Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <input type="date" className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none font-mono" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Status</label>
                                <div className="relative">
                                    <Box className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <select className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none appearance-none font-bold uppercase">
                                        <option>Installed</option>
                                        <option>Purchased (Pending Install)</option>
                                        <option>Wishlist / Planned</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Total Cost (LKR)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <input type="number" placeholder="450000" className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none font-mono text-xl font-bold text-heritage-red" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-heritage-red text-white hover:bg-[#b3161a] py-4 rounded font-bold text-lg uppercase tracking-widest shadow-[0_4px_20px_rgba(225,28,33,0.3)] flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="animate-pulse">SAVING...</span>
                        ) : (
                            <>
                                <Save size={20} /> SAVE MODIFICATION
                            </>
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
