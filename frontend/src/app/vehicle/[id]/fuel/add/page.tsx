"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Fuel, Save, Calendar, Hash, MapPin, DollarSign } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function AddFuelLog() {
    const router = useRouter();
    const params = useParams();
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        odometer: '',
        station_name: '',
        liters: '',
        total_lkr: '',
        fuel_type: 'Diesel' // Default
    });

    const calculatePrice = (liters: string, total: string) => {
        const l = parseFloat(liters);
        const t = parseFloat(total);
        if (l > 0 && t > 0) return (t / l).toFixed(2);
        return '0.00';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/fuel-logs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vehicle_id: params.id,
                    date: formData.date,
                    odometer: parseFloat(formData.odometer),
                    station_name: formData.station_name,
                    liters: parseFloat(formData.liters),
                    total_lkr: parseFloat(formData.total_lkr),
                    price_per_liter: parseFloat(calculatePrice(formData.liters, formData.total_lkr)),
                    fuel_type: formData.fuel_type
                })
            });

            if (!res.ok) throw new Error('Failed to add fuel log');

            alert('✅ Fuel Logged!');
            router.push(`/vehicle/${params.id}`);
        } catch (error) {
            console.error(error);
            alert('❌ Failed to save log');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 font-sans flex flex-col items-center">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <header className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                    <Link href={`/vehicle/${params.id}`} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">{t('addLog')}</h1>
                        <p className="font-mono text-gray-500 text-sm">FUEL ENTRY // {params.id}</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-[#121212] border border-white/10 p-8 rounded-lg space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('date')}</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none font-mono"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('currentOdo')}</label>
                                <div className="relative">
                                    <Hash className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <input
                                        type="number"
                                        placeholder="150000"
                                        required
                                        value={formData.odometer}
                                        onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('station')}</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                <input
                                    type="text"
                                    placeholder="e.g. CEYPETCO - Colombo 07"
                                    value={formData.station_name}
                                    onChange={(e) => setFormData({ ...formData, station_name: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none font-bold uppercase"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('liters')}</label>
                                <div className="relative">
                                    <Fuel className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="45.00"
                                        required
                                        value={formData.liters}
                                        onChange={(e) => setFormData({ ...formData, liters: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none font-mono text-xl font-bold"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('cost')} (LKR)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <input
                                        type="number"
                                        placeholder="15000"
                                        required
                                        value={formData.total_lkr}
                                        onChange={(e) => setFormData({ ...formData, total_lkr: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none font-mono text-xl font-bold text-heritage-red"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Auto-Calculated Price Per Liter Display */}
                        <div className="text-right text-xs font-mono text-gray-500">
                            RATE: {calculatePrice(formData.liters, formData.total_lkr)} LKR/L
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black hover:bg-gray-200 py-4 rounded font-bold text-lg uppercase tracking-widest shadow-[0_4px_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="animate-pulse">SAVING...</span>
                        ) : (
                            <>
                                <Save size={20} /> SAVE FUEL ENTRY
                            </>
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
