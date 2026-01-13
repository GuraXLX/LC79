"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Fuel, Wrench, AlertTriangle, Car, Map, User, Bell } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';

// Mock Data for Driver View until API connected
const MOCK_DRIVER_VEHICLE = {
    id: 'v1',
    nickname: 'BLAZE',
    plate: 'PI - 8344',
    model: 'Land Cruiser 79',
    odometer: 124500,
    next_service_km: 125000,
    image: 'https://images.unsplash.com/photo-1605218427306-022ba951ddb2?q=80&w=2669&auto=format&fit=crop'
};

export default function DriverDashboard() {
    const { t } = useLanguage();
    const { logout } = useAuth();
    const [status, setStatus] = useState('ON_DUTY'); // ON_DUTY, REST, OFF

    return (
        <main className="min-h-screen bg-[#050505] text-white p-4 font-sans pb-24">
            {/* Mobile Header */}
            <header className="flex justify-between items-center mb-8 pt-2">
                <div>
                    <h1 className="text-xl font-black italic uppercase tracking-tighter text-white">COMMANDER<span className="text-heritage-red">OS</span></h1>
                    <p className="text-[10px] font-mono text-gray-400">OPERATOR: <span className="text-white font-bold">SGT. PERERA</span></p>
                </div>
                <div className="flex gap-3">
                    <button className="relative p-2 bg-[#121212] rounded-full border border-white/10 text-gray-400">
                        <Bell size={18} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-heritage-red rounded-full"></span>
                    </button>
                    <div className="w-10 h-10 bg-gray-800 rounded-full border border-white/20 overflow-hidden">
                        {/* Avatar */}
                        <div className="w-full h-full flex items-center justify-center bg-gray-700 text-xs font-bold">SP</div>
                    </div>
                </div>
            </header>

            {/* Status Toggle */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#121212] rounded-lg border border-white/10 mb-8">
                {['ON_DUTY', 'REST', 'OFF'].map(s => (
                    <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${status === s
                            ? 'bg-heritage-red text-white shadow-lg'
                            : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        {s.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* Primary Vehicle Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group mb-6 aspect-[4/5] shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MOCK_DRIVER_VEHICLE.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>

                <div className="absolute top-4 left-4">
                    <span className="bg-green-500/20 text-green-400 border border-green-500/50 px-2 py-1 rounded text-[10px] font-bold uppercase backdrop-blur-md">
                        ASSIGNED VEHICLE
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent pt-20">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-1 leading-none">{MOCK_DRIVER_VEHICLE.nickname}</h2>
                    <p className="font-mono text-gray-400 text-sm mb-6">{MOCK_DRIVER_VEHICLE.plate} // {MOCK_DRIVER_VEHICLE.model}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/10 backdrop-blur-md rounded p-3 border border-white/5">
                            <p className="text-[10px] text-gray-400 uppercase font-mono">ODOMETER</p>
                            <p className="text-xl font-bold font-mono">{MOCK_DRIVER_VEHICLE.odometer.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded p-3 border border-white/5">
                            <p className="text-[10px] text-gray-400 uppercase font-mono">NEXT SERVICE</p>
                            <div className="flex items-center gap-2">
                                <p className="text-xl font-bold font-mono">{MOCK_DRIVER_VEHICLE.next_service_km.toLocaleString()}</p>
                                <div className="text-[10px] text-yellow-500 bg-yellow-900/40 px-1 rounded flex items-center">
                                    <AlertTriangle size={8} className="mr-1" /> Soon
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <Link href={`/vehicle/${MOCK_DRIVER_VEHICLE.id}/fuel/add`} className="bg-[#121212] border border-white/10 p-5 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#1a1a1a] hover:border-heritage-red/50 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-blue-900/20 text-blue-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <Fuel size={24} />
                    </div>
                    <span className="font-bold uppercase text-sm">Log Fuel</span>
                </Link>

                <Link href={`/vehicle/${MOCK_DRIVER_VEHICLE.id}/service/add`} className="bg-[#121212] border border-white/10 p-5 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#1a1a1a] hover:border-heritage-red/50 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-yellow-900/20 text-yellow-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <Wrench size={24} />
                    </div>
                    <span className="font-bold uppercase text-sm">Maintenance</span>
                </Link>

                <button className="bg-[#121212] border border-white/10 p-5 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#1a1a1a] hover:border-heritage-red/50 transition-all group opacity-50 cursor-not-allowed">
                    <div className="w-12 h-12 rounded-full bg-green-900/20 text-green-400 flex items-center justify-center mb-1">
                        <Map size={24} />
                    </div>
                    <span className="font-bold uppercase text-sm">Start Trip</span>
                </button>

                <button className="bg-[#121212] border border-white/10 p-5 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#1a1a1a] hover:border-heritage-red/50 transition-all group opacity-50 cursor-not-allowed">
                    <div className="w-12 h-12 rounded-full bg-red-900/20 text-red-500 flex items-center justify-center mb-1">
                        <AlertTriangle size={24} />
                    </div>
                    <span className="font-bold uppercase text-sm">Report Issue</span>
                </button>
            </div>

            {/* Bottom Nav - Driver Specific */}
            <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 p-4 pb-6 flex justify-around z-50">
                <button className="flex flex-col items-center gap-1 text-heritage-red">
                    <Car size={20} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">My Vehicle</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
                    <Map size={20} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Trips</span>
                </button>
                <button onClick={logout} className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
                    <User size={20} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Logout</span>
                </button>
            </div>

        </main>
    );
}
