import React, { useState } from 'react';
import { siteConfig } from '../data/projects';
import { Mail, Calendar, ArrowRight, CheckCircle2, Copy, Send, Info } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Open mailto with structured data
    const subject = encodeURIComponent(`Automation Project Inquiry: ${company || name || 'New Project'}`);
    const body = encodeURIComponent(formatInquiryText());
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-2">
                Get in Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
                Have a Process Worth Automating?
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Tell me what your team does manually today. Let's explore how an AI-powered workflow or business automation could eliminate friction, improve turnaround times, and free up your team.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-indigo-400">
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

              <a
                href={siteConfig.calLink}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-indigo-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-neutral-400 block">Book 20-min Discovery Call</span>
                    <span className="text-sm font-semibold text-neutral-200 group-hover:text-indigo-300 transition-colors">
                      Open Cal.com Calendar
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Transparent Backend Note */}
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80 text-xs text-neutral-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Transparent Note:</strong> This form launches a direct pre-filled email draft or lets you copy your inquiry text with one click. In production client deployments, this connects to an n8n webhook endpoint with Supabase and Slack alerts.
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Project Inquiry</span>
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
                  <div className="mt-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/80 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Email client opened! If your email client didn't launch automatically, please copy the inquiry text and send directly to {siteConfig.email}.</span>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
