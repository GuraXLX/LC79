"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Fuel, FileText, Wrench, Calendar,
    Upload, Plus, AlertCircle, Car, Hammer
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const MOCK_DATA = {
    'v1': {
        id: 'v1',
        nickname: 'BLAZE',
        name: 'LC79 "IRON HIDE"',
        plate: 'PI - 8344',
        image: 'https://images.unsplash.com/photo-1605218427306-022ba951ddb2?q=80&w=2669&auto=format&fit=crop',
        make: 'Toyota',
        model: 'Land Cruiser 79',
        year: 2024,
        fuel_type: 'Diesel',
        currency: 'LKR',
        odometer: 124500,
        total_km_logged: 12000,
        avg_kml: 8.4,
        total_fuel_cost: 245000,
        service_spend: 39500,
        next_normal_service: {
            due_km: 125000,
            due_date: '2024-04-15'
        },
        next_major_service: {
            due_km: 140000,
            due_date: '2024-12-01'
        },
        reminders: {
            count: 2,
            overdue_date: 0,
            overdue_odo: 0
        },
        fuel_logs: [
            { id: 1, date: '2024-03-10', odo: 124500, liters: 45, cost: 18500, station: 'Ceypetco Anuradhapura' },
            { id: 2, date: '2024-03-01', odo: 124100, liters: 60, cost: 24000, station: 'IOC Colombo' },
        ],
        documents: [
            { id: 1, type: 'Revenue License', expiry: '2024-12-31', status: 'VALID' },
            { id: 2, type: 'Insurance Policy', expiry: '2024-06-15', status: 'EXPIRING_SOON' },
            { id: 3, type: 'Emission Test', expiry: '2024-12-30', status: 'VALID' },
        ],
        service_history: [
            { id: 1, date: '2024-01-15', type: 'Oil Change (5000km)', cost: 35000, location: 'Toyota Lanka' },
            { id: 2, date: '2023-10-20', type: 'Tyre Rotation', cost: 4500, location: 'Saman Tyre House' }
        ],
        mods: [
            { id: 1, name: 'BP-51 Suspension', category: 'SUSPENSION', brand: 'Old Man Emu', cost: 450000, installed: '2023-12-01' },
            { id: 2, name: 'Summit Bullbar', category: 'ARMOR', brand: 'ARB', cost: 325000, installed: '2023-11-15' },
            { id: 3, name: 'Zeon 10-S Winch', category: 'RECOVERY', brand: 'WARN', cost: 180000, installed: '2023-11-15' }
        ]
    }
};

