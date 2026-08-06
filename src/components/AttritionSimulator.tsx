"use client";

import React, { useState, useEffect } from "react";
import { useRole } from "@/context/RoleContext";

const AttritionSimulator: React.FC = () => {
  const { role } = useRole();
  const isBackend = role === "backendDev";
  const sliderAccent = isBackend ? "accent-emerald-500" : "accent-cyan-500";
  const overtimeActiveClass = isBackend
    ? "bg-emerald-950/20 border-emerald-500 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.1)]"
    : "bg-purple-950/20 border-purple-500 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.1)]";
  const negShapText = isBackend ? "text-teal-400" : "text-cyan-400";
  const negShapBg = isBackend ? "bg-teal-500" : "bg-cyan-500";

  const [income, setIncome] = useState(5000);
  const [overtime, setOvertime] = useState(false);
  const [years, setYears] = useState(3);
  const [balance, setBalance] = useState(3);
  const [riskScore, setRiskScore] = useState(15);

  useEffect(() => {
    // Simulated XGBoost decision logic
    let score = 15; // Base risk baseline

    if (overtime) {
      score += 22;
    }
    
    // Income impact
    if (income < 3500) {
      score += 18;
    } else if (income > 8000) {
      score -= 12;
    } else {
      score -= 2;
    }

    // Work-life balance impact
    if (balance === 1) {
      score += 20;
    } else if (balance === 2) {
      score += 8;
    } else if (balance === 4) {
      score -= 8;
    }

    // Years at company stability
    if (years > 6) {
      score -= 6;
    } else if (years < 2) {
      score += 5;
    }

    const calculatedRisk = Math.max(3, Math.min(95, score));
    setRiskScore(calculatedRisk);
  }, [income, overtime, years, balance]);

  // SHAP Values computation for display
  const getShapValues = () => {
    const shap = [];
    if (overtime) shap.push({ label: "Overtime active", val: 22, pos: true });
    
    if (income < 3500) shap.push({ label: "Income under threshold", val: 18, pos: true });
    else if (income > 8000) shap.push({ label: "High retention income", val: -12, pos: false });
    
    if (balance === 1) shap.push({ label: "Poor work-life balance", val: 20, pos: true });
    else if (balance === 4) shap.push({ label: "Optimal work-life balance", val: -8, pos: false });
    
    if (years > 6) shap.push({ label: "Tenure stability", val: -6, pos: false });
    else if (years < 2) shap.push({ label: "New joiner volatility", val: 5, pos: true });
    
    return shap;
  };

  const shapValues = getShapValues();

  const getRiskColor = (score: number) => {
    if (score < 25) return "text-emerald-400 border-emerald-500/10 bg-emerald-950/5";
    if (score < 55) return "text-amber-400 border-amber-500/10 bg-amber-950/5";
    return "text-rose-400 border-rose-500/10 bg-rose-950/5";
  };

  return (
    <div className="flex flex-col gap-6 font-sans text-zinc-300">
      
      {/* Risk Indicator Header */}
      <div className={`p-4 rounded-xl border flex items-center justify-between transition-colors duration-300 ${getRiskColor(riskScore)}`}>
        <div className="flex flex-col">
          <span className="text-[0.6rem] font-mono tracking-wider opacity-60">XGBOOST PREDICTIVE SCORE</span>
          <span className="font-mono text-xs font-semibold mt-1">Status: Nominal Run</span>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold font-mono tracking-tighter">{riskScore}%</span>
          <span className="block text-[0.55rem] font-mono tracking-widest uppercase mt-0.5">Attrition Risk</span>
        </div>
      </div>

      {/* Control Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-950/20 border border-zinc-900 rounded-xl p-4">
        
        {/* Income Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[0.65rem] font-mono">
            <span className="text-zinc-500">MONTHLY INCOME</span>
            <span className="text-zinc-300">${income.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="1500" 
            max="15000" 
            step="250"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className={`w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer ${sliderAccent}`}
          />
        </div>

        {/* Overtime Toggle */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[0.65rem] font-mono text-zinc-500">OVERTIME REQUIRED</span>
          <button
            onClick={() => setOvertime(prev => !prev)}
            className={`w-full py-1.5 rounded-lg border text-[0.7rem] font-mono transition-all duration-300 ${
              overtime 
                ? overtimeActiveClass
                : "bg-zinc-950 border-zinc-900 text-zinc-500"
            }`}
          >
            {overtime ? "ACTIVE // YES" : "INACTIVE // NO"}
          </button>
        </div>

        {/* Years at Company Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[0.65rem] font-mono">
            <span className="text-zinc-500">YEARS AT COMPANY</span>
            <span className="text-zinc-300">{years} {years === 1 ? "Year" : "Years"}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="15" 
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className={`w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer ${sliderAccent}`}
          />
        </div>

        {/* Work Life Balance Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[0.65rem] font-mono">
            <span className="text-zinc-500">WORK-LIFE BALANCE</span>
            <span className="text-zinc-300">Level {balance} / 4</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="4" 
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className={`w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer ${sliderAccent}`}
          />
        </div>

      </div>

      {/* Local SHAP Waterfall Plot */}
      <div className="bg-[#0b0b0c]/40 border border-zinc-900 rounded-xl p-4 select-none">
        <span className="text-[0.6rem] font-mono text-zinc-500 tracking-wider block">LOCAL SHAP EXPLAINABILITY COEFFICIENTS</span>
        
        <div className="flex flex-col gap-2.5 mt-3 select-none">
          {shapValues.map((val, idx) => (
            <div key={idx} className="flex justify-between items-center text-[0.65rem] font-mono select-none">
              <span className="text-zinc-400 leading-none">{val.label}</span>
              <div className="flex items-center gap-2 select-none">
                <span className={val.pos ? "text-rose-400" : negShapText}>
                  {val.pos ? "+" : ""}{val.val}%
                </span>
                
                {/* Visual bar graph representation */}
                <div className="w-16 h-1 bg-zinc-900 rounded overflow-hidden select-none">
                  <div 
                    className={`h-full rounded ${val.pos ? "bg-rose-500" : negShapBg}`}
                    style={{ width: `${Math.min(100, Math.abs(val.val) * 3.5)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          {shapValues.length === 0 && (
            <span className="text-[0.65rem] font-mono text-zinc-650 italic py-2">Baseline factors in equilibrium. Risk matches core distribution.</span>
          )}
        </div>
      </div>

    </div>
  );
};

export default AttritionSimulator;
