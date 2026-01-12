"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, Save, Calendar, FileText } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function UploadDocument() {
    const router = useRouter();
    const params = useParams();
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

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
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">{t('upload')}</h1>
                        <p className="font-mono text-gray-500 text-sm">COMPLIANCE // {params.id}</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-[#121212] border border-white/10 p-8 rounded-lg space-y-6">

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Document Type</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                <select className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none appearance-none font-bold uppercase">
                                    <option>Revenue License</option>
                                    <option>Insurance Certificate</option>
                                    <option>Emission Test Report</option>
                                    <option>Fitness Certificate</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('expires')}</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                <input type="date" className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-heritage-red outline-none font-mono" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">File</label>
                            <div
                                onClick={() => document.getElementById('doc-upload')?.click()}
                                className="border-2 border-dashed border-white/10 rounded-lg p-12 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all cursor-pointer bg-black/50"
                            >
                                <Upload size={32} className="mb-2" />
                                <span className="text-sm font-bold">{file ? file.name : t('dragDrop')}</span>
                                <span className="text-[10px] mono mt-1 opacity-50">PDF OR IMAGE</span>
                                <input
                                    id="doc-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                            </div>
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading || !file}
                        className="w-full bg-white text-black hover:bg-gray-200 py-4 rounded font-bold text-lg uppercase tracking-widest shadow-[0_4px_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="animate-pulse">UPLOADING...</span>
                        ) : (
                            <>
                                <Save size={20} /> SAVE DOCUMENT
                            </>
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
