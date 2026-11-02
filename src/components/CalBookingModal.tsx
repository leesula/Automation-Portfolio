import React, { useEffect, useState } from 'react';
import { X, Calendar, CheckCircle2, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { recordCallBookingToSupabase } from '../lib/supabase';
import { siteConfig } from '../data/projects';

interface CalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillName?: string;
  prefillEmail?: string;
  source?: string;
}

export const CalBookingModal: React.FC<CalBookingModalProps> = ({
  isOpen,
  onClose,
  prefillName = '',
  prefillEmail = '',
  source = 'in_page_cal_modal',
}) => {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState<{
    name?: string;
    email?: string;
    startTime?: string;
    title?: string;
    id?: string;
  } | null>(null);

  // Construct embedded Cal.com URL with prefilled parameters
  const getEmbedUrl = () => {
    // Extract base slug from siteConfig.calLink (e.g. "https://cal.com/chweet-girl-bsfmon/")
    let base = siteConfig.calLink.replace(/\/$/, '');
    if (!base.startsWith('http')) {
      base = `https://cal.com/${base}`;
    }
    const url = new URL(base);
    url.searchParams.set('embed', 'true');
    if (prefillName) url.searchParams.set('name', prefillName);
    if (prefillEmail) url.searchParams.set('email', prefillEmail);
    return url.toString();
  };

  useEffect(() => {
    if (!isOpen) {
      setBookingConfirmed(false);
      setConfirmedDetails(null);
      return;
    }

    // Record that visitor opened the booking interface
    recordCallBookingToSupabase({
      name: prefillName || undefined,
      email: prefillEmail || undefined,
      calLink: siteConfig.calLink,
      source,
      status: 'initiated',
    }).catch(console.error);

    // Listen for Cal.com postMessage events
    const handleCalMessage = async (event: MessageEvent) => {
      // Check if message is from Cal.com
      const origin = event.origin || '';
      if (!origin.includes('cal.com')) return;

      try {
        let msg = event.data;
        if (typeof msg === 'string') {
          try {
            msg = JSON.parse(msg);
          } catch {
            return;
          }
        }

        const action = msg?.type || msg?.action;

        // Catch booking successful event from Cal.com iframe
        if (action === 'bookingSuccessful' || action === 'bookingSuccessfulV2') {
          const bookingData = msg?.data?.booking || msg?.data || {};
          const attendeeName = 
            bookingData?.responses?.name || 
            bookingData?.name || 
            prefillName || 
            'Scheduled Visitor';
          const attendeeEmail = 
            bookingData?.responses?.email || 
            bookingData?.email || 
            prefillEmail || 
            'scheduled@client.io';
          const startTime = bookingData?.startTime || bookingData?.date || new Date().toISOString();
          const title = bookingData?.title || 'Discovery Call (20 min)';
          const uid = bookingData?.uid || bookingData?.id;

          // Store confirmed appointment directly into Supabase
          const res = await recordCallBookingToSupabase({
            uid,
            name: attendeeName,
            email: attendeeEmail,
            calLink: siteConfig.calLink,
            source: `${source}_confirmed`,
            status: 'confirmed',
            startTime,
            title,
          });

          setConfirmedDetails({
            name: attendeeName,
            email: attendeeEmail,
            startTime,
            title,
            id: res.id,
          });
          setBookingConfirmed(true);
        }
      } catch (err) {
        console.error('Error handling Cal.com message:', err);
      }
    };

    window.addEventListener('message', handleCalMessage);
    return () => {
      window.removeEventListener('message', handleCalMessage);
    };
  }, [isOpen, prefillName, prefillEmail, source]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-neutral-100">Schedule Discovery Call</span>
            <span className="text-neutral-500">·</span>
            <span className="text-emerald-400">Syncs to Supabase</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.calLink}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-neutral-800 transition-colors"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-850 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto min-h-[550px] relative bg-neutral-950">
          {bookingConfirmed ? (
            /* Booking Confirmed State */
            <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[500px] space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl font-bold text-neutral-50">
                  Your Discovery Call is Scheduled!
                </h3>
              </div>

              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{confirmedDetails?.name}</strong>. A calendar invite has been sent to <strong className="text-white">{confirmedDetails?.email}</strong>.
              </p>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-mono text-left w-full max-w-sm space-y-2">
                <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2">
                  <span>Supabase Record Status:</span>
                  <span className="text-emerald-400 font-semibold">✓ Confirmed & Stored</span>
                </div>
                {confirmedDetails?.id && (
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Database ID:</span>
                    <span className="text-neutral-200">{confirmedDetails.id}</span>
                  </div>
                )}
                {confirmedDetails?.startTime && (
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Meeting Time:</span>
                    <span className="text-indigo-300">{new Date(confirmedDetails.startTime).toLocaleString()}</span>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            /* Embedded Cal.com Iframe */
            <iframe
              src={getEmbedUrl()}
              title="Schedule a Discovery Call"
              className="w-full h-full min-h-[580px] border-0"
              allow="camera; microphone; autoplay; fullscreen"
            />
          )}
        </div>

        {/* Footer info note */}
        <div className="px-5 py-2.5 bg-neutral-950 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure 256-bit automated scheduling</span>
          </div>
          <span>Direct sync to Supabase table: call_bookings</span>
        </div>
      </div>
    </div>
  );
};
