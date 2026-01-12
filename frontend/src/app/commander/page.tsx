"use client";

import { useAuth } from '@/context/auth-context';
import { useState } from 'react';

export default function CommanderConsole() {
    const { role } = useAuth();
    const [privacyMode, setPrivacyMode] = useState(false);

    if (role !== 'COMMANDER') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-8">
                <div className="tactical-card border-heritage-red p-12 text-center">
                    <h1 className="text- heritage-red text-3xl font-black mb-4">ACCESS DENIED</h1>
                    <p className="mono opacity-50">COMMANDER CREDENTIALS REQUIRED FOR STRATEGIC OVERVIEW</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen p-8 bg-black text-white space-y-12">
            <header className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-5xl font-black italic tracking-tighter">COMMANDER <span className="text-heritage-red">CONSOLE</span></h1>
                    <p className="mono text-secondary text-sm mt-2">FLEET STRATEGY & FINANCIAL OVERWATCH</p>
                </div>
                <button
                    onClick={() => setPrivacyMode(!privacyMode)}
                    className={`tactical-card px-4 py-2 border ${privacyMode ? 'border-high-vis-yellow text-high-vis-yellow' : 'opacity-40'}`}
                >
                    PRIVACY MODE: {privacyMode ? 'ON' : 'OFF'}
                </button>
            </header>

            {/* Strategic KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="tactical-card group hover:border-heritage-red transition-all">
                    <p className="text-[10px] mono opacity-50 uppercase mb-2">Fleet Health Score</p>
                    <p className="text-4xl font-black italic">92 <span className="text-sm opacity-40">/100</span></p>
                    <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[92%] bg-green-500"></div>
                    </div>
                </div>

                <div className="tactical-card group hover:border-high-vis-yellow transition-all">
                    <p className="text-[10px] mono opacity-50 uppercase mb-2">TCO (Total Cost of Ownership)</p>
                    <p className="text-4xl font-black italic">
                        {privacyMode ? 'Rs. •••••••' : 'Rs. 8.4M'}
                    </p>
                    <p className="text-[10px] mt-2 text-secondary">Asset Depreciation: -12% YOY</p>
                </div>

                <div className="tactical-card">
                    <p className="text-[10px] mono opacity-50 uppercase mb-2">Cost Per Kilometer</p>
                    <p className="text-4xl font-black italic text-high-vis-yellow">
                        {privacyMode ? 'Rs. ••' : 'Rs. 42.5'}
                    </p>
                    <p className="text-[10px] mt-2 opacity-40">LKR Volatility Impact: +8%</p>
                </div>

                <div className="tactical-card border-none bg-heritage-red/10">
                    <p className="text-[10px] mono text-heritage-red uppercase mb-2">Expense Burn Rate</p>
                    <p className="text-4xl font-black italic text-heritage-red">
                        {privacyMode ? 'Rs. •••' : 'Rs. 142k'}
                    </p>
                    <p className="text-[10px] mt-2 opacity-50">Avg Monthly (Fuel + Maint)</p>
                </div>
            </div>

            {/* Asset Manager & Parts Volatility */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <section className="tactical-card">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3 italic">
                        <span className="w-2 h-6 bg-high-vis-yellow block"></span>
                        PARTS VOLATILITY (LKR VS USD)
                    </h2>
                    <div className="space-y-6">
                        {[
                            { part: 'Oil Filter (Toyota Lanka)', price: 4500, change: '+12%', type: 'Essential' },
                            { part: 'ARB Bullbar (Imported)', price: 420000, change: '+24%', type: 'Modification' },
                            { part: 'Cooper Tires (STT Pro)', price: 115000, change: '+5%', type: 'Consumable' },
                        ].map((p, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded">
                                <div>
                                    <p className="font-bold">{p.part}</p>
                                    <span className="text-[10px] mono opacity-40">{p.type}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-black italic">{privacyMode ? '••••' : `Rs. ${p.price.toLocaleString()}`}</p>
                                    <span className="text-[10px] text-heritage-red mono">{p.change}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="tactical-card">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3 italic">
                        <span className="w-2 h-6 bg-heritage-red block"></span>
                        OPERATIONAL LOGS (FLEET)
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm opacity-80">
                            <thead>
                                <tr className="border-b border-white/10 text-[10px] mono uppercase">
                                    <th className="py-4">Unit</th>
                                    <th>Driver</th>
                                    <th>District</th>
                                    <th>Fuel Efficiency</th>
                                </tr>
                            </thead>
                            <tbody className="mono">
                                <tr className="border-b border-white/5">
                                    <td className="py-4">LC79-01</td>
                                    <td>Kasun</td>
                                    <td>Anuradhapura</td>
                                    <td className="text-green-400">12.2 L/100km</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4">LC79-02</td>
                                    <td>Driver B</td>
                                    <td>Kandy</td>
                                    <td className="text-high-vis-yellow">14.8 L/100km</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <footer className="flex justify-center gap-8 opacity-30 mono text-[10px] py-12">
                <span>© 2026 TACTICAL VMS</span>
                <span>SECURITY LEVEL: ALPHA-COMMAND</span>
                <span>SRI LANKA ADAPTER: v2.4.1</span>
            </footer>
        </main>
    );
}
