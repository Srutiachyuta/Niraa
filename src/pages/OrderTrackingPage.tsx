import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Truck,
  ShieldCheck,
  Thermometer,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  Phone,
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, trackingOrderId, setTrackingOrderId, formatPrice, setActivePage } = useStore();

  const [searchQuery, setSearchQuery] = useState('');

  // Find order
  const activeOrder =
    orders.find((o) => o.id === trackingOrderId || o.orderNumber.toLowerCase() === trackingOrderId?.toLowerCase()) ||
    orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        o.trackingNumber.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    if (found) {
      setTrackingOrderId(found.id);
    }
  };

  return (
    <div id="page-tracking" className="bg-[#FAF8F5] text-[#1C221F] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold block">
            Cryo Logistics Telemetry
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury text-[#14281E] font-medium mt-2">
            Cold-Chain Delivery Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6761] mt-3 leading-relaxed">
            Real-time temperature logging and transit coordinates for your unpasteurized wild Khajur tree neera orders.
          </p>
        </div>

        {/* Search Order Bar */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex bg-white border border-[#DFCA9B] shadow-sm p-1.5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order # (e.g. NIRAA-1001) or AWB Tracking #"
              className="flex-1 px-3 py-2 text-xs text-[#1C221F] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#14281E] text-[#F3EBDD] px-5 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#2A4836] cursor-pointer"
            >
              Track
            </button>
          </form>
        </div>

        {activeOrder ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Live Telemetry Sensor Card */}
            <div className="bg-[#14281E] text-[#FAF8F5] p-6 sm:p-8 border border-[#2A4836] shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2A4836] pb-6 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#C5A265] uppercase tracking-widest font-semibold">
                    Live Cooler Sensor Node #CRYO-902
                  </span>
                  <h2 className="text-2xl font-serif-luxury font-bold text-[#FAF8F5] mt-0.5">
                    Order {activeOrder.orderNumber}
                  </h2>
                  <p className="text-xs text-[#DFCA9B]/80 mt-1">
                    Carrier: {activeOrder.carrier} • Air Waybill: {activeOrder.trackingNumber}
                  </p>
                </div>

                <div className="flex items-center space-x-4 bg-[#0C1A13] p-3 border border-[#C5A265]/40 rounded-sm">
                  <Thermometer className="w-8 h-8 text-[#C5A265] animate-pulse" />
                  <div>
                    <span className="text-xs text-[#DFCA9B] block">Current Internal Temp</span>
                    <span className="text-2xl font-mono font-bold text-[#FAF8F5]">3.8°C</span>
                    <span className="text-[10px] text-emerald-400 block font-semibold">✓ Optimal 2°C–6°C</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
                <div>
                  <span className="text-[#DFCA9B]/70 block">Dispatch Origin</span>
                  <span className="font-semibold text-[#FAF8F5]">NIRAA Central Cellar, Bengaluru</span>
                </div>
                <div>
                  <span className="text-[#DFCA9B]/70 block">Destination City</span>
                  <span className="font-semibold text-[#FAF8F5]">
                    {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.postalCode}
                  </span>
                </div>
                <div>
                  <span className="text-[#DFCA9B]/70 block">Harvest Date</span>
                  <span className="font-semibold text-[#FAF8F5]">Dawn Batch (Today 04:30 AM)</span>
                </div>
                <div>
                  <span className="text-[#DFCA9B]/70 block">Expected Arrival</span>
                  <span className="font-semibold text-[#FAF8F5]">Within 24 Hours Chilled</span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Milestones */}
            <div className="bg-white p-8 border border-[#DFCA9B]/50 shadow-sm space-y-6">
              <h3 className="font-serif-luxury text-xl font-bold text-[#14281E] border-b border-[#DFCA9B]/30 pb-4">
                Cold-Chain Milestone Audit
              </h3>

              <div className="relative border-l-2 border-[#DFCA9B] ml-4 space-y-8 pl-6">
                {activeOrder.trackingHistory.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div
                      className={`absolute -left-[33px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step.completed
                          ? 'bg-[#14281E] text-[#DFCA9B] ring-4 ring-[#14281E]/10'
                          : 'bg-white border-2 border-[#DFCA9B] text-[#5C6761]'
                      }`}
                    >
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center space-x-3">
                        <h4
                          className={`text-sm font-semibold ${
                            step.completed ? 'text-[#14281E]' : 'text-[#5C6761]'
                          }`}
                        >
                          {step.label}
                        </h4>
                        <span className="text-[11px] font-mono text-[#C5A265]">{step.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#5C6761] mt-0.5">{step.location}</p>
                      {step.notes && (
                        <p className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                          {step.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottles in Shipment */}
            <div className="bg-[#F5F1E9] p-6 border border-[#DFCA9B]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs uppercase tracking-wider text-[#14281E] font-bold">
                  Bottles in This Insulated Crate:
                </span>
                <p className="text-xs text-[#5C6761]">
                  {activeOrder.items.map((i) => `${i.quantity}x ${i.product.name} (${i.variant.size})`).join(' • ')}
                </p>
              </div>

              <button
                onClick={() => setActivePage('account')}
                className="bg-[#14281E] text-[#F3EBDD] px-5 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#2A4836] cursor-pointer whitespace-nowrap"
              >
                View Full Order Receipt
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 text-center border border-[#DFCA9B]/50">
            <p className="font-serif-luxury text-lg text-[#14281E]">No active order matches this search.</p>
            <p className="text-xs text-[#5C6761] mt-1">Please check your tracking number or contact concierge.</p>
          </div>
        )}
      </div>
    </div>
  );
};
