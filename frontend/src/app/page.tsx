"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Activity, Battery, ShieldAlert, Zap, MapPin, Gauge, Menu, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [gloveMode, setGloveMode] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [monsoonMode, setMonsoonMode] = useState(false);
  const { role, setRole, isCommander } = useAuth();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-glove-mode', gloveMode.toString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, [gloveMode]);

  return (
    <main className="min-h-screen text-white p-4 md:p-8 relative overflow-hidden transition-all duration-500">
      {/* Visual Overlays */}
      {nightMode && <div className="night-mode-overlay" />}
      {monsoonMode && (
        <>
          <div className="absolute inset-0 bg-blue-900/10 pointer-events-none z-0 mix-blend-overlay" />
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3b82f6] z-50" />
        </>
      )}
      <div className="absolute inset-0 scan-line z-0 opacity-10 pointer-events-none"></div>

      {/* Top HUD Bar */}
      <nav className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-6 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-heritage-red flex items-center justify-center font-black text-2xl tracking-tighter shadow-[0_0_15px_rgba(225,28,33,0.4)]">
            79
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">TACTICAL <span className="text-heritage-red">VMS</span></h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${monsoonMode ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}></span>
              <p className="text-xs font-mono text-secondary tracking-widest uppercase">
                {monsoonMode ? 'ZONE: HAZARD (WET)' : 'ZONE: SECURE'} // COLOMBO
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div className="text-right hidden md:block">
            <p className="text-3xl font-mono leading-none">{currentTime}</p>
            <p className="text-[10px] text-secondary uppercase tracking-widest">Local Time</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setRole(role === 'COMMANDER' ? 'OPERATOR' : 'COMMANDER')}
              className="secondary-button"
            >
              <ShieldAlert size={14} />
              {role}
            </button>
            <button
              onClick={() => setMonsoonMode(!monsoonMode)}
              className={`secondary-button ${monsoonMode ? 'active border-blue-500 text-blue-400' : ''}`}
            >
              <Zap size={14} />
              RAIN
            </button>
            <button
              onClick={() => setGloveMode(!gloveMode)}
              className={`secondary-button ${gloveMode ? 'active' : ''}`}
            >
              <Menu size={14} />
              GLOVE
            </button>
            <button
              onClick={() => setNightMode(!nightMode)}
              className={`secondary-button ${nightMode ? 'border-heritage-red text-heritage-red' : ''}`}
            >
              NIGHT
            </button>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">

        {/* Main Telemetry Panel (Left) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Hero Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="tactical-card group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">Odometer</span>
                <MapPin size={16} className="text-white/20 group-hover:text-heritage-red transition-colors" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-mono">124,582</span>
                <span className="text-sm text-secondary">km</span>
              </div>
              <div className="w-full bg-white/5 h-1 mt-4">
                <div className="bg-heritage-red h-full w-[65%] shadow-[0_0_10px_rgba(225,28,33,0.5)]"></div>
              </div>
            </div>

            <div className="tactical-card group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">Engine Load</span>
                <Activity size={16} className="text-white/20 group-hover:text-high-vis-yellow transition-colors" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-mono">2,480</span>
                <span className="text-sm text-secondary">RPM</span>
              </div>
              <div className="w-full bg-white/5 h-1 mt-4">
                <div className="bg-high-vis-yellow h-full w-[42%]"></div>
              </div>
            </div>

            <div className="tactical-card group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">GVM Status</span>
                <Gauge size={16} className="text-white/20 group-hover:text-blue-500 transition-colors" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-mono">78</span>
                <span className="text-sm text-secondary">%</span>
              </div>
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                  <div key={i} className={`h-1 flex-1 ${i <= 7 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
                ))}
              </div>
            </div>
          </section>

          {/* Primary Action */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 h-48">
            <button className="heritage-button h-full text-2xl flex flex-col items-center justify-center gap-2 group relative overflow-hidden">
              <span className="absolute inset-0 bg-heritage-red blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></span>
              <span className="relative z-10 flex items-center gap-3">
                <Zap className="fill-current" /> START TRIP
              </span>
              <span className="relative z-10 text-xs opacity-60 font-mono tracking-widest">LOGGING ACTIVE</span>
            </button>

            <Link href="/pre-start" className="w-full h-full">
              <div className="tactical-card h-full flex flex-col items-center justify-center border-l-4 border-l-high-vis-yellow hover:bg-white/5 cursor-pointer transition-colors">
                <AlertTriangle className="text-high-vis-yellow mb-3" size={32} />
                <span className="text-2xl font-bold uppercase">Pre-Start Check</span>
                <span className="text-xs font-mono text-high-vis-yellow mt-1 bg-high-vis-yellow/10 px-2 py-1 rounded">MANDATORY PROTOCOL</span>
              </div>
            </Link>
          </section>
        </div>

        {/* Sidebar Modules (Right) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Access Grid */}
          <div className="grid grid-cols-2 gap-3">
            {isCommander && (
              <Link href="/commander" className="col-span-2">
                <div className="tactical-card bg-gradient-to-r from-heritage-red-dim/20 to-transparent border-heritage-red/30 hover:border-heritage-red transition-all group">
                  <p className="text-[10px] mono text-heritage-red mb-1 group-hover:text-white">STRATEGIC</p>
                  <p className="font-bold">Commander Console</p>
                </div>
              </Link>
            )}

            <Link href="/payload">
              <div className="tactical-card hover:border-blue-500/50 transition-colors h-full flex flex-col justify-between">
                <Gauge size={20} className="text-secondary mb-2" />
                <div>
                  <p className="text-[10px] mono opacity-50">Scientific</p>
                  <p className="font-bold text-sm">Payload Calc</p>
                </div>
              </div>
            </Link>

            <Link href="/engine-health">
              <div className="tactical-card hover:border-green-500/50 transition-colors h-full flex flex-col justify-between">
                <Activity size={20} className="text-secondary mb-2" />
                <div>
                  <p className="text-[10px] mono opacity-50">Predictive</p>
                  <p className="font-bold text-sm">Engine Health</p>
                </div>
              </div>
            </Link>
          </div>

          {/* V-Eye Callout */}
          <div className="tactical-card border-none bg-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={64} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                V-EYE SCANNER <span className="text-[10px] bg-white/10 px-1 rounded font-mono">AI</span>
              </h3>
              <p className="text-sm text-secondary mb-4 leading-relaxed">
                Digitize receipts & revenue licenses. {monsoonMode && <span className="text-blue-400 block mt-1 font-bold">Rain mode: Enhanced contract detection active.</span>}
              </p>
              <button className="w-full py-3 border border-white/20 hover:bg-white/10 uppercase font-bold text-xs tracking-widest transition-colors flex items-center justify-center gap-2">
                Initialize Camera
              </button>
            </div>
          </div>

          {/* SOS Button */}
          <button className="w-full bg-[#1a0505] border border-red-900/50 p-6 rounded relative overflow-hidden group hover:border-red-600 transition-colors">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cross-stripes.png')] opacity-20"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="text-left">
                <span className="block text-red-500 font-bold tracking-widest text-sm">EMERGENCY</span>
                <span className="block text-white font-black text-xl">SOS BEACON</span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-red-600 flex items-center justify-center animate-pulse">
                <AlertTriangle className="text-red-500" size={20} />
              </div>
            </div>
          </button>
        </div>

      </div>
    </main>
  );
}
