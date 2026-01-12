"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Fuel, FileText, Wrench, Calendar,
    Upload, Plus, AlertCircle, CheckCircle, Car
} from 'lucide-react';

const MOCK_DATA = {
    'v1': {
        name: 'LC79 "IRON HIDE"',
        plate: 'CAB-8821',
        make: 'Toyota',
        model: 'Land Cruiser 79',
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
        ]
    }
};

export default function VehicleManager() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FUEL' | 'DOCS' | 'SERVICE'>('OVERVIEW');

    // Fallback for demo if ID doesn't match mock
    const vehicle = MOCK_DATA[id as keyof typeof MOCK_DATA] || MOCK_DATA['v1'];

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 font-sans">
            {/* Header */}
            <header className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">{vehicle.name}</h1>
                        <span className="px-2 py-0.5 bg-green-900 text-green-300 text-[10px] font-bold rounded uppercase">Active</span>
                    </div>
                    <p className="font-mono text-gray-500 text-sm">{vehicle.make} {vehicle.model} // {vehicle.plate}</p>
                </div>
            </header>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {[
                    { id: 'OVERVIEW', icon: Car, label: 'Overview' },
                    { id: 'FUEL', icon: Fuel, label: 'Fuel Log' },
                    { id: 'DOCS', icon: FileText, label: 'Documents' },
                    { id: 'SERVICE', icon: Wrench, label: 'Maintenance' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-3 rounded font-bold uppercase tracking-wider text-xs transition-all ${activeTab === tab.id
                                ? 'bg-heritage-red text-white shadow-[0_4px_12px_rgba(225,28,33,0.3)]'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="max-w-4xl">

                {/* FUEL TAB */}
                {activeTab === 'FUEL' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Fuel History</h2>
                            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-xs font-bold uppercase transition-colors">
                                <Plus size={14} /> Add Log
                            </button>
                        </div>
                        <div className="bg-[#121212] border border-white/10 rounded overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-gray-500 font-mono text-xs uppercase">
                                    <tr>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Station</th>
                                        <th className="p-4">Liters</th>
                                        <th className="p-4 text-right">Cost (LKR)</th>
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
                )}

                {/* DOCUMENTS TAB */}
                {activeTab === 'DOCS' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Files & Compliance</h2>
                            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-xs font-bold uppercase transition-colors">
                                <Upload size={14} /> Upload
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {vehicle.documents.map((doc) => (
                                <div key={doc.id} className="p-4 bg-[#121212] border border-white/10 rounded flex justify-between items-start hover:border-white/30 transition-all">
                                    <div className="flex gap-3">
                                        <FileText className="text-gray-500" />
                                        <div>
                                            <p className="font-bold">{doc.type}</p>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                <Calendar size={10} /> Expires: {doc.expiry}
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
                            <h2 className="text-xl font-bold">Service Log</h2>
                            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-xs font-bold uppercase transition-colors">
                                <Plus size={14} /> Log Service
                            </button>
                        </div>
                        <div className="space-y-4">
                            {vehicle.service_history.map(service => (
                                <div key={service.id} className="p-4 bg-[#121212] border-l-2 border-l-heritage-red rounded flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lg">{service.type}</p>
                                        <p className="text-xs text-gray-500 mono">{service.date} // {service.location}</p>
                                    </div>
                                    <p className="font-mono text-heritage-red font-bold">Rs. {service.cost.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* OVERVIEW TAB */}
                {activeTab === 'OVERVIEW' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                        <div className="tactical-card">
                            <h3 className="text-sm font-mono opacity-50 mb-4">COST OF OWNERSHIP (YTD)</h3>
                            <p className="text-4xl font-black italic">Rs. 148,200</p>
                            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden flex">
                                <div className="h-full bg-heritage-red w-[40%]" title="Fuel"></div>
                                <div className="h-full bg-blue-500 w-[60%]" title="Maintenance"></div>
                            </div>
                            <div className="flex gap-4 mt-2 text-[10px] mono">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-heritage-red rounded-full"></div> FUEL</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> MAINT</span>
                            </div>
                        </div>

                        <div className="tactical-card items-center justify-center flex flex-col text-center">
                            <CheckCircle size={48} className="text-green-500 mb-4" />
                            <h3 className="text-xl font-bold">ALL SYSTEMS GO</h3>
                            <p className="text-xs text-gray-500 mt-2">No pending issues. Next service in 800km.</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
