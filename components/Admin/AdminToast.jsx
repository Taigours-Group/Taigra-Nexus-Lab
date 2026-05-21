import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const AdminToast = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div
      className={`fixed bottom-20 lg:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-sm z-[60] flex items-start gap-3 p-4 rounded-xl border shadow-xl ${
        isError
          ? 'bg-red-950/95 border-red-500/30 text-red-100'
          : 'bg-nexus-800/95 border-green-500/30 text-white'
      }`}
      role="status"
    >
      {isError ? (
        <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
      ) : (
        <CheckCircle2 className="w-5 h-5 shrink-0 text-green-400" />
      )}
      <p className="text-sm flex-1 leading-snug">{toast.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="p-1 opacity-70 hover:opacity-100"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
};
