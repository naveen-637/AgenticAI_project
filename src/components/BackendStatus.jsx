import { useEffect, useState } from 'react';
import { checkBackendStatus } from '../services/api.js';

const cfg = {
  connected: { dot: 'bg-emerald-500', text: 'text-emerald-700', label: 'Connected' },
  offline:   { dot: 'bg-rose-500',    text: 'text-rose-700',    label: 'Offline'   },
  loading:   { dot: 'bg-amber-400 animate-pulse', text: 'text-amber-700', label: 'Connecting…' },
};

export default function BackendStatus() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    checkBackendStatus().then(setStatus);
  }, []);

  const { dot, text, label } = cfg[status] ?? cfg.offline;

  return (
    <div className={`flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold ${text}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span className="hidden sm:inline">Backend</span>
      <span>{label}</span>
    </div>
  );
}
