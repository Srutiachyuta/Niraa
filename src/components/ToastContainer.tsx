import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#0C1A13] text-[#FAF8F5] border border-[#C5A265]/70 p-3.5 shadow-2xl flex items-start space-x-3 animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="text-[#C5A265] shrink-0 mt-0.5">
            {toast.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </div>
          <p className="text-xs text-[#F3EBDD] flex-1 leading-snug">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-[#DFCA9B]/70 hover:text-[#FAF8F5] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
