import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQProps {
  onContactClick: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onContactClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is AI automation?",
      answer: "AI automation combines standard rule-based software with artificial intelligence to handle everyday tasks without constant human intervention. For example, instead of a staff member manually answering repetitive customer questions, typing notes into spreadsheets, or checking calendars to book appointments, an AI automation performs those steps instantly and reliably."
    },
    {
      question: "What types of business processes can you automate?",
      answer: "I focus on customer intake, lead qualification, appointment scheduling, data synchronization, and multi-channel follow-ups. Typical examples include qualifying prospective buyers on WhatsApp, answering inbound phone inquiries with voice AI, syncing website form submissions to your CRM, and updating Google Sheets or Slack channels automatically."
    },
    {
      question: "Can AI agents work with WhatsApp?",
      answer: "Yes. Using the official Meta WhatsApp Business API, AI agents can converse naturally with customers, gather their preferences (such as budget, timeline, and location), recommend relevant products or properties, and offer open appointment slots directly inside their chat."
    },
    {
      question: "Can automation connect with my existing applications?",
      answer: "Absolutely. I design workflows using modern APIs and webhooks that integrate directly with the software you already use—such as Google Sheets, Google Calendar, Supabase, Slack, Gmail, Tally, or custom CRMs. You do not need to replace your existing tools."
    },
    {
      question: "Do I need technical knowledge to use an automation?",
      answer: "Not at all. The systems are designed so business owners, sales reps, and staff can use them through normal everyday interfaces (like WhatsApp, email, or a simple CRM dashboard). All underlying workflow mechanics and data transformations run automatically in the background."
    },
    {
      question: "What happens if an automation stops working?",
      answer: "All workflows include built-in error handling and alerting. If a third-party service is temporarily down or a customer provides unexpected input, the system logs the incident, sends an instant notification to your team, and can fall back to human staff so no customer lead is ever lost."
    },
    {
      question: "Can an existing automation be modified?",
      answer: "Yes. Workflows are built modularly using clean data contracts, which means new criteria, additional questions, new notification channels, or different team calendars can easily be added as your business evolves."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-neutral-900/60 border-b border-neutral-800/80 text-neutral-100 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            <span>Section 08</span>
            <span className="text-neutral-700">·</span>
            <span>Common Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Straightforward answers to the most common questions business owners have about implementing AI automations.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-800/90 bg-neutral-950 hover:border-neutral-700/80 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-neutral-100 flex items-center gap-3">
                    <span className="text-xs font-mono text-indigo-400 font-normal">
                      0{idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-850/60">
                    <p className="pl-6">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Closing Quick Help */}
        <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-850 text-center space-y-2">
          <p className="text-xs sm:text-sm text-neutral-300">
            Have a question about a specific workflow in your business?
          </p>
          <button
            onClick={onContactClick}
            className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Ask a question or request a review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
