"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Car, Users, Fuel, FileText, ChevronRight, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

// Mock Data for Demo
const VEHICLES = [
  {
    id: 'v1',
    name: 'LC79 "IRON HIDE"',
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
  const { role } = useAuth();
  const [vehicles, setVehicles] = useState(VEHICLES);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-12">
      {/* Header */}
      <header className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2">MY <span className="text-heritage-red">FLEET</span></h1>
          <p className="font-mono text-sm text-gray-500 uppercase tracking-widest">
            {role === 'COMMANDER' ? 'COMMANDER MODE // ADMIN ACCESS' : 'OPERATOR VIEW'}
          </p>
        </div>
        <button className="bg-heritage-red hover:bg-[#b3161a] text-white px-6 py-3 rounded font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(225,28,33,0.3)]">
          <Plus size={18} /> Add Vehicle
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:border-white/20 transition-all">
          <Car className="text-heritage-red mb-2" size={24} />
          <p className="text-2xl font-black">02</p>
          <p className="text-[10px] font-mono opacity-50 uppercase">Total Vehicles</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:border-white/20 transition-all">
          <Users className="text-high-vis-yellow mb-2" size={24} />
          <p className="text-2xl font-black">01</p>
          <p className="text-[10px] font-mono opacity-50 uppercase">Active Drivers</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:border-white/20 transition-all">
          <FileText className="text-blue-500 mb-2" size={24} />
          <p className="text-2xl font-black">OK</p>
          <p className="text-[10px] font-mono opacity-50 uppercase">Doc Compliance</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded hover:border-white/20 transition-all">
          <Fuel className="text-green-500 mb-2" size={24} />
          <p className="text-2xl font-black">54k</p>
          <p className="text-[10px] font-mono opacity-50 uppercase">Mnthly Fuel (LKR)</p>
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
            <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${v.image})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${v.status === 'ACTIVE' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
                  {v.status}
                </span>
              </div>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-black italic uppercase tracking-tight">{v.name}</h2>
                <p className="text-xs font-mono opacity-70">{v.year} {v.make} {v.model}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] font-mono opacity-40 uppercase">License Plate</p>
                  <p className="font-bold font-mono">{v.plate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono opacity-40 uppercase">Assigned Driver</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    <p className="font-bold">{v.driver}</p>
                  </div>
                </div>
              </div>

              {/* Fuel & Service */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-mono opacity-50">FUEL LEVEL</span>
                  <span className="font-bold">{v.fuel}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${v.fuel < 20 ? 'bg-heritage-red' : 'bg-white'}`}
                    style={{ width: `${v.fuel}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-[10px] pt-1">
                  <span className="opacity-40">NEXT SERVICE IN</span>
                  <span className="text-high-vis-yellow font-bold font-mono">{v.nextService}</span>
                </div>
              </div>

              {/* Actions */}
              {/* Actions */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <Link href={`/vehicle/${v.id}`} className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded flex flex-col items-center justify-center gap-1 group">
                  <Fuel size={16} className="text-gray-400 group-hover:text-white" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">Add Fuel</span>
                </Link>
                <Link href={`/vehicle/${v.id}`} className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded flex flex-col items-center justify-center gap-1 group">
                  <FileText size={16} className="text-gray-400 group-hover:text-white" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">Docs</span>
                </Link>
                <Link href={`/vehicle/${v.id}`} className="py-3 bg-heritage-red/10 border border-heritage-red/30 hover:bg-heritage-red/20 rounded flex flex-col items-center justify-center gap-1 group text-heritage-red">
                  <Settings size={16} />
                  <span className="text-[8px] font-bold uppercase tracking-widest">Manage</span>
                </Link>
              </div>
            </div>

          </motion.div>
        ))}

        {/* Add New Placeholder */}
        <button className="border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-4 text-white/20 hover:text-heritage-red hover:border-heritage-red/40 hover:bg-heritage-red/5 transition-all min-h-[400px]">
          <Plus size={48} />
          <span className="font-black italic text-xl uppercase">Register Vehicle</span>
        </button>
      </div>

    </main>
  );
}
