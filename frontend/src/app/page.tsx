"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [gloveMode, setGloveMode] = useState(false);
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-glove-mode', gloveMode.toString());
  }, [gloveMode]);

  return (
    <main className={`min-h-screen p-8 transition-colors duration-500`}>
      {nightMode && <div className="night-mode-overlay" />}

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold italic tracking-tighter">LC79 TACTICAL <span className="text-heritage-red">VMS</span></h1>
          <p className="text-secondary mono uppercase tracking-widest text-xs mt-1">Status: Operational // Sri Lanka District: Colombo</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setGloveMode(!gloveMode)}
            className={`tactical-card px-6 py-3 border-2 transition-all ${gloveMode ? 'border-high-vis-yellow bg-high-vis-yellow/10' : 'border-white/10'}`}
          >
            <span className={`mono text-xs font-bold ${gloveMode ? 'text-high-vis-yellow' : 'text-secondary'}`}>GLOVE MODE: {gloveMode ? 'ON' : 'OFF'}</span>
          </button>
          <button
            onClick={() => setNightMode(!nightMode)}
            className={`tactical-card px-6 py-3 border-2 transition-all ${nightMode ? 'border-heritage-red bg-heritage-red/10' : 'border-white/10'}`}
          >
            <span className={`mono text-xs font-bold ${nightMode ? 'text-heritage-red' : 'text-secondary'}`}>NIGHT MODE: {nightMode ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Tactical Overview */}
        <section className="lg:col-span-2 space-y-8">
          <div className="tactical-card p-8 bg-gradient-to-br from-white/5 to-transparent">
            <h2 className="text-xl mb-6 flex items-center gap-3 font-bold">
              <span className="w-2 h-6 bg-heritage-red block"></span>
              VEHICLE TELEMETRY
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-black/60 rounded-lg border border-white/5 group hover:border-heritage-red/50 transition-colors">
                <p className="text-[10px] text-secondary mono uppercase mb-2">Odometer</p>
                <p className="text-4xl font-black mono italic">124,582 <span className="text-sm italic opacity-40">KM</span></p>
                <div className="mt-4 h-1 w-full bg-white/5 rounded-full">
                  <div className="h-full w-2/3 bg-heritage-red/40"></div>
                </div>
              </div>
              <div className="p-6 bg-black/60 rounded-lg border border-white/5 group hover:border-high-vis-yellow/50 transition-colors">
                <p className="text-[10px] text-secondary mono uppercase mb-2">Engine Hours</p>
                <p className="text-4xl font-black mono italic">4,281 <span className="text-sm italic opacity-40">HRS</span></p>
                <div className="mt-4 h-1 w-full bg-white/5 rounded-full">
                  <div className="h-full w-1/2 bg-high-vis-yellow/40"></div>
                </div>
              </div>
              <div className="p-6 bg-black/60 rounded-lg border border-white/5 group hover:border-blue-500/50 transition-colors">
                <p className="text-[10px] text-secondary mono uppercase mb-2">GVM Utilization</p>
                <p className="text-4xl font-black mono italic">78<span className="text-sm italic opacity-40">%</span></p>
                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[78%] bg-high-vis-yellow"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <button className="heritage-button w-full h-32 text-3xl font-black italic shadow-lg shadow-heritage-red/20 active:translate-y-1 transition-all">
              START TRIP
            </button>
            <Link href="/pre-start" className="w-full">
              <div className="tactical-card w-full h-32 flex flex-col items-center justify-center gap-2 border-high-vis-yellow border-2 hover:bg-high-vis-yellow/5 transition-all text-2xl font-black italic">
                <span className="text-xs mono text-high-vis-yellow animate-pulse font-bold tracking-[0.2em]">MANDATORY</span>
                PRE-START CHECK
              </div>
            </Link>
          </div>
        </section>

        {/* Sidebar Actions */}
        <section className="space-y-8">
          <div className="tactical-card border-none bg-gradient-to-r from-heritage-red/20 to-transparent p-8">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-heritage-red font-black italic text-xl">V-EYE SCANNER</h3>
              <div className="p-2 bg-heritage-red/20 rounded">
                <svg className="w-6 h-6 text-heritage-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm mb-6 opacity-70 leading-relaxed">Instantly digitize fuel receipts, revenue licenses, or parts invoices for Colombo-based tax compliance.</p>
            <button className="heritage-button w-full shadow-lg shadow-black/50">NEW SCAN</button>
          </div>

          <div className="tactical-card p-8 border-white/5 bg-black/40">
            <h3 className="mb-6 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-high-vis-yellow rounded-full"></span>
              QUICK MODULES
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/payload" className="p-4 bg-white/5 rounded border border-white/10 hover:border-high-vis-yellow transition-all group">
                <p className="text-[10px] mono opacity-50 group-hover:text-high-vis-yellow transition-colors">GVM SYS</p>
                <p className="font-bold text-sm">Payload Scientist</p>
              </Link>
              <Link href="/engine-health" className="p-4 bg-white/5 rounded border border-white/10 hover:border-blue-500 transition-all group">
                <p className="text-[10px] mono opacity-50 group-hover:text-blue-500 transition-colors">HEALTH</p>
                <p className="font-bold text-sm">Engine Health</p>
              </Link>
              <div className="p-4 bg-white/5 rounded border border-white/10 hover:border-green-500 transition-all cursor-pointer opacity-50">
                <p className="text-[10px] mono opacity-50">PARTS</p>
                <p className="font-bold text-sm">Registry</p>
              </div>
              <div className="p-4 bg-white/5 rounded border border-white/10 hover:border-red-500 transition-all cursor-pointer opacity-50">
                <p className="text-[10px] mono opacity-50">SAFETY</p>
                <p className="font-bold text-sm">Documents</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-red-600/20 border border-red-500/50 p-6 rounded-lg font-black text-center group hover:bg-red-600 transition-all duration-300">
            <span className="text-red-500 group-hover:text-white transition-colors">SOS / EMERGENCY BEACON</span>
          </button>
        </section>

      </div>
    </main>
  );
}
