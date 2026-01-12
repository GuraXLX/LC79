"use client";

import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function EngineHealth() {
    const vehicleId = "default-vehicle-id"; // In a real app, this would come from context or URL
    const { data: health } = useSWR(`/api/service-horizon/${vehicleId}`, fetcher, {
        fallbackData: {
            oilLifePercent: 82,
            avgCorrugation: "4.2",
            kmSinceService: 1840,
            predictedServiceDate: '2024-06-01T12:00:00.000Z',
            daysRemaining: 45,
            status: 'HEALTHY'
        }
    });

    return (
        <div className="p-8 space-y-8 bg-black min-h-screen text-white">
            <header className="border-b border-white/10 pb-4">
                <h1 className="text-3xl font-extrabold italic tracking-tighter">
                    ENGINE <span className="text-heritage-red">HEALTH</span> & SERVICE HORIZON
                </h1>
                <p className="mono text-secondary text-sm">LC79 1VD-FTV // PREDICTIVE AI ANALYSIS</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Main Status Circle */}
                <div className="tactical-card flex flex-col items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${health?.status === 'HEALTHY' ? 'bg-green-500/20 text-green-400' : 'bg-heritage-red/20 text-heritage-red'}`}>
                            SYSTEM STATUS: {health?.status}
                        </span>
                    </div>

                    <div className="relative w-64 h-64 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="50%" cy="50%" r="45%"
                                className="stroke-white/5 fill-none"
                                strokeWidth="12"
                            />
                            <circle
                                cx="50%" cy="50%" r="45%"
                                className={`${health?.oilLifePercent < 20 ? 'stroke-heritage-red' : 'stroke-high-vis-yellow'} fill-none transition-all duration-1000`}
                                strokeWidth="12"
                                strokeDasharray="283%"
                                strokeDashoffset={`${283 - (283 * health?.oilLifePercent) / 100}%`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-6xl font-black">{health?.oilLifePercent}%</span>
                            <span className="text-xs mono opacity-50 uppercase tracking-widest">Oil Life</span>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-8 w-full">
                        <div className="text-center">
                            <p className="text-[10px] mono opacity-50 uppercase">Days to Service</p>
                            <p className="text-2xl font-bold">{health?.daysRemaining} <span className="text-xs">DAYS</span></p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] mono opacity-50 uppercase">Service Horizon</p>
                            <p className="text-2xl font-bold">{new Date(health?.predictedServiceDate).toLocaleDateString('en-GB')}</p>
                        </div>
                    </div>
                </div>

                {/* Telemetry Charts / Stats */}
                <div className="space-y-6">
                    <div className="tactical-card">
                        <h3 className="text-sm font-bold mb-4 mono text-secondary">HARSHNESS ANALYSIS</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mono mb-1">
                                    <span>AVG CORRUGATION INDEX</span>
                                    <span className="text-high-vis-yellow">{health?.avgCorrugation}/10</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-high-vis-yellow transition-all duration-700"
                                        style={{ width: `${(Number(health?.avgCorrugation) * 10)}%` }}
                                    ></div>
                                </div>
                                <p className="text-[10px] mt-2 opacity-40">Heavy vibrations detected during &quot;Plantation Track&quot; segments. Accelerated bush/bearing wear anticipated.</p>
                            </div>

                            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] mono opacity-50 uppercase">KM Since Last Oil Change</p>
                                    <p className="text-xl font-bold">{health?.kmSinceService} KM</p>
                                </div>
                                <div>
                                    <p className="text-[10px] mono opacity-50 uppercase">Fuel Consumed (Total)</p>
                                    <p className="text-xl font-bold">248.5 L</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tactical-card border-none bg-gradient-to-r from-blue-500/10 to-transparent">
                        <h3 className="text-blue-400 font-bold mb-2">RECOMMENDED ACTION</h3>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Based on the <strong>Corrugation Index</strong> of {health?.avgCorrugation}, we recommend performing a <strong>Prop-Shaft Re-grease</strong> and <strong>Swivel Hub inspection</strong> within the next 48 service-hours.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-500/20 border border-blue-500 text-blue-400 text-xs font-bold uppercase rounded hover:bg-blue-500 hover:text-white transition-all">
                            Log Maintenance
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
