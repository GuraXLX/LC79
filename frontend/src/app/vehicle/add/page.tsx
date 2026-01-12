"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Car, Hash, Calendar, Upload } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function AddVehicle() {
    const router = useRouter();
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push('/');
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 font-sans flex flex-col items-center">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <header className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">{t('registerTitle')}</h1>
                        <p className="font-mono text-gray-500 text-sm">{t('registerSubtitle')}</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-[#121212] border border-white/10 p-8 rounded-lg space-y-6">

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('nickname')}</label>
                            <input type="text" placeholder='e.g. "THE BEAST"' className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:border-heritage-red outline-none font-black italic text-lg uppercase placeholder:not-italic placeholder:text-base placeholder:normal-case placeholder:font-normal" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('make')}</label>
                                <div className="relative">
                                    <Car className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <select className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none appearance-none font-bold uppercase">
                                        <option>Toyota</option>
                                        <option>Land Rover</option>
                                        <option>Nissan</option>
                                        <option>Mitsubishi</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('model')}</label>
                                <input type="text" placeholder="e.g. Land Cruiser 79" className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:border-heritage-red outline-none font-bold uppercase placeholder:normal-case placeholder:font-normal" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('year')}</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <input type="number" placeholder="2024" className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none font-bold uppercase font-mono" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('licensePlate')}</label>
                                <div className="relative">
                                    <Hash className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <input type="text" placeholder="CAB-xxxx" className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none font-bold uppercase font-mono" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('vehicleImage')}</label>
                            <div
                                onClick={() => document.getElementById('vehicle-image-input')?.click()}
                                className="border-2 border-dashed border-white/10 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all cursor-pointer bg-black/50 relative overflow-hidden group"
                            >
                                {previewUrl ? (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                                        <div className="relative z-10 flex flex-col items-center">
                                            <Upload size={32} className="mb-2 text-white" />
                                            <span className="text-sm font-bold text-white">{t('changePhoto')}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={32} className="mb-2" />
                                        <span className="text-sm font-bold">{t('dragDrop')}</span>
                                        <span className="text-[10px] mono mt-1 opacity-50">JPG, PNG, OR HEIC</span>
                                    </>
                                )}
                                <input
                                    id="vehicle-image-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setImageFile(file);
                                            const url = URL.createObjectURL(file);
                                            setPreviewUrl(url);
                                        }
                                    }}
                                />
                            </div>
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-heritage-red hover:bg-[#b3161a] text-white py-4 rounded font-bold text-lg uppercase tracking-widest shadow-[0_4px_20px_rgba(225,28,33,0.3)] flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="animate-pulse">{t('registering')}</span>
                        ) : (
                            <>
                                <Save size={20} /> {t('confirmRegistration')}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