export default function VehicleManager() {
    const params = useParams();
    const { t } = useLanguage();
    const id = params.id as string;
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FUEL' | 'DOCS' | 'SERVICE' | 'MODS'>('OVERVIEW');

    // Fallback for demo if ID doesn't match mock
    const vehicle = MOCK_DATA[id as keyof typeof MOCK_DATA] || MOCK_DATA['v1'];

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 font-sans">
            {/* Header */}
            <header className="relative mb-8 rounded-2xl overflow-hidden border border-white/10 group">
                {/* Background Image / Banner */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${vehicle.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>

                <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-end gap-6 justify-between">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-4 w-full">
                        <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors mb-2 md:mb-0 text-white/80 hover:text-white">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-2">{vehicle.nickname}</h1>
                                <span className="px-2 py-0.5 bg-green-900/80 backdrop-blur-sm text-green-300 text-[10px] font-bold rounded uppercase border border-green-500/30">Active</span>
                            </div>
                            <p className="font-mono text-gray-400 text-xs md:text-sm bg-black/50 px-3 py-1 rounded inline-block backdrop-blur-md border border-white/5">
                                {vehicle.make} {vehicle.model} {'//'} {vehicle.plate}
                            </p>
                        </div>
                    </div>

                    {/* Photo Update Action */}
                    <button
                        onClick={() => document.getElementById('vehicle-header-upload')?.click()}
                        className="flex items-center gap-2 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-white/30 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all text-gray-300 hover:text-white shrink-0 group/btn"
                    >
                        <Upload size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                        <span className="hidden md:inline">{t('updatePhoto')}</span>
                    </button>
                    <input
                        id="vehicle-header-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                alert("Photo upload simulated needs implementation: " + e.target.files[0].name);
                            }
                        }}
                    />
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
                        onClick={() => setActiveTab(tab.id as 'OVERVIEW' | 'FUEL' | 'DOCS' | 'SERVICE' | 'MODS')}
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
                                        {vehicle.fuel_logs.map((log) => (
                                            <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 font-mono">{log.date}</td>
                                                <td className="p-4">{log.station}</td>
                                                <td className="p-4 font-bold">{log.liters} L</td>
                                                <td className="p-4 text-right font-mono text-heritage-red">Rs. {log.cost.toLocaleString()}</td>
                                            </tr>
                                        ))}
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
                            {vehicle.documents.map((doc) => (
                                <div key={doc.id} className="p-4 bg-[#121212] border border-white/10 rounded flex justify-between items-start hover:border-white/30 transition-all">
                                    <div className="flex gap-3">
                                        <FileText className="text-gray-500" />
                                        <div>
                                            <p className="font-bold">{doc.type}</p>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                <Calendar size={10} /> {t('expires')}: {doc.expiry}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${doc.status === 'VALID' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-500'
                                        }`}>
                                        {doc.status === 'EXPIRING_SOON' ? 'Expiring Soon' : 'Valid'}
                                    </span>
                                </div>
                            ))}
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
                            {vehicle.service_history.map(service => (
                                <div key={service.id} className="p-4 bg-[#121212] border-l-2 border-l-heritage-red rounded flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lg">{service.type}</p>
                                        <p className="text-xs text-gray-500 mono">{service.date} {'//'} {service.location}</p>
                                    </div>
                                    <p className="font-mono text-heritage-red font-bold">Rs. {service.cost.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* MODS TAB */}
                {activeTab === 'MODS' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-0 mb-6">
                            <div>
                                <h2 className="text-xl font-bold">{t('buildMods')}</h2>
                                <p className="text-xs text-gray-400 font-mono">{t('totalBuildCost')}: <span className="text-high-vis-yellow font-bold">Rs. {vehicle.mods.reduce((acc, mod) => acc + mod.cost, 0).toLocaleString()}</span></p>
                            </div>
                            <Link
                                href={`/vehicle/${id}/mods/add`}
                                className="flex items-center gap-2 bg-heritage-red hover:bg-[#b3161a] px-4 py-2 rounded text-xs font-bold uppercase transition-colors shadow-[0_0_15px_rgba(225,28,33,0.3)]"
                            >
                                <Plus size={14} /> {t('addPart')}
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {vehicle.mods.map((mod) => (
                                <div key={mod.id} className="group relative bg-[#121212] border border-white/10 hover:border-high-vis-yellow/50 rounded-lg p-4 transition-all overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20">
                                        <Hammer size={40} />
                                    </div>
                                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded uppercase mb-2 inline-block text-gray-400">{mod.category}</span>
                                            <h3 className="text-lg font-black italic uppercase">{mod.name}</h3>
                                            <p className="text-xs font-mono text-gray-500">{mod.brand} {'//'} {t('installed')}: {mod.installed}</p>
                                        </div>
                                        <div className="text-left md:text-right w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
                                            <p className="text-high-vis-yellow font-mono font-bold">Rs. {mod.cost.toLocaleString()}</p>
                                            <span className="text-[10px] uppercase tracking-widest opacity-50">INSTALLED</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                        <p className="font-black italic text-xl text-heritage-red uppercase">{vehicle.nickname}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono opacity-50 uppercase">{t('licensePlate')}</p>
                                        <p className="font-bold font-mono">{vehicle.plate}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono opacity-50 uppercase">{t('makeModel')}</p>
                                        <p className="font-bold">{vehicle.make} - {vehicle.model}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono opacity-50 uppercase">{t('fuelType')}</p>
                                        <p className="font-bold">{vehicle.fuel_type}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Odometer & Stats */}
                            <div className="space-y-6">
                                {/* Current Odo */}
                                <div className="tactical-card flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('currentOdo')}</p>
                                        <p className="text-4xl font-black font-mono tracking-tight">{vehicle.odometer.toLocaleString()}</p>
                                    </div>
                                    <Car className="text-white/20" size={48} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#121212] border border-white/10 p-4 rounded">
                                        <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('totalLogged')}</p>
                                        <p className="text-xl font-bold font-mono">{vehicle.total_km_logged.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-[#121212] border border-white/10 p-4 rounded">
                                        <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('avgKml')}</p>
                                        <p className="text-xl font-bold font-mono text-high-vis-yellow">{vehicle.avg_kml}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ROW 2: Financials */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-[#121212] border border-white/10 p-4 rounded hover:border-heritage-red/30 transition-all">
                                <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('totalFuelCost')}</p>
                                <p className="text-xl font-bold font-mono">{vehicle.currency} {vehicle.total_fuel_cost.toLocaleString()}</p>
                            </div>
                            <div className="bg-[#121212] border border-white/10 p-4 rounded hover:border-heritage-red/30 transition-all">
                                <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('serviceSpend')}</p>
                                <p className="text-xl font-bold font-mono">{vehicle.currency} {vehicle.service_spend.toLocaleString()}</p>
                            </div>
                            <div className="bg-[#121212] border border-white/10 p-4 rounded hover:border-heritage-red/30 transition-all">
                                <p className="text-[10px] font-mono opacity-50 uppercase mb-1">{t('modSpend')}</p>
                                <p className="text-xl font-bold font-mono">{vehicle.currency} {vehicle.mods.reduce((acc, mod) => acc + mod.cost, 0).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* ROW 3: Services & Reminders */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Upcoming Services */}
                            <div className="tactical-card space-y-4">
                                <h3 className="text-xs font-bold bg-white/10 px-2 py-1 rounded inline-block uppercase tracking-wider mb-2">{t('serviceSchedule')}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-white/5 rounded border border-white/5">
                                        <p className="text-[10px] font-bold text-green-400 uppercase mb-2">{t('nextNormal')}</p>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="opacity-50">{t('dueKm')}</span>
                                                <span className="font-mono font-bold">{vehicle.next_normal_service.due_km.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="opacity-50">{t('dueDate')}</span>
                                                <span className="font-mono font-bold">{vehicle.next_normal_service.due_date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded border border-white/5">
                                        <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">{t('nextMajor')}</p>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="opacity-50">Due KM</span>
                                                <span className="font-mono font-bold">{vehicle.next_major_service.due_km.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="opacity-50">Due Date</span>
                                                <span className="font-mono font-bold">{vehicle.next_major_service.due_date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reminders */}
                            <div className="tactical-card space-y-4">
                                <h3 className="text-xs font-bold bg-heritage-red/20 text-heritage-red px-2 py-1 rounded inline-block uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <AlertCircle size={12} /> {t('dueSoon')}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <p className="text-sm font-bold">{t('openReminders')}</p>
                                        <span className="bg-heritage-red text-white text-xs font-bold px-2 py-1 rounded">{vehicle.reminders.count}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] font-mono opacity-50 uppercase">{t('overdueByDate')}</p>
                                            <p className="font-bold text-lg">{vehicle.reminders.overdue_date}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono opacity-50 uppercase">{t('overdueByOdo')}</p>
                                            <p className="font-bold text-lg">{vehicle.reminders.overdue_odo} km</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
