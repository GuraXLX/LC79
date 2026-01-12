"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Hammer, Save } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export default function AddModificationLog() {
    const router = useRouter();
    const params = useParams();
    const { t } = useLanguage();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'SUSPENSION',
        brand: '',
        cost: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/modifications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vehicle_id: id,
                    name: formData.name,
                    category: formData.category,
                    brand: formData.brand,
                    cost: parseFloat(formData.cost),
                    installed_at: new Date(formData.date).toISOString(),
                    notes: formData.notes
                })
            });

            if (!res.ok) throw new Error('Failed to save log');

            router.push(`/vehicle/${id}`);
        } catch (error) {
            console.error(error);
            alert('Failed to save modification.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 font-sans flex items-center justify-center">
            <div className="w-full max-w-lg bg-[#121212] border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Hammer size={120} />
                </div>

                <div className="mb-8 flex items-center gap-4 relative z-10">
                    <Link href={`/vehicle/${id}`} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">{t('addPart')}</h1>
                        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Build Manifest</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Modification Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-heritage-red/50 transition-colors font-bold uppercase"
                            placeholder="Checking..."
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Category</label>
                            <select
                                name="category"
                                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-heritage-red/50 transition-colors"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="SUSPENSION">Suspension</option>
                                <option value="ARMOR">Armor / Protection</option>
                                <option value="RECOVERY">Recovery Gear</option>
                                <option value="LIGHTING">Lighting</option>
                                <option value="PERFORMANCE">Engine / Performance</option>
                                <option value="INTERIOR">Interior / Storage</option>
                                <option value="WHEELS">Wheels & Tyres</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Brand / Manufacturer</label>
                            <input
                                type="text"
                                name="brand"
                                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-heritage-red/50 transition-colors"
                                placeholder="ARB, Old Man Emu..."
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Cost (LKR)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500 text-xs">Rs.</span>
                                <input
                                    type="number"
                                    name="cost"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded p-3 pl-10 text-white focus:outline-none focus:border-heritage-red/50 transition-colors font-mono"
                                    placeholder="0.00"
                                    value={formData.cost}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Date Installed</label>
                            <input
                                type="date"
                                name="date"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-heritage-red/50 transition-colors"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Notes</label>
                        <textarea
                            name="notes"
                            rows={3}
                            className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-heritage-red/50 transition-colors text-sm"
                            placeholder="Installation details, warranty info..."
                            value={formData.notes}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-heritage-red hover:bg-[#b3161a] text-white font-bold uppercase py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(225,28,33,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? 'Saving...' : <><Save size={18} /> Add Modification</>}
                    </button>
                </form>
            </div>
        </main>
    );
}
