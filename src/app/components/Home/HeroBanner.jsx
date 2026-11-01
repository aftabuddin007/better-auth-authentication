"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Car, ShieldCheck, DollarSign, ArrowRight } from "lucide-react";

export default function HeroBanner() {
  const [activeTab, setActiveTab] = useState("" );
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Gradient & Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/40 z-10" />
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] z-0" />

      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070"
          alt="Luxury Sport Car"
          fill
          priority
          className="object-cover object-center transform scale-105"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              Over 10,000+ Verified Cars Available
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Drive Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Dream Car
              </span>{" "}
              Today
            </h1>

            <p className="text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Discover the ultimate marketplace to buy and sell new and
              pre-owned luxury vehicles with transparent pricing, certified
              multi-point inspection, and instant financing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#inventory"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Browse Inventory
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#sell"
                className="inline-flex items-center gap-2 bg-slate-800/85 hover:bg-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-xl border border-slate-700 backdrop-blur-md transition-all duration-200"
              >
                Sell Your Car
              </a>
            </div>

            {/* Key Trust Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
              <div>
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="text-sm text-slate-400 mt-1">
                  Certified Inspection
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">15K+</p>
                <p className="text-sm text-slate-400 mt-1">Happy Drivers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-sm text-slate-400 mt-1">Expert Support</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Search & Valuation Widget */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50">
              {/* Widget Tabs */}
              <div className="flex rounded-xl bg-slate-950 p-1 mb-6 border border-slate-800">
                <button
                  onClick={() => setActiveTab("buy")}
                  className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === "buy"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Find a Car
                </button>
                <button
                  onClick={() => setActiveTab("sell")}
                  className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === "sell"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Value Your Car
                </button>
              </div>

              {activeTab === "buy" ? (
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Select Make
                    </label>
                    <select
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">
                        All Makes (BMW, Audi, Mercedes...)
                      </option>
                      <option value="bmw">BMW</option>
                      <option value="audi">Audi</option>
                      <option value="mercedes">Mercedes-Benz</option>
                      <option value="porsche">Porsche</option>
                      <option value="tesla">Tesla</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Select Model
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">All Models</option>
                      <option value="sedan">3 Series / A4 / C-Class</option>
                      <option value="suv">X5 / Q7 / GLE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Max Price
                    </label>
                    <select
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">Any Price</option>
                      <option value="30000">Under $30,000</option>
                      <option value="50000">Under $50,000</option>
                      <option value="80000">Under $80,000</option>
                      <option value="100000">$100,000+</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200"
                    >
                      <Search className="w-5 h-5" />
                      Search Available Cars
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 py-2 text-center">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto text-cyan-400 mb-4 border border-cyan-500/20">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Get an Instant Valuation
                  </h3>
                  <p className="text-sm text-slate-400">
                    Enter your license plate or VIN number to receive a
                    certified cash offer in under 2 minutes.
                  </p>
                  <input
                    type="text"
                    placeholder="Enter License Plate or VIN"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 text-center uppercase font-mono tracking-wider placeholder:normal-case"
                  />
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200">
                    Get Instant Offer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
