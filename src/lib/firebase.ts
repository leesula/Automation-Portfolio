import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocFromServer 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore targeting the provisioned database ID
export const db = getFirestore(
  app, 
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '' 
    ? firebaseConfig.firestoreDatabaseId 
    : '(default)'
);

// Connection test on boot (as required by Firestore integration standards)
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore client appears offline. Please check network and configuration.");
    }
  }
}
testConnection();

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
  name?: string;
  email?: string;
  calLink: string;
  source: string;
  status?: string;
}

/**
 * Saves a prospective client's contact form submission directly into Firestore.
 */
export async function saveInquiryToFirebase(inquiry: InquiryData): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const inquiryRef = doc(db, 'inquiries', inquiryId);

    const payload = {
      name: inquiry.name.trim(),
      email: inquiry.email.trim().toLowerCase(),
      company: (inquiry.company || '').trim(),
      budget: inquiry.budget || 'Unspecified',
      requirements: inquiry.requirements.trim(),
      contactMethod: inquiry.contactMethod || 'Email',
      source: inquiry.source || 'portfolio_contact_form',
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    await setDoc(inquiryRef, payload);
    return { success: true, id: inquiryId };
  } catch (error: any) {
    console.error('Error saving inquiry to Firebase Firestore:', error);
    return { 
      success: false, 
      id: '', 
      error: error?.message || 'Failed to save inquiry to database' 
    };
  }
}

/**
 * Records a discovery call booking action or intention into Firestore.
 */
export async function recordCallBookingToFirebase(booking: CallBookingData): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const bookingId = `book_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const bookingRef = doc(db, 'call_bookings', bookingId);

    const payload = {
      name: (booking.name || 'Anonymous Visitor').trim(),
      email: (booking.email || 'not_provided@visitor.io').trim().toLowerCase(),
      calLink: booking.calLink,
      source: booking.source || 'portfolio_discovery_call_button',
      status: booking.status || 'initiated',
      createdAt: new Date().toISOString(),
    };

    await setDoc(bookingRef, payload);
    return { success: true, id: bookingId };
  } catch (error: any) {
    console.error('Error recording call booking to Firebase Firestore:', error);
    return { 
      success: false, 
      id: '', 
      error: error?.message || 'Failed to record call booking to database' 
    };
  }
}
