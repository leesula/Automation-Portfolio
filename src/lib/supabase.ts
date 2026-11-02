import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Resolve Supabase credentials across standard Vite, Next.js, and Vercel integration variables
const supabaseUrl: string = 
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  (import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string) ||
  (import.meta.env.SUPABASE_URL as string) ||
  (typeof process !== 'undefined' ? process.env?.SUPABASE_URL || '' : '') ||
  '';

const supabaseAnonKey: string = 
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  (import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) ||
  (import.meta.env.SUPABASE_ANON_KEY as string) ||
  (typeof process !== 'undefined' ? process.env?.SUPABASE_ANON_KEY || '' : '') ||
  '';

// Create Supabase client singleton if credentials are provided
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface InquiryData {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  requirements: string;
  contactMethod?: string;
  source?: string;
}

export interface CallBookingData {
  uid?: string;
  name?: string;
  email?: string;
  calLink: string;
  source: string;
  status?: string;
  startTime?: string;
  endTime?: string;
  title?: string;
}

/**
 * Saves a prospective client's contact form submission directly into Supabase (table: inquiries).
 */
export async function saveInquiryToSupabase(inquiry: InquiryData): Promise<{ 
  success: boolean; 
  id: string; 
  storageType: 'supabase' | 'local_fallback'; 
  error?: string 
}> {
  const localId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  
  const record = {
    name: inquiry.name.trim(),
    email: inquiry.email.trim().toLowerCase(),
    company: (inquiry.company || '').trim(),
    budget: inquiry.budget || 'Unspecified',
    requirements: inquiry.requirements.trim(),
    contact_method: inquiry.contactMethod || 'Email',
    source: inquiry.source || 'portfolio_contact_form',
    status: 'new',
    created_at: new Date().toISOString(),
  };

  // Always keep a local resilient backup so no lead is ever lost
  try {
    const existing = JSON.parse(localStorage.getItem('supabase_inquiries_backup') || '[]');
    existing.push({ id: localId, ...record });
    localStorage.setItem('supabase_inquiries_backup', JSON.stringify(existing));
  } catch {
    // ignore storage quota issues
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([record])
        .select('id')
        .single();

      if (error) {
        console.warn('Supabase insert warning (check table existence):', error.message);
        // Fallback: If table is missing or RLS blocked, record is still safely captured in backup
        return { 
          success: true, 
          id: localId, 
          storageType: 'local_fallback',
          error: error.message 
        };
      }

      return { 
        success: true, 
        id: data?.id || localId, 
        storageType: 'supabase' 
      };
    } catch (err: any) {
      console.error('Supabase exception:', err);
      return { 
        success: true, 
        id: localId, 
        storageType: 'local_fallback',
        error: err?.message 
      };
    }
  }

  // If Supabase environment variables are pending in local preview
  return { 
    success: true, 
    id: localId, 
    storageType: 'local_fallback' 
  };
}

/**
 * Records a discovery call booking action or intention into Supabase (table: call_bookings).
 */
export async function recordCallBookingToSupabase(booking: CallBookingData): Promise<{ 
  success: boolean; 
  id: string; 
  storageType: 'supabase' | 'local_fallback'; 
  error?: string 
}> {
  const localId = `book_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const fullRecord: Record<string, any> = {
    name: (booking.name || 'Anonymous Visitor').trim(),
    email: (booking.email || 'not_provided@visitor.io').trim().toLowerCase(),
    cal_link: booking.calLink,
    source: booking.source || 'portfolio_discovery_call_button',
    status: booking.status || 'initiated',
    created_at: new Date().toISOString(),
  };

  if (booking.uid) fullRecord.uid = booking.uid;
  if (booking.startTime) fullRecord.start_time = booking.startTime;
  if (booking.endTime) fullRecord.end_time = booking.endTime;
  if (booking.title) fullRecord.title = booking.title;

  const baseRecord = {
    name: fullRecord.name,
    email: fullRecord.email,
    cal_link: fullRecord.cal_link,
    source: fullRecord.source,
    status: fullRecord.status,
    created_at: fullRecord.created_at,
  };

  // Local backup
  try {
    const existing = JSON.parse(localStorage.getItem('supabase_call_bookings_backup') || '[]');
    existing.push({ id: localId, ...fullRecord });
    localStorage.setItem('supabase_call_bookings_backup', JSON.stringify(existing));
  } catch {
    // ignore
  }

  if (supabase) {
    try {
      // First attempt with full appointment schema
      const { data, error } = await supabase
        .from('call_bookings')
        .insert([fullRecord])
        .select('id')
        .single();

      if (!error) {
        return { 
          success: true, 
          id: data?.id || localId, 
          storageType: 'supabase' 
        };
      }

      // If fullRecord failed due to new columns not existing yet in user's DB, retry with baseRecord
      if (error && (error.message.includes('column') || error.code === '42703')) {
        const retryResult = await supabase
          .from('call_bookings')
          .insert([baseRecord])
          .select('id')
          .single();

        if (!retryResult.error) {
          return {
            success: true,
            id: retryResult.data?.id || localId,
            storageType: 'supabase'
          };
        }
      }

      console.warn('Supabase call_bookings notice:', error.message);
      return { 
        success: true, 
        id: localId, 
        storageType: 'local_fallback',
        error: error.message 
      };
    } catch (err: any) {
      console.error('Supabase call_bookings exception:', err);
      return { 
        success: true, 
        id: localId, 
        storageType: 'local_fallback',
        error: err?.message 
      };
    }
  }

  return { 
    success: true, 
    id: localId, 
    storageType: 'local_fallback' 
  };
}
