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
          ? 'bg-red-50 border-red-200 text-red-800'
          : 'bg-white border-green-300 text-ink-900'
      }`}
      role="status"
    >
      {isError ? (
        <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
      ) : (
        <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600" />
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
