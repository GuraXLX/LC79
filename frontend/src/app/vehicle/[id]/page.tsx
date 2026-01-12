"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Fuel, FileText, Wrench, Calendar,
    Upload, Plus, AlertCircle, Car, Hammer
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { supabase } from '@/lib/supabaseClient';

interface Vehicle {
    id: string;
    nickname: string | null;
    license_plate: string;
    model_type: string;
    vin: string;
    odometer_km: number;
    profile_photo_url: string | null;
    fuel_logs: any[];
    service_logs: any[];
    documents: any[];
    // Computed/Mocked until backend supports
    total_fuel_cost?: number;
    service_spend?: number;
    avg_kml?: number;
}

export default function VehicleManager() {
    const params = useParams();
    const { t } = useLanguage();
    const id = params.id as string;
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FUEL' | 'DOCS' | 'SERVICE' | 'MODS'>('OVERVIEW');
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchVehicle = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/vehicles/${id}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();

            // Calculate computed metrics
            const total_fuel_cost = data.fuel_logs?.reduce((acc: number, log: any) => acc + (log.total_lkr || 0), 0) || 0;
            const service_spend = data.service_logs?.reduce((acc: number, log: any) => acc + (log.total_lkr || 0), 0) || 0;

            // Simple Avg KML calc (total Odo / total Liters - very rough estimate)
            const total_liters = data.fuel_logs?.reduce((acc: number, log: any) => acc + (log.liters || 0), 0) || 1;
            const avg_kml = total_liters > 0 ? (data.odometer_km / total_liters).toFixed(1) : 0;

            setVehicle({ ...data, total_fuel_cost, service_spend, avg_kml });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicle();
    }, [id]);

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${id}-${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('vehicle-photos')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('vehicle-photos')
                .getPublicUrl(fileName);

            // Update backend
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/vehicles/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profile_photo_url: publicUrl })
            });

            // Refresh local state
            fetchVehicle();
            alert('✅ Photo updated!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('❌ Upload failed');
        }
    };

    if (loading) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">LOADING DATA...</div>;
    if (!vehicle) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">VEHICLE NOT FOUND</div>;

    const bgImage = vehicle.profile_photo_url || 'https://images.unsplash.com/photo-1605218427306-022ba951ddb2?q=80&w=2669&auto=format&fit=crop';

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 font-sans">
            {/* Header */}
            <header className="relative mb-8 rounded-2xl overflow-hidden border border-white/10 group min-h-[300px]">
                {/* Background Image / Banner */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${bgImage})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>

                <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-end gap-6 justify-between h-full min-h-[300px]">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-4 w-full mt-auto">
                        <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors mb-2 md:mb-0 text-white/80 hover:text-white">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-2">{vehicle.nickname || vehicle.model_type}</h1>
                                <span className="px-2 py-0.5 bg-green-900/80 backdrop-blur-sm text-green-300 text-[10px] font-bold rounded uppercase border border-green-500/30">Active</span>
                            </div>
                            <p className="font-mono text-gray-400 text-xs md:text-sm bg-black/50 px-3 py-1 rounded inline-block backdrop-blur-md border border-white/5">
                                {vehicle.model_type} {'//'} {vehicle.license_plate} {'//'} {vehicle.vin}
                            </p>
                        </div>
                    </div>

                    {/* Photo Update Action */}
                    <div className="mt-auto">
                        <button
                            onClick={() => document.getElementById('vehicle-header-upload')?.click()}
                            className="flex items-center gap-2 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-white/30 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all text-gray-300 hover:text-white shrink-0 group/btn cursor-pointer"
                        >
                            <Upload size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                            <span className="hidden md:inline">{t('updatePhoto')}</span>
                        </button>
                        <input
                            id="vehicle-header-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                        />
                    </div>
                </div>
            </header>

            {/* Mobile Scrollable Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
                {[
                    { id: 'OVERVIEW', icon: Car, label: t('overview') },
                    { id: 'FUEL', icon: Fuel, label: t('fuelLog') },
                    { id: 'DOCS', icon: FileText, label: t('documents') },
                    { id: 'SERVICE', icon: Wrench, label: t('maintenance') },
                    { id: 'MODS', icon: Hammer, label: t('mods') }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-3 rounded font-bold uppercase tracking-wider text-[10px] md:text-xs transition-all whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                            ? 'bg-heritage-red text-white shadow-[0_4px_12px_rgba(225,28,33,0.3)]'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <tab.icon size={14} /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="max-w-4xl">

                {/* FUEL TAB */}
                {activeTab === 'FUEL' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{t('fuelHistory')}</h2>
                            <Link
                                href={`/vehicle/${id}/fuel/add`}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-xs font-bold uppercase transition-colors"
                            >
                                <Plus size={14} /> {t('addLog')}
                            </Link>
                        </div>
                        <div className="bg-[#121212] border border-white/10 rounded overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm min-w-[500px]">
                                    <thead className="bg-white/5 text-gray-500 font-mono text-xs uppercase">
                                        <tr>
                                            <th className="p-4">{t('date')}</th>
                                            <th className="p-4">{t('station')}</th>
                                            <th className="p-4">{t('liters')}</th>
                                            <th className="p-4 text-right">{t('cost')} (LKR)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {vehicle.fuel_logs?.map((log) => (
                                            <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 font-mono">{new Date(log.date).toLocaleDateString()}</td>
                                                <td className="p-4">{log.station_name || '-'}</td>
                                                <td className="p-4 font-bold">{log.liters} L</td>
                                                <td className="p-4 text-right font-mono text-heritage-red">Rs. {log.total_lkr.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                        {(!vehicle.fuel_logs || vehicle.fuel_logs.length === 0) && (
                                            <tr><td colSpan={4} className="p-4 text-center text-gray-500 opacity-50">No logs found</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* DOCUMENTS TAB */}
                {activeTab === 'DOCS' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{t('filesCompliance')}</h2>
                            <Link
                                href={`/vehicle/${id}/docs/upload`}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-xs font-bold uppercase transition-colors"
                            >
                                <Upload size={14} /> {t('upload')}
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {vehicle.documents?.map((doc) => (
                                <div key={doc.id} className="p-4 bg-[#121212] border border-white/10 rounded flex justify-between items-start hover:border-white/30 transition-all">
                                    <div className="flex gap-3">
                                        <FileText className="text-gray-500" />
                                        <div>
                                            <p className="font-bold">{doc.document_type || 'Document'}</p>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                <Calendar size={10} /> {new Date(doc.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <Link href={doc.file_url || '#'} target="_blank" className="text-[10px] font-bold px-2 py-1 rounded uppercase bg-blue-900/30 text-blue-400">
                                        VIEW
                                    </Link>
                                </div>
                            ))}
                            {(!vehicle.documents || vehicle.documents.length === 0) && (
                                <div className="col-span-2 text-center text-gray-500 py-8 opacity-50">No documents uploaded</div>
                            )}
                        </div>
                    </div>
                )}

                {/* SERVICE TAB */}
                {activeTab === 'SERVICE' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{t('serviceLog')}</h2>
                            <Link
                                href={`/vehicle/${id}/service/add`}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-xs font-bold uppercase transition-colors"
                            >
                                <Plus size={14} /> {t('logService')}
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {vehicle.service_logs?.map(service => (
                                <div key={service.id} className="p-4 bg-[#121212] border-l-2 border-l-heritage-red rounded flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lg">{service.service_type}</p>
                                        <p className="text-xs text-gray-500 mono">{new Date(service.date).toLocaleDateString()} {'//'} {service.parts_source}</p>
                                    </div>
                                    <p className="font-mono text-heritage-red font-bold">Rs. {service.total_lkr.toLocaleString()}</p>
                                </div>
                            ))}
                            {(!vehicle.service_logs || vehicle.service_logs.length === 0) && (
                                <div className="text-center text-gray-500 py-8 opacity-50">No service records</div>
                            )}
                        </div>
                    </div>
                )}

                {/* MODS TAB - Placeholder for now as API doesn't support explicit Mods table yet */}
                {activeTab === 'MODS' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-0 mb-6">
                            <div>
                                <h2 className="text-xl font-bold">{t('buildMods')}</h2>
                                <p className="text-xs text-text-gray-400 font-mono">Coming Soon</p>
                            </div>
                        </div>
                        <div className="text-center text-gray-500 py-8 opacity-50">Mods module currently in development</div>
                    </div>
                )}

                {/* OVERVIEW TAB - DASHBOARD STYLE */}
                {activeTab === 'OVERVIEW' && (
                    <div className="space-y-6 animate-fade-in">

                        {/* ROW 1: Vehicle Info & Odometer */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Vehicle Details */}
                            <div className="tactical-card space-y-4">
                                <h3 className="text-xs font-bold bg-white/10 px-2 py-1 rounded inline-block uppercase tracking-wider mb-2">{t('vehicleIdentity')}</h3>
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono opacity-50 uppercase">{t('nickname')}</p>
                                        <p className="font-black italic text-xl text-heritage-red uppercase">{vehicle.nickname || '-'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono opacity-50 uppercase">{t('licensePlate')}</p>
                                        <p className="font-bold font-mono">{vehicle.license_plate}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono opacity-50 uppercase">{t('makeModel')}</p>
                                        <p className="font-bold">{vehicle.model_type}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono opacity-50 uppercase">{t('fuelType')}</p>
                                        <p className="font-bold">Diesel</p>
                                    </div>
                                </div>
                            </div>

                            {/* Odometer & Stats */}
                            <div className="space-y-6">
                                {/* Current Odo */}
                                <div className="tactical-card flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('currentOdo')}</p>
                                        <p className="text-4xl font-black font-mono tracking-tight">{vehicle.odometer_km.toLocaleString()}</p>
                                    </div>
                                    <Car className="text-white/20" size={48} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#121212] border border-white/10 p-4 rounded">
                                        <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('totalLogged')}</p>
                                        <p className="text-xl font-bold font-mono">{(vehicle.fuel_logs?.length || 0)} Entries</p>
                                    </div>
                                    <div className="bg-[#121212] border border-white/10 p-4 rounded">
                                        <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('avgKml')}</p>
                                        <p className="text-xl font-bold font-mono text-high-vis-yellow">{vehicle.avg_kml || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ROW 2: Financials */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[#121212] border border-white/10 p-4 rounded hover:border-heritage-red/30 transition-all">
                                <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('totalFuelCost')}</p>
                                <p className="text-xl font-bold font-mono">LKR {vehicle.total_fuel_cost?.toLocaleString()}</p>
                            </div>
                            <div className="bg-[#121212] border border-white/10 p-4 rounded hover:border-heritage-red/30 transition-all">
                                <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('serviceSpend')}</p>
                                <p className="text-xl font-bold font-mono">LKR {vehicle.service_spend?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
