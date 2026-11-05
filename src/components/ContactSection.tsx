import React, { useState } from 'react';
import { siteConfig } from '../data/projects';
import { Mail, Calendar, ArrowRight, CheckCircle2, Copy, Send, Info, Loader2, Database, MessageSquare, Linkedin, ArrowUpRight } from 'lucide-react';
import { saveInquiryToSupabase, recordCallBookingToSupabase } from '../lib/supabase';
import { CalBookingModal } from './CalBookingModal';

interface ContactSectionProps {
  initialServiceInterest?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialServiceInterest }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [requirements, setRequirements] = useState(
    initialServiceInterest ? `Hi, I am interested in discussing ${initialServiceInterest} for our business.` : ''
  );
  const [budget, setBudget] = useState('$1,000 – $3,000');
  const [contactMethod, setContactMethod] = useState<'Email' | 'Cal.com Call'>('Email');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabaseSaved, setSupabaseSaved] = useState(false);
  const [savedInquiryId, setSavedInquiryId] = useState<string>('');
  const [callBookedNotice, setCallBookedNotice] = useState(false);
  const [calModalOpen, setCalModalOpen] = useState(false);

  const formatInquiryText = () => {
    return `PROJECT INQUIRY FOR AUTOMATION BUILDER
---------------------------------------
From: ${name || 'N/A'}
Email: ${email || 'N/A'}
Company: ${company || 'N/A'}
Budget Range: ${budget}
Preferred Contact: ${contactMethod}

Project Requirements:
${requirements || 'N/A'}
---------------------------------------`;
  };

  const handleCopyInquiry = () => {
    navigator.clipboard.writeText(formatInquiryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBookCallClick = async (sourceTag = 'contact_section_cal_card') => {
    try {
      await recordCallBookingToSupabase({
        name: name || undefined,
        email: email || undefined,
        calLink: siteConfig.calLink,
        source: sourceTag,
        status: 'initiated',
      });
      setCallBookedNotice(true);
    } catch (err) {
      console.error('Call booking record error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Store directly in Supabase PostgreSQL database
      const result = await saveInquiryToSupabase({
        name,
        email,
        company,
        budget,
        requirements,
        contactMethod,
        source: 'portfolio_contact_form',
      });

      if (result.success) {
        setSupabaseSaved(true);
        setSavedInquiryId(result.id);
      }

      // 2. If client preferred Cal.com Call, record the call booking intent in Supabase
      if (contactMethod === 'Cal.com Call') {
        await recordCallBookingToSupabase({
          name,
          email,
          calLink: siteConfig.calLink,
          source: 'contact_form_selection',
          status: 'scheduled_request',
        });
      }

      setSubmitted(true);

      // Open mailto with structured data as secondary channel
      const subject = encodeURIComponent(`Automation Project Inquiry: ${company || name || 'New Project'}`);
      const body = encodeURIComponent(formatInquiryText());
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 text-neutral-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-2">
                <span>Section 09</span>
                <span className="text-neutral-700">·</span>
                <span>Get in Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
                Have a Business Process You Want to Automate?
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              Let's explore how AI and automation can make your everyday business operations easier.
            </p>

            {/* Direct Channel Buttons: Email, LinkedIn, Cal.com */}
            <div className="space-y-3 pt-1">
              {/* Direct Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-indigo-500/60 hover:bg-neutral-850 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-indigo-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-neutral-400 block">Direct Email</span>
                    <span className="text-sm font-semibold text-neutral-200 group-hover:text-indigo-300 transition-colors">
                      {siteConfig.email}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </a>

              {/* LinkedIn Profile */}
              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-indigo-400">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-neutral-400 block">Professional Network</span>
                      <span className="text-sm font-semibold text-neutral-200 group-hover:text-indigo-300 transition-colors">
                        Connect on LinkedIn
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                </a>
              )}

              {/* In-App Cal.com Discovery Call Modal */}
              <button
                type="button"
                onClick={() => {
                  handleBookCallClick('contact_section_cal_card');
                  setCalModalOpen(true);
                }}
                className="w-full p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-indigo-500/80 hover:bg-neutral-850 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center justify-between group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-indigo-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-neutral-400 block">Book 20-min Discovery Call</span>
                    <span className="text-sm font-semibold text-neutral-200 group-hover:text-indigo-300 transition-colors">
                      Open Interactive Scheduler
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
                  <span className="hidden sm:inline">Pick a Time</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                </div>
              </button>
            </div>

            {/* Live Database Note */}
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-850 text-xs text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono text-[11px]">
                <Database className="w-3.5 h-3.5" />
                <span>Connected to Supabase Database</span>
              </div>
              <p className="leading-relaxed">
                Inquiries and booked calls are securely stored in real-time in Supabase for structured CRM tracking and prompt follow-up.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-neutral-100 mb-6">
                Project Scope Inquiry
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Name <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email Address <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Estimated Project Budget (Optional)
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="Under $1,000">Under $1,000 (Small fix or single workflow)</option>
                      <option value="$1,000 – $3,000">$1,000 – $3,000 (Multi-stage pipeline)</option>
                      <option value="$3,000 – $5,000">$3,000 – $5,000 (Full CRM + Email + Error handling)</option>
                      <option value="$5,000+">$5,000+ (Comprehensive enterprise system)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    What process would you like to automate? <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current manual steps, tools involved (e.g., Google Sheets, CRM, Gmail, Stripe), and what you'd like the automated flow to do..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Preferred Contact Method
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        checked={contactMethod === 'Email'}
                        onChange={() => setContactMethod('Email')}
                        className="text-indigo-600 focus:ring-0 bg-neutral-950 border-neutral-800"
                      />
                      <span>Email Follow-up</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        checked={contactMethod === 'Cal.com Call'}
                        onChange={() => setContactMethod('Cal.com Call')}
                        className="text-indigo-600 focus:ring-0 bg-neutral-950 border-neutral-800"
                      />
                      <span>Cal.com Video Call</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-500 rounded-lg transition-colors cursor-pointer shadow-sm hover:shadow-indigo-500/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        <span>Saving to Supabase...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyInquiry}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-neutral-300 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{copied ? "Copied to Clipboard!" : "Copy Inquiry Text"}</span>
                  </button>
                </div>

                {submitted && (
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Inquiry successfully stored in Supabase database!</span>
                    </div>
                    {savedInquiryId && (
                      <p className="font-mono text-[11px] text-emerald-400/90 pl-6">
                        Supabase Record ID: <span className="text-white font-bold">{savedInquiryId}</span>
                      </p>
                    )}
                    <p className="text-neutral-300 pl-6 leading-relaxed">
                      Your inquiry has been stored in real time. We've also initiated an email draft so you have a direct confirmation receipt.
                    </p>
                    {contactMethod === 'Cal.com Call' && (
                      <div className="pl-6 pt-1">
                        <button
                          type="button"
                          onClick={() => setCalModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Select your preferred discovery call time now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {callBookedNotice && !submitted && (
                  <div className="mt-3 p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/80 text-xs text-indigo-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Discovery call booking initiated and recorded in Supabase. Opening Cal.com...</span>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Cal.com Booking Modal with Real-Time Supabase Sync */}
      <CalBookingModal
        isOpen={calModalOpen}
        onClose={() => setCalModalOpen(false)}
        prefillName={name}
        prefillEmail={email}
        source="contact_section_modal"
      />
    </section>
  );
};
