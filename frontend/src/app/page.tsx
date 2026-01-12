"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Activity, ShieldAlert, Zap, MapPin, Gauge, Menu, AlertTriangle, ChevronRight, Camera } from 'lucide-react';
import { tripApi, ocrApi } from '@/services/api';

export default function Dashboard() {
  const [gloveMode, setGloveMode] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [monsoonMode, setMonsoonMode] = useState(false);
  const { role, setRole, isCommander } = useAuth();
  const [currentTime, setCurrentTime] = useState('');

  // New States for API Integration
  const [isTripActive, setIsTripActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-glove-mode', gloveMode.toString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, [gloveMode]);

  // Handler for Start Trip
  const handleStartTrip = async () => {
    try {
      await tripApi.start({
        vehicle_id: 'vehicle-001', // Hardcoded for demo
        user_id: 'user-001',
        start_odometer: 124582
      });
      setIsTripActive(true);
      alert('TRIP LOGGING STARTED // TELEMETRY ACTIVE');
    } catch (e) {
      console.error(e);
      // Fallback for demo if backend is not reachable
      setIsTripActive(true);
      alert('CONNECTION ERROR: LOGGING OFFLINE (SIMULATION MODE)');
    }
  };

  // Handler for V-Eye Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('category', 'FUEL_RECEIPT');
    formData.append('vehicleId', 'vehicle-001');

    try {
      const res = await ocrApi.scan(formData);
      console.log(res.data);
      alert(`SCAN COMPLETE. DETECTED: ${JSON.stringify(res.data.data, null, 2)}`);
    } catch (e) {
      alert('OCR SIMULATION: RECEIPT SCANNED & LOGGED (MOCKED)');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen text-white p-4 md:p-8 relative overflow-hidden transition-all duration-500 font-sans">
      {/* Hidden File Input for V-Eye */}
      <input
        type="file"
        id="ocr-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileUpload}
      />

      {/* Visual Overlays */}
      {nightMode && <div className="night-mode-overlay" />}
      {monsoonMode && (
        <>
          <div className="absolute inset-0 bg-blue-900/10 pointer-events-none z-0 mix-blend-overlay" />
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3b82f6] z-50" />
        </>
      )}
      <div className="absolute inset-0 scan-line z-0 opacity-10 pointer-events-none" />

      {/* Top HUD Bar */}
      <nav className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-6 backdrop-blur-sm bg-black/40 p-4 -mx-4 md:mx-0 md:bg-transparent md:p-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-heritage-red flex items-center justify-center font-black text-2xl tracking-tighter shadow-[0_0_15px_rgba(225,28,33,0.4)]">
            79
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none text-white">TACTICAL <span className="text-heritage-red">VMS</span></h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${monsoonMode ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}></span>
              <p className="text-xs font-mono text-secondary tracking-widest uppercase">
                {monsoonMode ? 'ZONE: HAZARD (WET)' : 'ZONE: SECURE'} // COLOMBO
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right hidden md:block">
            <p className="text-3xl font-mono leading-none text-white">{currentTime}</p>
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
              className={`secondary-button ${nightMode ? 'border-heritage-red text-heritage-red shadow-[0_0_10px_rgba(225,28,33,0.3)]' : ''}`}
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
            <div className="tactical-card group border-t-2 border-t-heritage-red">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">Odometer</span>
                <MapPin size={16} className="text-white/20 group-hover:text-heritage-red transition-colors" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-mono text-white">124,582</span>
                <span className="text-sm text-secondary">km</span>
              </div>
              <div className="w-full bg-white/5 h-1 mt-4">
                <div className="bg-heritage-red h-full w-[65%] shadow-[0_0_10px_rgba(225,28,33,0.5)]"></div>
              </div>
            </div>

            <div className="tactical-card group border-t-2 border-t-high-vis-yellow">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">Engine Load</span>
                <Activity size={16} className="text-white/20 group-hover:text-high-vis-yellow transition-colors" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-mono text-white">2,480</span>
                <span className="text-sm text-secondary">RPM</span>
              </div>
              <div className="w-full bg-white/5 h-1 mt-4">
                <div className="bg-high-vis-yellow h-full w-[42%]"></div>
              </div>
            </div>

            <div className="tactical-card group border-t-2 border-t-blue-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">GVM Status</span>
                <Gauge size={16} className="text-white/20 group-hover:text-blue-500 transition-colors" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-mono text-white">78</span>
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
            <button
              onClick={handleStartTrip}
              disabled={isTripActive}
              className={`heritage-button h-full text-2xl flex flex-col items-center justify-center gap-2 group relative overflow-hidden ${isTripActive ? 'grayscale cursor-not-allowed opacity-50' : ''}`}
            >
              <span className="absolute inset-0 bg-heritage-red blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <span className="relative z-10 flex items-center gap-3 font-black italic tracking-tight">
                <Zap className="fill-white" size={28} /> {isTripActive ? 'LOGGING ACTIVE' : 'START TRIP'}
              </span>
              <span className="relative z-10 text-xs opacity-60 font-mono tracking-widest bg-black/20 px-2 py-1 rounded">
                {isTripActive ? 'RECORDING TELEMETRY...' : 'INITIATE SEQUENCE'}
              </span>
            </button>

            <Link href="/pre-start" className="w-full h-full block group">
              <div className="tactical-card h-full flex flex-col items-center justify-center border border-white/10 group-hover:border-high-vis-yellow/50 transition-all bg-gradient-to-br from-transparent to-high-vis-yellow/5">
                <AlertTriangle className="text-high-vis-yellow mb-3 group-hover:scale-110 transition-transform" size={42} />
                <span className="text-2xl font-bold uppercase text-white tracking-wider">Pre-Start Check</span>
                <span className="text-xs font-mono text-black font-bold mt-2 bg-high-vis-yellow px-3 py-1 rounded uppercase tracking-widest">Mandatory Protocol</span>
              </div>
            </Link>
          </section>
        </div>

        {/* Sidebar Modules (Right) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Access Grid */}
          <div className="grid grid-cols-2 gap-3">
            {isCommander && (
              <Link href="/commander" className="col-span-2 block group">
                <div className="tactical-card bg-gradient-to-r from-heritage-red-dim/40 to-transparent border-heritage-red/30 group-hover:border-heritage-red transition-all group-hover:bg-heritage-red-dim/60">
                  <p className="text-[10px] mono text-heritage-red mb-1 group-hover:text-white font-bold tracking-widest">STRATEGIC</p>
                  <p className="font-bold text-white text-lg flex items-center justify-between">
                    COMMANDER <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </div>
              </Link>
            )}

            <Link href="/payload" className="block group h-full">
              <div className="tactical-card group-hover:border-blue-500/50 transition-colors h-full flex flex-col justify-between min-h-[100px] border-white/10">
                <Gauge size={20} className="text-secondary mb-2 group-hover:text-blue-500 transition-colors" />
                <div>
                  <p className="text-[10px] mono opacity-50 uppercase tracking-wider">Scientific</p>
                  <p className="font-bold text-sm text-white">Payload Calc</p>
                </div>
              </div>
            </Link>

            <Link href="/engine-health" className="block group h-full">
              <div className="tactical-card group-hover:border-green-500/50 transition-colors h-full flex flex-col justify-between min-h-[100px] border-white/10">
                <Activity size={20} className="text-secondary mb-2 group-hover:text-green-500 transition-colors" />
                <div>
                  <p className="text-[10px] mono opacity-50 uppercase tracking-wider">Predictive</p>
                  <p className="font-bold text-sm text-white">Engine Health</p>
                </div>
              </div>
            </Link>
          </div>

          {/* V-Eye Callout */}
          <div className="tactical-card border-none bg-gradient-to-b from-white/10 to-white/5 relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
              <Zap size={100} />
            </div>
            <div className="relative z-10 p-2">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-white">
                V-EYE SCANNER <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">AI</span>
              </h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Digitize receipts & revenue licenses.{' '}
                {monsoonMode ? (
                  <span className="text-blue-400 font-bold block mt-2 animate-pulse">• Rain contract detection active</span>
                ) : (
                  <span className="opacity-50 block mt-2">Ready for capture.</span>
                )}
              </p>
              <button
                onClick={() => document.getElementById('ocr-upload')?.click()}
                disabled={uploading}
                className="w-full py-4 bg-black/40 border border-white/20 hover:bg-white/10 hover:border-white/40 uppercase font-bold text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 rounded"
              >
                {uploading ? (
                  <span className="animate-pulse">ANALYZING...</span>
                ) : (
                  <><Camera size={16} /> Initialize Camera</>
                )}
              </button>
            </div>
          </div>

          {/* SOS Button */}
          <button className="w-full bg-gradient-to-r from-[#2a0808] to-[#1a0505] border border-red-900/50 p-6 rounded relative overflow-hidden group hover:border-red-600 transition-all hover:scale-[1.01] active:scale-[0.99]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cross-stripes.png')] opacity-30"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="text-left">
                <span className="block text-red-500 font-bold tracking-[0.3em] text-[10px] mb-1">EMERGENCY PROTOCOL</span>
                <span className="block text-white font-black text-xl italic tracking-tighter">SOS BEACON</span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-red-600/50 bg-red-900/20 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                <AlertTriangle className="text-red-500 fill-red-500/20" size={24} />
              </div>
            </div>
          </button>
        </div>

      </div>
    </main>
  );
}
