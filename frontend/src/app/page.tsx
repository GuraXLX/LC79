"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Car, Users, Fuel, FileText, Settings, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';

// Mock Data for Demo
const VEHICLES = [
  {
    id: 'v1',
    name: 'LC79 "IRON HIDE"',
    nickname: 'BLAZE',
    make: 'Toyota',
    model: 'Land Cruiser 79 Single Cab',
    year: 2024,
    plate: 'CAB-8821',
    status: 'ACTIVE',
    driver: 'Self (Owner)',
    fuel: 82,
    image: 'https://images.unsplash.com/photo-1605218427306-022ba951ddb2?q=80&w=2669&auto=format&fit=crop',
    nextService: '1,200 km'
  },
  {
    id: 'v2',
    name: 'FAMILY SUV',
    nickname: 'FAMILY BUS',
    make: 'Toyota',
    model: 'Prado 150',
    year: 2018,
    plate: 'CAT-1022',
    status: 'ON TRIP',
    driver: 'Udaya (Driver)',
    fuel: 45,
    image: 'https://images.unsplash.com/photo-1594235372071-7d12f45ea07e?q=80&w=2669&auto=format&fit=crop',
    nextService: '4,500 km'
  }
];

export default function FleetDashboard() {
  const { t, language, setLanguage } = useLanguage();
  const { user, role, logout } = useAuth();
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/vehicles`)
      .then(res => res.json())
      .then(data => setVehicles(data))
      .catch(err => console.error(err));
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'SI' : 'EN');
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 border-b border-white/10 pb-6 gap-6 md:gap-0">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="relative w-16 h-16">
            <Image src="/logo.png" alt="Vanguard Logo" fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-1 relative">
              {t('appTitle')} <span className="text-heritage-red text-2xl absolute top-0 -right-6">®</span>
            </h1>
            <div className="flex items-center gap-3">
              <p className="font-mono text-[10px] md:text-xs text-heritage-red font-bold uppercase tracking-[0.3em] pl-1">
                {t('appSubtitle')}
              </p>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${role === 'COMMANDER' ? 'bg-heritage-red text-white' : 'bg-blue-600 text-white'}`}>
                {role === 'COMMANDER' ? t('commanderMode') : t('operatorView')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded hover:bg-white/5 transition-all text-xs font-mono font-bold"
          >
            <Globe size={14} /> {language === 'EN' ? 'සිංහල' : 'ENGLISH'}
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 border border-white/10 rounded hover:bg-red-900/20 hover:text-red-400 transition-all text-xs font-mono font-bold uppercase"
          >
            Log Out
          </button>

          {role === 'COMMANDER' && (
            <>
              <Link href="/settings" className="px-4 py-2 border border-white/10 rounded hover:bg-white/10 transition-all text-white flex items-center gap-2">
                <Settings size={18} /> <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">Settings</span>
              </Link>
              <Link href="/driver" className="px-4 py-2 bg-blue-900/50 border border-blue-500/30 rounded hover:bg-blue-900/80 transition-all text-blue-200 flex items-center gap-2">
                <Car size={18} /> <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">Driver View (Demo)</span>
              </Link>
              <Link href="/vehicle/add" className="bg-heritage-red hover:bg-[#b3161a] text-white px-6 py-3 rounded font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(225,28,33,0.3)]">
                <Plus size={18} /> {t('addVehicle')}
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:border-white/20 transition-all">
          <Car className="text-heritage-red mb-2" size={24} />
          <p className="text-2xl font-black">02</p>
          <p className="text-[10px] font-mono opacity-50 uppercase">{t('totalVehicles')}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:border-white/20 transition-all">
          <Users className="text-high-vis-yellow mb-2" size={24} />
          <p className="text-2xl font-black">01</p>
          <p className="text-[10px] font-mono opacity-50 uppercase">{t('activeDrivers')}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:border-white/20 transition-all">
          <FileText className="text-blue-500 mb-2" size={24} />
          <p className="text-2xl font-black">OK</p>
          <p className="text-[10px] font-mono opacity-50 uppercase">{t('docCompliance')}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:border-white/20 transition-all">
          <Fuel className="text-green-500 mb-2" size={24} />
          <p className="text-2xl font-black">54k</p>
          <p className="text-[10px] font-mono opacity-50 uppercase">{t('monthlyFuel')}</p>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {vehicles.map((v) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-[#121212] border border-white/10 rounded-lg overflow-hidden hover:border-heritage-red/50 transition-all"
          >
            {/* Vehicle Image - Hero */}
            <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${v.image || 'https://images.unsplash.com/photo-1594235372071-7d12f45ea07e?q=80&w=2669&auto=format&fit=crop'})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${v.status === 'ACTIVE' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
                  {v.status || 'ACTIVE'}
                </span>
              </div>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-black italic uppercase tracking-tight">{v.nickname || 'Unknown'}</h2>
                <p className="text-xs font-mono opacity-70">{v.year} {v.model_type}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] font-mono opacity-40 uppercase">{t('licensePlate')}</p>
                  <p className="font-bold font-mono">{v.license_plate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono opacity-40 uppercase">{t('assignedDriver')}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${v.assigned_driver ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <p className="font-bold">{v.assigned_driver ? v.assigned_driver.name : 'UNASSIGNED'}</p>
                  </div>
                </div>
              </div>

              {/* Fuel & Service */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-mono opacity-50">{t('fuelLevel')}</span>
                  <span className="font-bold">{v.fuel_logs?.[0]?.liters ? 'Recorded' : 'N/A'}</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-heritage-red"
                    style={{ width: '100%' }} // Placeholder until we have IOT fuel data
                  ></div>
                </div>
                <div className="flex justify-between items-center text-[10px] pt-1">
                  <span className="opacity-40">{t('nextServiceIn')}</span>
                  <span className="text-high-vis-yellow font-bold font-mono">{v.odometer_km ? `${(v.odometer_km + 5000).toLocaleString()} km` : 'N/A'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <Link href={`/vehicle/${v.id}`} className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded flex flex-col items-center justify-center gap-1 group">
                  <Fuel size={16} className="text-gray-400 group-hover:text-white" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">{t('addFuel')}</span>
                </Link>
                <Link href={`/vehicle/${v.id}`} className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded flex flex-col items-center justify-center gap-1 group">
                  <FileText size={16} className="text-gray-400 group-hover:text-white" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">{t('docs')}</span>
                </Link>
                <Link href={`/vehicle/${v.id}`} className="py-3 bg-heritage-red/10 border border-heritage-red/30 hover:bg-heritage-red/20 rounded flex flex-col items-center justify-center gap-1 group text-heritage-red">
                  <Settings size={16} />
                  <span className="text-[8px] font-bold uppercase tracking-widest">{t('manage')}</span>
                </Link>
              </div>
            </div>

          </motion.div>
        ))}

        {/* Add New Placeholder */}
        {role === 'COMMANDER' && (
          <Link href="/vehicle/add" className="border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-4 text-white/20 hover:text-heritage-red hover:border-heritage-red/40 hover:bg-heritage-red/5 transition-all min-h-[400px]">
            <Plus size={48} />
            <span className="font-black italic text-xl uppercase">{t('registerVehicle')}</span>
          </Link>
        )}
      </div>

    </main>
  );
}
