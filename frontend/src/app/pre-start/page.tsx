"use client";

import { useState } from 'react';

const CHECKLIST_ITEMS = [
    { id: 'oil', label: 'ENGINE OIL LEVEL (VISUAL CHECK)', critical: true },
    { id: 'coolant', label: 'COOLANT & RESERVOIR LEVEL', critical: true },
    { id: 'water_sep', label: 'CHECK WATER SEPARATOR (DENSE)', critical: true },
    { id: 'tyres', label: 'TYRE PRESSURE (TERRAIN ADJUSTED)', critical: false },
    { id: 'swivel', label: 'SWIVEL HUB LEAK INSPECTION', critical: false },
    { id: 'lights', label: 'EXTERNAL LIGHTING CHECK', critical: false },
];

export default function PreStart() {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggleItem = (id: string) => {
        setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const completedCount = Object.values(checked).filter(Boolean).length;
    const isComplete = completedCount === CHECKLIST_ITEMS.length;

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8 min-h-screen bg-[#121212]">
            <header className="flex justify-between items-end border-b border-heritage-red pb-4">
                <div>
                    <h1 className="text-3xl font-black italic">PRE-START CHECK</h1>
                    <p className="mono text-xs opacity-60">VEHICLE ID: LC79-CAB-SRI-01</p>
                </div>
                <div className="text-right">
                    <p className="text-4xl font-mono text-heritage-red">{completedCount}/{CHECKLIST_ITEMS.length}</p>
                    <p className="text-[10px] mono">ITEMS VERIFIED</p>
                </div>
            </header>

            <div className="space-y-4">
                {CHECKLIST_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`w-full flex items-center justify-between p-6 rounded border-2 transition-all duration-300 ${checked[item.id]
                                ? 'bg-heritage-red/20 border-heritage-red shadow-[0_0_15px_rgba(225,28,33,0.3)]'
                                : 'bg-white/5 border-white/10 grayscale hover:grayscale-0'
                            }`}
                    >
                        <div className="flex flex-col items-start">
                            {item.critical && <span className="text-[10px] bg-heritage-red px-2 py-0.5 rounded-full font-bold mb-1">CRITICAL</span>}
                            <span className={`text-lg font-bold ${item.critical ? 'text-white' : 'text-secondary'}`}>{item.label}</span>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${checked[item.id] ? 'bg-heritage-red border-heritage-red' : 'border-white/20'}`}>
                            {checked[item.id] && (
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <footer className="pt-8">
                <button
                    disabled={!isComplete}
                    className={`w-full py-8 text-2xl font-black uppercase rounded tracking-tighter transition-all ${isComplete
                            ? 'bg-green-600 shadow-[0_0_30px_rgba(22,163,74,0.4)] animate-bounce'
                            : 'bg-white/5 text-white/20 cursor-not-allowed'
                        }`}
                >
                    {isComplete ? 'SYSTEM READY - IGNITION OK' : 'PENDING VERIFICATION'}
                </button>
            </footer>
        </div>
    );
}
