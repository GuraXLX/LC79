"use client";

import { useState } from 'react';

export default function PayloadScientist() {
    const [fuel, setFuel] = useState(80); // Liters
    const [water, setWater] = useState(20); // Liters
    const [gear, setGear] = useState(150); // kg
    const [passengers, setPassengers] = useState(2); // count

    const BASE_WEIGHT = 2200; // Curb weight for LC79 Single Cab
    const GVM_LIMIT = 3300; // Standard GVM

    const fuelWeight = fuel * 0.85; // Diesel density
    const waterWeight = water * 1.0;
    const passengerWeight = passengers * 80;

    const totalWeight = BASE_WEIGHT + fuelWeight + waterWeight + gear + passengerWeight;
    const percentage = (totalWeight / GVM_LIMIT) * 100;
    const isOverweight = totalWeight > GVM_LIMIT;

    return (
        <div className="p-8 space-y-8 bg-black min-h-screen text-white">
            <header className="border-b border-white/10 pb-4">
                <h1 className="text-3xl font-extrabold flex items-center gap-3">
                    <span className="text-high-vis-yellow">PAYLOAD</span> SCIENTIST
                </h1>
                <p className="mono text-secondary text-sm">LC79 SINGLE CAB // GVM LIMIT: {GVM_LIMIT}KG</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="tactical-card">
                        <label className="block mono text-xs mb-2">DIESEL (LITERS)</label>
                        <input
                            type="range" min="0" max="180" value={fuel}
                            onChange={(e) => setFuel(Number(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-heritage-red"
                        />
                        <div className="flex justify-between mt-1 mono text-sm">
                            <span>0L</span>
                            <span className="text-high-vis-yellow">{fuel}L</span>
                            <span>180L</span>
                        </div>
                    </div>

                    <div className="tactical-card">
                        <label className="block mono text-xs mb-2">WATER (LITERS)</label>
                        <input
                            type="range" min="0" max="100" value={water}
                            onChange={(e) => setWater(Number(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between mt-1 mono text-sm">
                            <span>0L</span>
                            <span className="text-blue-400">{water}L</span>
                            <span>100L</span>
                        </div>
                    </div>

                    <div className="tactical-card">
                        <label className="block mono text-xs mb-2">CARGO / GEAR (KG)</label>
                        <input
                            type="range" min="0" max="1000" value={gear}
                            onChange={(e) => setGear(Number(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-high-vis-yellow"
                        />
                        <div className="flex justify-between mt-1 mono text-sm">
                            <span>0kg</span>
                            <span className="text-high-vis-yellow">{gear}kg</span>
                            <span>1000kg</span>
                        </div>
                    </div>
                </div>

                {/* Visual Output */}
                <div className="flex flex-col justify-center items-center space-y-8">
                    <div className={`relative w-64 h-64 rounded-full border-8 flex flex-col items-center justify-center ${isOverweight ? 'border-heritage-red animate-pulse' : 'border-high-vis-yellow'}`}>
                        <span className="text-sm mono opacity-60">TOTAL MASS</span>
                        <span className="text-5xl font-black">{Math.round(totalWeight)}</span>
                        <span className="text-xl mono">KG</span>
                        {isOverweight && <span className="absolute -bottom-4 bg-heritage-red text-white px-4 py-1 font-bold text-xs">GVM EXCEEDED</span>}
                    </div>

                    <div className="w-full space-y-2">
                        <div className="flex justify-between mono text-xs">
                            <span>UTILIZATION</span>
                            <span>{Math.round(percentage)}%</span>
                        </div>
                        <div className="w-full h-4 bg-white/5 rounded-sm overflow-hidden border border-white/10">
                            <div
                                className={`h-full transition-all duration-500 ${percentage > 90 ? 'bg-heritage-red' : 'bg-high-vis-yellow'}`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="tactical-card text-center">
                            <p className="text-[10px] mono opacity-50">REMAINING</p>
                            <p className="text-xl font-bold">{Math.max(0, GVM_LIMIT - Math.round(totalWeight))}kg</p>
                        </div>
                        <div className="tactical-card text-center">
                            <p className="text-[10px] mono opacity-50">AXLE BIAS</p>
                            <p className="text-xl font-bold">42/58</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
