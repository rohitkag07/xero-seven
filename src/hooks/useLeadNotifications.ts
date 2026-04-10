import { useState, useEffect, useRef, useCallback } from 'react';
import { insforge } from '../lib/insforge';

export interface LeadNotification {
  id: string;
  name: string;
  email: string;
  message: string;
  lead_score: number;
  routed_to: string;
  created_at: string;
}

export interface UseLeadNotificationsReturn {
  notifications: LeadNotification[];
  unreadCount: number;
  clearNotification: (id: string) => void;
  clearAll: () => void;
  permissionGranted: boolean;
  requestPermission: () => Promise<void>;
}

export function useLeadNotifications(): UseLeadNotificationsReturn {
  const [notifications, setNotifications] = useState<LeadNotification[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(
    typeof Notification !== 'undefined' && Notification.permission === 'granted'
  );
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  const showBrowserNotification = useCallback((lead: LeadNotification) => {
    if (!permissionGranted || typeof Notification === 'undefined') return;
    const isHot = lead.lead_score >= 60;
    new Notification(isHot ? '🔥 Hot Lead!' : '📬 New Lead', {
      body: `${lead.name || 'Someone'} — Score: ${lead.lead_score}/100\nRouted → ${lead.routed_to}`,
      icon: '/favicon.ico',
      tag: lead.id,
      requireInteraction: isHot,
    });
  }, [permissionGranted]);

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return;
    const result = await Notification.requestPermission();
    if (mountedRef.current) setPermissionGranted(result === 'granted');
  }, []);

  // Subscribe to agency_leads inserts via InsForge Realtime
  useEffect(() => {
    let unsubFn: (() => void) | null = null;
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    let lastSeenId: string | null = null;

    const handleNewLead = (lead: LeadNotification) => {
      if (!mountedRef.current) return;
      setNotifications(prev => [lead, ...prev.slice(0, 19)]); // Keep last 20
      showBrowserNotification(lead);
      // Play a subtle sound cue if hot lead
      if (lead.lead_score >= 60) {
        try {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.5);
        } catch { /* Audio not available */ }
      }
    };

    const startRealtime = async () => {
      try {
        if (!insforge.realtime.isConnected) {
          await insforge.realtime.connect();
        }
        const channel = 'leads:notifications';
        await insforge.realtime.subscribe(channel);

        const handler = (payload: { action: string; data: LeadNotification; meta?: { channel: string } }) => {
          if (payload.meta?.channel !== channel) return;
          if (payload.action === 'INSERT' && payload.data) {
            handleNewLead(payload.data);
          }
        };

        insforge.realtime.on('LEAD_CHANGE', handler);
        console.log('[LeadNotifications] Realtime subscription active.');

        unsubFn = () => {
          insforge.realtime.off('LEAD_CHANGE', handler);
          void (insforge.realtime.unsubscribe(channel) as unknown as Promise<void> | void);
        };
      } catch (err) {
        console.warn('[LeadNotifications] Realtime failed, falling back to polling:', err);
        // Fallback: poll every 15 seconds for new leads
        pollInterval = setInterval(async () => {
          try {
            let query = insforge.database
              .from('agency_leads')
              .select('id, name, email, message, lead_score, routed_to, created_at')
              .order('created_at', { ascending: false })
              .limit(1);
            if (lastSeenId) query = query.gt('id', lastSeenId);
            const { data } = await query;
            if (data && data.length > 0) {
              const lead = data[0] as LeadNotification;
              if (!lastSeenId || lead.id !== lastSeenId) {
                lastSeenId = lead.id;
                handleNewLead(lead);
              }
            }
          } catch { /* Ignore poll errors */ }
        }, 15000);
      }
    };

    startRealtime();

    return () => {
      if (unsubFn) unsubFn();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [showBrowserNotification]);

  const clearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  return {
    notifications,
    unreadCount: notifications.length,
    clearNotification,
    clearAll,
    permissionGranted,
    requestPermission,
  };
}
