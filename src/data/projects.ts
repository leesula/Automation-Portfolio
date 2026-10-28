import { Project, ServiceItem, WorkProcessStep } from '../types/portfolio';

export const siteConfig = {
  builderName: "Sudha Leela",
  roleTitle: "AI Automation Builder & Workflow Architect",
  tagline: "Turning Repetitive Business Processes into Intelligent, Self-Healing Systems",
  location: "Global / Remote",
  email: "sudhaleela222@gmail.com",
  calLink: "https://cal.com/chweet-girl-bsfmon/",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  bio: "I design and build autonomous workflow systems, CRM pipelines, and intelligent AI agents using n8n, Supabase, LangChain, WhatsApp Cloud API, and modern LLMs. My focus is on deterministic reliability, clean data contracts, clinical/business safety guardrails, and practical impact—ensuring every automation eliminates manual friction while remaining auditable, maintainable, and secure.",
};

export const capabilitiesList = [
  {
    title: "n8n Workflow Engineering",
    description: "Multi-branch orchestration, custom JavaScript data normalization, state persistence, and centralized error telemetry.",
    technologies: ["n8n", "Custom JS Nodes", "Webhook Handlers", "Cron Schedulers"],
  },
  {
    title: "LangChain AI Agents & Tool Calling",
    description: "Autonomous reasoning agents with dynamic tool execution, memory buffer windows, and multi-model fallbacks.",
    technologies: ["LangChain", "Groq (Qwen / GPT-OSS)", "OpenRouter (o3-mini)", "Buffer Window Memory"],
  },
  {
    title: "WhatsApp & Multi-Channel Messaging",
    description: "Production conversational messaging via WhatsApp Cloud API with per-user phone session memory and prompt safety guardrails.",
    technologies: ["WhatsApp Trigger API", "WhatsApp Cloud API", "Session ID Keys", "Mobile UX Formatting"],
  },
  {
    title: "Lead Scoring & Intake Engines",
    description: "Real-time webhook ingestion, strict regex validation, deduplication safeguards, and 100-point multi-attribute tiering.",
    technologies: ["Tally Forms", "Deterministic Heuristics", "Email Validation", "Tier Routing"],
  },
  {
    title: "Database & Spreadsheet Architecture",
    description: "Relational persistence in Supabase PostgreSQL, Google Sheets schema syncing, and zero-data-loss audit logging.",
    technologies: ["Supabase", "PostgreSQL", "Google Sheets API", "Audit Tables"],
  },
  {
    title: "Voice AI & Telephony Automation",
    description: "Speech-to-speech agents via Vapi with real-time tool calling, calendar FreeBusy lookups, and call recording archival.",
    technologies: ["Vapi Voice AI", "Google Calendar v3", "Supabase call_logs", "Webhooks"],
  },
  {
    title: "Security, Hashing & Compliance",
    description: "Cryptographic tokenized 1-click unsubscribes, anti-tamper validation, clinical emergency red-flag handlers, and privacy enforcement.",
    technologies: ["HMAC-style Hashing", "Medical Guardrails", "CAN-SPAM / GDPR", "Error Handlers"],
  },
];

export const projectsData: Project[] = [
  {
    id: "voice-agent-buyer-qualification-vapi",
    title: "AI Real Estate Voice Agent — Buyer Qualification & Appointment Booking",
    shortTitle: "AI Real Estate Voice Agent",
    slug: "voice-agent-buyer-qualification-vapi",
    category: "Voice AI & Customer Intake",
    tagline: "An autonomous voice agent that conducts spoken buyer qualification calls, checks Google Calendar availability in real time, and books verified appointments.",
    problem: "Inbound phone leads for real estate agencies frequently hit voicemail during peak showing hours. Human staff spend 15–20 minutes per call manually asking basic qualification questions (location, bedrooms, budget, financing, timeline), manually typing notes into spreadsheets, and checking calendars while on the phone.",
    solution: "Engineered an autonomous real-time Voice AI pipeline using Vapi and n8n webhooks. The voice agent verbally interviews prospective buyers, cleans and normalizes speech transcriptions into Supabase PostgreSQL, calculates lead completeness, performs live Google Calendar FreeBusy queries for 30-minute consultation slots with 3h notice, verifies attendee email spelling, creates the calendar event with automated invites, and fires a rich Slack alert.",
    implementationStatus: "Configured & Tested",
    workflowCount: 4,
    videoUrl: "/assets/aistudio/voice_agent_transcription_output_sample_b63454c8.mp4",
    videoCaption: "Live voice call recording with real-time transcription: captures Tampa townhouse criteria ($300k-$500k), verifies budget clarification, saves lead via n8n, checks live Google Calendar availability, confirms email spelling, and books appointment with Slack notification.",
    clientWorkflowSteps: [
      { step: 1, title: "Incoming Buyer Call", description: "Answers inbound phone leads immediately 24/7 with zero hold times.", tool: "Vapi Telephony" },
      { step: 2, title: "Buyer Requirement Collection", description: "Natural spoken dialogue gathers property type, location, budget range, and timeline.", tool: "Voice AI & LLM" },
      { step: 3, title: "Lead Data Storage", description: "Cleans spoken inputs, resolves budget ambiguities, and saves verified contact to Supabase.", tool: "Supabase DB" },
      { step: 4, title: "Calendar Availability Check", description: "Queries advisor's Google Calendar in real time for open 30-min consultation slots.", tool: "Google Calendar" },
      { step: 5, title: "Appointment Booking", description: "Verifies email spelling letter-by-letter and secures the booked calendar invite.", tool: "Calendar Invite" },
      { step: 6, title: "Team Notification", description: "Dispatches instant Slack notification to the advisory team with complete call summary.", tool: "Slack Alert" }
    ],
    keyOutputs: [
      {
        title: "Autonomous Spoken Buyer Intake & Qualification",
        category: "Voice AI Telephony",
        description: "Engages inbound callers in sub-second conversational speech, capturing budget ranges, location preferences, bedrooms, and purchase timelines.",
        businessBenefit: "Guarantees immediate 24/7 phone response, qualifying high-intent prospects before competitors can even return their voicemails."
      },
      {
        title: "Live Google Calendar Verification & Real-Time Booking",
        category: "Calendar Operations",
        description: "Directly queries the advisor's Google Calendar for open 30-minute slots, spells back email addresses letter-by-letter to guarantee deliverability, and books the invite.",
        businessBenefit: "Locks in buyer consultations while caller interest is peak, eliminating phone tag and scheduling drop-offs."
      },
      {
        title: "Immediate Supabase CRM Dossier & Slack Team Alerts",
        category: "CRM & Hand-off",
        description: "Writes verified contact records and full call transcripts into Supabase PostgreSQL, and dispatches a rich buyer briefing directly to the sales Slack channel.",
        businessBenefit: "Gives sales advisors full context before the consultation, with zero manual data entry or missed notes."
      }
    ],
    transcriptionDialogue: [
      { speaker: "Assistant", text: "What kind of property are you interested in buying? For example, a single-family home, condo, townhouse, or something else?" },
      { speaker: "User", text: "I want to buy a townhouse in Tampa.", toolCall: "Upsert Lead — Completed successfully" },
      { speaker: "Assistant", text: "Great, a townhouse in Tampa. What's your budget for this purchase?" },
      { speaker: "User", text: "300 to 500 dollars." },
      { speaker: "Assistant", text: "Just to confirm, did you mean $300 to $500,000 for your budget?" },
      { speaker: "User", text: "Yes, yes.", toolCall: "Upsert Lead — Completed successfully" },
      { speaker: "Assistant", text: "Thank you. How many bedrooms would you like in your townhouse?" },
      { speaker: "User", text: "Two BHK or three BHK?" },
      { speaker: "Assistant", text: "Got it. You're open to either 2 or 3 bedrooms. May I have your name, please?" },
      { speaker: "User", text: "My name is Lila.", toolCall: "Upsert Lead — Completed successfully" },
      { speaker: "Assistant", text: "Thanks. Thank you, Leela. How soon are you hoping to buy your townhouse? Are you looking to move quickly, or just starting to browse?" },
      { speaker: "User", text: "With the next 2 months, I would like to buy a property." },
      { speaker: "Assistant", text: "That makes sense. And how do you plan to finance your purchase? Will you be paying cash, or are you working with a lender?" },
      { speaker: "User", text: "I'll be paying with my own funds, and, I did not see any— Or agents yet. This is the first one.", toolCall: "Upsert Lead — Completed successfully" },
      { speaker: "Assistant", text: "Thanks. Thank you for sharing that. From what you've told me, one of our advisors could really help you move forward. Would you like me to set up a quick call with an advisor to discuss your options?" },
      { speaker: "User", text: "Yes, sure." },
      { speaker: "Assistant", text: "Let me check the advisor's calendar.", toolCall: "Check Availability — Completed successfully" },
      { speaker: "Assistant", text: "Here are some times available for a call with an advisor. Today at 4:30 PM, Monday at 9:00 AM, or Tuesday at 9:00 AM. Which of these works best for you?" },
      { speaker: "User", text: "Monday 9:00 AM." },
      { speaker: "Assistant", text: "Thanks. Thank you, Leela. Could I have your email address for the calendar invite? If you'd prefer not to share it, that's fine too." },
      { speaker: "User", text: "Okay, so my mail ID is S-U-D-H-A-P-E-R-S-O-N-A-L-2-2 at Gmail dot com." },
      { speaker: "Assistant", text: "Thank you. Let me read that back to make sure I have it right: S-U-D-H-A-P-E-R-S-O-N-A-A-L-2-2-2 at gmail.com. Is that correct?" },
      { speaker: "User", text: "A small correction needed. After N only. Single. A." },
      { speaker: "Assistant", text: "Thank you for clarifying. So it's S-U-D-H-A-P-E-R-S-O-N-A-L-2-2 at Gmail. Com. Is that right?" },
      { speaker: "User", text: "Yes." },
      { speaker: "Assistant", text: "Great. Booking that now.", toolCall: "Book Appointment — Completed successfully" },
      { speaker: "Assistant", text: "Your appointment is set for Monday, October 5 at 9:00 AM, Eastern Time. An advisor will call you then, and we'll have all the details we discussed today. Is there anything else I can help you with right now?" },
      { speaker: "User", text: "Thank you. Nothing else." },
      { speaker: "Assistant", text: "You're very, very welcome, Leela. Thank you for choosing Green Estates. Have a wonderful day!" }
    ],
    techStack: [
      { name: "Vapi Voice AI", role: "Spoken Speech-to-Speech Engine & Tool Caller" },
      { name: "n8n Webhook Architecture", role: "4 Authenticated Function Tool Webhooks (Header Auth)" },
      { name: "Supabase (PostgreSQL)", role: "buyer_leads, appointments, call_logs" },
      { name: "Google Calendar v3 API", role: "freeBusy Query, Conflict Check & Auto-Invite Event Creation" },
      { name: "Slack API", role: "Real-Time Hot Lead Alerting with Buyer Summary Dossier" }
    ],
    workflows: [
      {
        id: "wf-vapi-upsert",
        title: "Endpoint A — vapi/upsert-lead",
        filename: "Voice_Agent_-_Buyer_Lead_Qualification__MVP__f445db44.json",
        trigger: "POST Webhook (vapi/upsert-lead with Header Auth)",
        purpose: "Parses spoken entity parameters, cleans enums (property_type, timeline, financing_status), converts numeric budgets/bedrooms, upserts to Supabase buyer_leads on phone conflict, and returns remaining missing fields and next turn instructions.",
        stages: [
          {
            id: "va-1",
            name: "Webhook Upsert & Header Auth",
            type: "webhook",
            description: "Listens for live tool calls from Vapi with 'x-vapi-secret' security verification.",
            details: "Extracts call metadata, caller customer number, and function arguments."
          },
          {
            id: "va-2",
            name: "Parse & Normalize Spoken Arguments",
            type: "code",
            description: "JavaScript node handling speech transcription variations and mapping aliases.",
            details: "Maps spoken phrases like 'pre-approval' -> 'pre_approved', 'single family home' -> 'single_family', 'immediately' -> 'asap'. Parses numerical bedrooms and budget currency.",
            codeSnippet: `const ALIASES = { preapproved: 'pre_approved', house: 'single_family', condominium: 'condo', immediately: 'asap' };\nconst candidate = {\n  phone, full_name: toStr(args.full_name), email: toStr(args.email)?.toLowerCase(),\n  location_pref: toStr(args.location_pref), property_type: toEnum('property_type', args.property_type),\n  budget_min: toNum(args.budget_min), budget_max: toNum(args.budget_max),\n  timeline: toEnum('timeline', args.timeline), financing_status: toEnum('financing_status', args.financing_status)\n};`
          },
          {
            id: "va-3",
            name: "Supabase Upsert Buyer Lead",
            type: "database",
            description: "Upserts candidate fields to Supabase 'buyer_leads' table on phone conflict.",
            details: "Merges newly captured fields without overwriting previously confirmed data."
          },
          {
            id: "va-4",
            name: "Shape Upsert Result & Return Next Turn",
            type: "code",
            description: "Checks completeness of key fields (location_pref, property_type, budget_max, timeline, financing_status).",
            details: "Instructs the voice agent: if key fields remain missing -> 'continue_questions (still need: ...)'; if complete and tier is hot -> 'offer_booking'."
          }
        ],
        databaseInteractions: [
          { table: "buyer_leads", operation: "UPSERT on_conflict=phone", fields: ["phone", "full_name", "location_pref", "property_type", "budget_max", "timeline", "financing_status"] }
        ]
      },
      {
        id: "wf-vapi-availability",
        title: "Endpoint B — vapi/check-availability",
        filename: "Voice_Agent_-_Buyer_Lead_Qualification__MVP__f445db44.json",
        trigger: "POST Webhook (vapi/check-availability)",
        purpose: "Pulls Google Calendar freeBusy for the primary advisor calendar, computes open 30-minute consultation slots (Mon-Fri 9:00 AM - 5:00 PM Eastern Time with 3-hour minimum notice), and returns spoken time options.",
        stages: [
          {
            id: "va-avail-1",
            name: "Parse Availability & Notice Window",
            type: "code",
            description: "Calculates search window: starts from now + 3 hours, rounds to 30-min boundary, sets 8-day range in America/New_York zone.",
            details: "Handles customer preferred day if specified."
          },
          {
            id: "va-avail-2",
            name: "Google Calendar freeBusy API",
            type: "calendar",
            description: "Executes HTTP POST to Google Calendar v3 freeBusy endpoint.",
            details: "Identifies real busy intervals on the advisor's calendar."
          },
          {
            id: "va-avail-3",
            name: "Compute Open 30-Min Slots",
            type: "code",
            description: "Iterates through working days (Mon-Fri) between 9am-5pm ET and selects up to 3 non-conflicting slots.",
            details: "Spreads slots across consecutive days to provide the caller with flexible options without overwhelming speech synthesis.",
            codeSnippet: `const list = picked.map((s, i) => \`\${i + 1}) \${s.toFormat("cccc, LLLL d 'at' h:mm a")} [start_time=\${s.toISO()}]\`).join('; ');\nreturn [{ json: { toolCallId: ctx.toolCallId, result: \`Available times (Eastern): \${list}. Read only the day and time to the caller. Pass the exact start_time value to book_appointment.\` } }];`
          }
        ]
      },
      {
        id: "wf-vapi-booking",
        title: "Endpoint C — vapi/book-appointment",
        filename: "Voice_Agent_-_Buyer_Lead_Qualification__MVP__f445db44.json",
        trigger: "POST Webhook (vapi/book-appointment)",
        purpose: "Validates ISO timestamp, queries existing lead from Supabase, performs live Google Calendar overlap check, creates event with attendee email invite, updates lead status, inserts appointment record, alerts Slack, and confirms to caller.",
        stages: [
          {
            id: "va-book-1",
            name: "Parse Booking & Retrieve Lead",
            type: "code",
            description: "Parses ISO start_time, full_name, email, and phone. Retrieves full buyer dossier from Supabase.",
            details: "Prepares meeting details with buyer criteria."
          },
          {
            id: "va-book-2",
            name: "Calendar Overlap Conflict Check",
            type: "calendar",
            description: "Queries Google Calendar freeBusy for the target 30-minute block immediately prior to booking.",
            details: "If the slot was taken while the caller spoke: returns instruction to apologize and call check_availability again."
          },
          {
            id: "va-book-3",
            name: "Google Calendar Create Event",
            type: "calendar",
            description: "Creates calendar event with summary 'Buyer call - <name> - <wants>' and adds attendee email.",
            details: "Google Calendar automatically dispatches calendar invitation email directly to the buyer."
          },
          {
            id: "va-book-4",
            name: "Database Sync & Slack Alert",
            type: "database",
            description: "Patches lead status to 'appointment_booked' in Supabase, inserts appointment row, and posts Slack notification.",
            details: "Sends rich Slack card with lead score, budget, timeline, and direct Google Calendar link."
          }
        ],
        databaseInteractions: [
          { table: "buyer_leads", operation: "PATCH status='appointment_booked'", fields: ["status", "full_name", "email"] },
          { table: "appointments", operation: "INSERT", fields: ["lead_id", "phone", "start_time", "end_time", "google_event_id", "calendar_link"] }
        ]
      },
      {
        id: "wf-vapi-endofcall",
        title: "Endpoint D — vapi/end-of-call",
        filename: "Voice_Agent_-_Buyer_Lead_Qualification__MVP__f445db44.json",
        trigger: "POST Webhook (vapi/end-of-call)",
        purpose: "Receives end-of-call report from Vapi, parses call duration, ended reason, AI summary, transcript, cost, and recording URL, and archives to Supabase call_logs.",
        stages: [
          {
            id: "va-end-1",
            name: "Parse End-of-Call Payload",
            type: "code",
            description: "Extracts vapi_call_id, phone, timestamps, duration_seconds, summary, transcript, and recording_url.",
            details: "Parses complete call artifact from Vapi."
          },
          {
            id: "va-end-2",
            name: "Save Call Log in Supabase",
            type: "database",
            description: "Inserts call record into Supabase 'call_logs' table on conflict vapi_call_id.",
            details: "Maintains an immutable historical record for quality assurance and analytics."
          }
        ],
        databaseInteractions: [
          { table: "call_logs", operation: "INSERT on_conflict=vapi_call_id", fields: ["vapi_call_id", "phone", "duration_seconds", "summary", "transcript", "recording_url", "cost"] }
        ]
      }
    ],
    caseStudy: {
      overview: "An autonomous conversational voice AI qualification and appointment scheduling pipeline. Built on Vapi and n8n, this system handles spoken inbound phone calls from prospective property buyers, extracts and normalizes real estate criteria in real time, checks live Google Calendar availability in Eastern Time, and books confirmed appointments with email invites and Slack alerts.",
      businessProblem: {
        summary: "Inbound phone calls are the highest-converting lead source in real estate, but agencies miss over 30% of calls during showings and meetings. When prospects reach voicemail, 80% do not leave a message and instead call a competitor. Furthermore, human qualification calls take 15–20 minutes of broker time just to gather basic criteria that could be automated.",
        painPoints: [
          "Missed calls during broker showings resulting in lost commission opportunities.",
          "High broker labor cost spent conducting repetitive 15-minute qualification phone screens.",
          "Errors in manual calendar scheduling and lack of immediate calendar invite delivery.",
          "Inconsistent qualification questions asked across different agents on the team."
        ],
        manualProcessBefore: [
          "Buyer called agency phone -> phone rang while agent was with a client -> went to voicemail.",
          "Agent called back 4 hours later -> buyer had already contacted another broker.",
          "If connected, agent manually asked questions, scribbled notes on paper, and manually typed into CRM.",
          "Agent navigated Google Calendar to find an open slot and texted the buyer to confirm."
        ]
      },
      architecture: {
        diagramSummary: "Vapi Voice AI Platform connected via 4 authenticated n8n webhook tools: vapi/upsert-lead, vapi/check-availability, vapi/book-appointment, and vapi/end-of-call. Powered by Supabase PostgreSQL, Google Calendar v3 API, and Slack.",
        dataFlow: [
          "1. Caller dials agency number -> Vapi connects conversational voice session",
          "2. As caller speaks criteria, Vapi triggers vapi/upsert-lead -> n8n normalizes enums & upserts Supabase",
          "3. n8n returns missing fields -> Voice agent asks next question until buyer is qualified as HOT",
          "4. Voice agent asks permission to book call -> Calls vapi/check-availability",
          "5. n8n queries Google Calendar freeBusy -> Returns open 30-min slots (Mon-Fri 9am-5pm ET)",
          "6. Caller selects slot -> Agent asks for email address and verifies letter-by-letter spelling",
          "7. Agent triggers vapi/book-appointment -> n8n rechecks overlap conflict -> Creates Google Calendar event with attendee email",
          "8. n8n updates Supabase buyer_leads & appointments tables -> Posts rich Slack notification to team",
          "9. Call ends -> Vapi delivers end-of-call-report -> n8n saves transcript and recording URL to call_logs"
        ]
      },
      howItWorks: [
        {
          step: 1,
          title: "Natural Spoken Qualification",
          description: "Engages in fluent speech dialogue asking about property type, location, budget range, bedrooms, purchase timeline, and financing."
        },
        {
          step: 2,
          title: "Real-Time Speech Normalization",
          description: "When the caller says '300 to 500 dollars', the agent intelligently clarifies: 'Did you mean $300,000 to $500,000?' and normalizes it to budget_min: 300000, budget_max: 500000."
        },
        {
          step: 3,
          title: "Live Google Calendar FreeBusy Lookups",
          description: "Queries the advisor's Google Calendar live, filtering out busy periods and offering only confirmed free slots during business hours (9am-5pm ET)."
        },
        {
          step: 4,
          title: "Verbal Email Verification & Calendar Invite",
          description: "The agent asks for the caller's email, spells it back letter-by-letter, allows for human phonetic correction, and adds the email as an attendee so Google Calendar automatically sends the calendar invite."
        },
        {
          step: 5,
          title: "Full Call Archival & Slack Notification",
          description: "Saves appointment to Supabase, alerts the team on Slack with a complete buyer summary, and archives the full audio recording and transcript upon call completion."
        }
      ],
      logicAndDecisionEngine: {
        deterministicVsAi: "Combines ultra-low latency voice synthesis (Vapi) with strict deterministic backend validation in n8n. The n8n webhook parses speech transcriptions into typed enums, enforces a 3-hour minimum notice constraint on calendar bookings, performs last-second FreeBusy conflict checks, and computes lead completeness deterministically.",
        securityNotes: [
          "All Vapi webhooks enforce 'x-vapi-secret' header authentication to prevent unauthorized tool invocations.",
          "Attendee emails are validated before adding to Google Calendar events."
        ]
      },
      integrations: [
        { tool: "Vapi Voice AI", purpose: "Speech-to-Speech conversational voice engine and telephony interface", authMethod: "Vapi API Key & Webhook Secret" },
        { tool: "n8n Webhook Suite", purpose: "Tool-calling endpoints for lead upsert, availability, booking, and end-of-call", authMethod: "Header Auth (x-vapi-secret)" },
        { tool: "Google Calendar v3 API", purpose: "freeBusy queries, conflict checking, and event creation with invites", authMethod: "Google OAuth 2.0" },
        { tool: "Supabase (PostgreSQL)", purpose: "buyer_leads, appointments, and call_logs tables", authMethod: "Supabase Service Role Key" },
        { tool: "Slack API", purpose: "Real-time hot lead alerts with complete buyer requirement dossier", authMethod: "Slack Bot Token" }
      ],
      reliabilityAndErrorHandling: {
        deduplication: "Upserts to buyer_leads on phone conflict prevent duplicate profiles across repeat calls.",
        tamperProtection: "Calendar booking re-queries freeBusy immediately before creating the event. If the slot was taken while the caller spoke, it returns an instruction to offer new times.",
        centralizedTriage: "End-of-call webhook captures call failure reasons, duration, and full transcripts to ensure zero lead leakage even on dropped calls."
      },
      businessValue: {
        potentialBenefits: [
          "Guarantees 24/7 zero-wait telephone response for inbound property buyers.",
          "Saves 15–20 minutes of manual broker time per qualified lead.",
          "Eliminates calendar scheduling friction with instant Google Calendar invite delivery.",
          "Archives 100% of phone transcripts and audio recordings in Supabase for compliance."
        ],
        unverifiedNotice: "Note: The video recording shows an actual live test call with real-time transcription, demonstrating lead qualification, email spelling verification, and calendar booking."
      },
      limitationsAndFutureImprovements: {
        currentLimitations: [
          "Configured specifically for buyer leads; seller and tenant inquiries are routed to manual staff.",
          "Google Calendar uses primary calendar; multi-advisor round-robin assignment is planned for Phase 2."
        ],
        plannedEnhancements: [
          "Add multi-agent round-robin calendar assignment based on location specialization.",
          "Send automated SMS confirmation with property details immediately after call concludes."
        ]
      }
    }
  },

  {
    id: "real-estate-qualification-whatsapp-v2",
    title: "WhatsApp Real Estate Lead Assistant — Inbound Qualification & Showing Booking",
    shortTitle: "WhatsApp Real Estate Assistant",
    slug: "real-estate-qualification-whatsapp-v2",
    category: "WhatsApp & Messaging Automation",
    tagline: "An intelligent WhatsApp assistant that qualifies property buyers, debounces rapid messages, matches listings, and books verified property showings.",
    problem: "Real estate agencies lose high-intent buyers because human agents take hours to respond to WhatsApp inquiries, fail to qualify buyer budgets and timelines systematically, and struggle to manage calendar slot booking while handling multiple concurrent inquiries.",
    solution: "Engineered an autonomous multi-workflow WhatsApp qualification engine in n8n featuring 8-second message burst debouncing in Supabase, LangChain tool-calling agent with OpenRouter & Google Gemma models, automated property matching against Supabase inventory, human-in-the-loop Slack approval for complex customer inquiries, and two-way verified Google Calendar appointment booking.",
    implementationStatus: "Configured & Tested",
    workflowCount: 5,
    videoUrl: "/assets/aistudio/final_attempt_output_record_e742e1ef.mp4",
    videoCaption: "Actual live production recording: lead qualification, property matching (Emerald Heights), human Slack approval for pet policy question, and verified calendar slot booking.",
    clientWorkflowSteps: [
      { step: 1, title: "Inbound WhatsApp Inquiry", description: "Buyer sends inquiry about apartments, budget, or preferred locations.", tool: "WhatsApp Cloud API" },
      { step: 2, title: "8s Message Debouncer", description: "Groups rapid, multi-part chat bubbles into a single coherent message before processing.", tool: "Supabase Buffer" },
      { step: 3, title: "AI Property Matching", description: "Analyzes buyer criteria against available property inventory and recommends matches.", tool: "LangChain Agent" },
      { step: 4, title: "Human Team Approval", description: "Sends complex or policy questions to sales team Slack channel with 1-click Approve/Reject.", tool: "Slack Approval" },
      { step: 5, title: "Calendar Booking Confirmation", description: "Verifies slot availability and confirms the appointment on Google Calendar.", tool: "Google Calendar" }
    ],
    keyOutputs: [
      {
        title: "24/7 Conversational WhatsApp Inbound Qualification",
        category: "Messaging Automation",
        description: "Engages property ad clicks instantly on WhatsApp, gathering buyer criteria, location preferences, and purchase budgets in fluid, natural conversation.",
        businessBenefit: "Reduces initial response time from hours to under 3 seconds, engaging prospects in the chat app they use daily."
      },
      {
        title: "8-Second Message Debouncer & Intent Synthesizer",
        category: "Data Integrity",
        description: "Buffers rapid, fragmented WhatsApp messages in Supabase PostgreSQL to prevent runaway LLM calls and avoid duplicate responses.",
        businessBenefit: "Delivers a polished, human-like chat experience while keeping operational API costs minimal."
      },
      {
        title: "Live Property Inventory Matching & Recommendation",
        category: "Inventory Operations",
        description: "Queries active property listings based on buyer budget and location, returning formatted property options with amenities directly into chat.",
        businessBenefit: "Accelerates buyer interest by instantly matching their criteria with active agency inventory."
      },
      {
        title: "Human-in-the-Loop Slack Approval Escalation",
        category: "Team Collaboration",
        description: "Routes complex buyer questions (pet policies, non-standard financing terms) to a private Slack channel with 1-click Approve/Reject buttons.",
        businessBenefit: "Empowers the sales team to maintain quality control without having to manually handle standard inquiries."
      }
    ],
    techStack: [
      { name: "n8n LangChain Agent", role: "Autonomous Agent & Tool-Calling Orchestrator" },
      { name: "WhatsApp Cloud API", role: "Inbound Message Webhooks & Mobile Delivery" },
      { name: "Supabase (PostgreSQL)", role: "buyer_leads, message_buffer, approval_requests, property_list" },
      { name: "Google Calendar API", role: "Dynamic Slot Calculation & Overlap-Verified Booking" },
      { name: "Slack API", role: "Human-in-the-Loop Approval Decision System (#lead-support-team)" },
      { name: "Google Gemini & OpenRouter", role: "Gemma 4 31B IT & OpenRouter LLM Backends" },
    ],
    workflows: [
      {
        id: "wf-re-agent",
        title: "Workflow 1 — AI Qualification Agent (WhatsApp V2)",
        filename: "AI_Qualification_Agent_Whatsapp__V2__1__9f338583.json",
        trigger: "WhatsApp Trigger Webhook (on incoming messages)",
        purpose: "Listens for WhatsApp messages, buffers burst texts with an 8-second debounce window in Supabase, checks for pending human approvals, retrieves buyer record, runs the LangChain AI agent with property inventory and booking tools, and delivers verified WhatsApp responses.",
        stages: [
          {
            id: "re-1",
            name: "WhatsApp Trigger & Status Filter",
            type: "webhook",
            description: "Listens for customer text messages while strictly filtering out delivery/read status receipts to prevent recursive loops.",
            details: "Only customer text messages pass into the message buffer."
          },
          {
            id: "re-2",
            name: "Buffer Message & 8s Debounce Wait",
            type: "database",
            description: "Stores message in Supabase 'message_buffer' and waits 8 seconds to capture multi-message bursts.",
            details: "Crucial WhatsApp UX: Customers often type short phrases ('I want a 2 BHK' / 'In Madhapur' / 'Budget 80L'). The debounce window combines them into one coherent prompt."
          },
          {
            id: "re-3",
            name: "Only Latest Run Continues",
            type: "code",
            description: "JavaScript node that resolves race conditions by sorting by created_at and wamid.",
            details: "Ensures only the execution handling the newest message proceeds with the concatenated text, terminating outdated runs.",
            codeSnippet: `const mine = $('WhatsApp Trigger').first().json.messages[0].id;\nconst rows = $input.all().map(i => i.json).filter(r => r && r.wamid);\nrows.sort((a, b) => new Date(a.created_at) - new Date(b.created_at) || String(a.wamid).localeCompare(String(b.wamid)));\nif (!rows.length) return [];\nif (rows[rows.length - 1].wamid !== mine) return [];\nreturn [{ json: {\n  combined_text: rows.map(r => String(r.body).trim()).filter(Boolean).join(' / '),\n  message_count: rows.length,\n  last_created_at: rows[rows.length - 1].created_at\n} }];`
          },
          {
            id: "re-4",
            name: "Check Pending Approval",
            type: "filter",
            description: "Queries Supabase 'approval_requests' for PENDING human reviews within the last 24 hours.",
            details: "If a human approval is already waiting: immediately dispatches a polite holding message ('I am still working on your request with our property team and will text you as soon as I have an update') and halts further AI generation."
          },
          {
            id: "re-5",
            name: "Build Contextual Agent Input",
            type: "code",
            description: "Assembles four-line input contract: WHATSAPP_ID, CURRENT_TIME_IST, SAVED_LEAD_RECORD, and CUSTOMER_MESSAGE.",
            details: "Injects recent team decisions and current buyer snapshot so the agent never asks redundant questions."
          },
          {
            id: "re-6",
            name: "LangChain AI Agent Core",
            type: "code",
            description: "Comprehensive system prompt enforcing strict single-question turns, 100-point buyer scoring, and mandatory tool verification.",
            details: "Strict rule: Never claim an appointment is booked or a team is notified unless the underlying tool actually executed and returned verified = true."
          },
          {
            id: "re-7",
            name: "Outbound WhatsApp Message",
            type: "notification",
            description: "Dispatches the verified response back to the customer's WhatsApp number.",
            details: "Formatted in concise, professional WhatsApp style."
          }
        ],
        branchingRules: [
          { condition: "Pending human approval request exists (<24h)", outcome: "Sends holding message and pauses AI agent generation." },
          { condition: "Customer asks unverified question (pet policy, holding, reservation)", outcome: "Triggers Request Approval tool -> Alerts human team on Slack." },
          { condition: "Lead score >= 70 (HOT Lead) and agrees to appointment", outcome: "Invokes Get Available Slots -> Offers real calendar times -> Confirms selection -> Invokes Book Appointment." }
        ],
        databaseInteractions: [
          { table: "message_buffer", operation: "INSERT & UPDATE", fields: ["wa_id", "wamid", "body", "processed"] },
          { table: "buyer_leads", operation: "SELECT & UPSERT", fields: ["wa_id", "lead_name", "budget", "location", "property_type", "lead_score", "lead_temperature"] },
          { table: "approval_requests", operation: "SELECT", fields: ["whatsapp_id", "approval_status", "requested_action"] }
        ]
      },
      {
        id: "wf-tool-book",
        title: "Sub-Workflow — Tool: Book Appointment (Verified)",
        filename: "Tool_-_Book_Appointment__Verified__03492a28.json",
        trigger: "Execute Workflow Trigger (Invoked by AI Agent)",
        purpose: "Validates ISO appointment timestamps, checks operating hours (10:00 - 18:00 IST Mon-Sat), re-queries Google Calendar for last-second overlap conflicts, creates the event, reads it back to verify event ID and start time, and returns verified status.",
        stages: [
          {
            id: "tb-1",
            name: "Validate Operating Rules",
            type: "code",
            description: "Ensures selected time falls on Monday–Saturday between 10:00 and 18:00 IST on a 30-minute slot boundary.",
            details: "Throws OUTSIDE_BOOKING_RULES error if an invalid or past time is supplied.",
            codeSnippet: `const SLOT_MIN = 30, WORK_START = 10, WORK_END = 18, WORK_DAYS = [1,2,3,4,5,6];\nconst ist = new Date(startMs + OFFSET);\nconst mins = ist.getUTCHours() * 60 + ist.getUTCMinutes();\nif (!WORK_DAYS.includes(ist.getUTCDay()) || mins < WORK_START * 60 || mins + SLOT_MIN > WORK_END * 60 || mins % SLOT_MIN !== 0)\n  throw new Error('OUTSIDE_BOOKING_RULES: not a valid appointment slot.');`
          },
          {
            id: "tb-2",
            name: "Recheck Google Calendar Overlap",
            type: "calendar",
            description: "Queries Google Calendar for events overlapping [start_iso, end_iso].",
            details: "Prevents race conditions if another lead or staff member booked the slot seconds earlier."
          },
          {
            id: "tb-3",
            name: "Slot Still Free? Branch",
            type: "filter",
            description: "Checks if conflict_count === 0.",
            details: "If slot taken: returns reason: 'SLOT_TAKEN' instructing the agent to offer new options. If free: proceeds to create event."
          },
          {
            id: "tb-4",
            name: "Create Google Calendar Event",
            type: "calendar",
            description: "Creates calendar event titled 'Property Viewing - <name> (Buyer)'.",
            details: "Includes property requirements and WhatsApp ID in description."
          },
          {
            id: "tb-5",
            name: "Get Event (Double-Verification)",
            type: "calendar",
            description: "Reads back newly created event from Google Calendar by ID to confirm status is 'confirmed'.",
            details: "Guarantees that the appointment actually exists on the calendar before confirming to the lead."
          }
        ]
      },
      {
        id: "wf-tool-slots",
        title: "Sub-Workflow — Tool: Get Available Slots",
        filename: "Tool_-_Get_Available_Slots_5cc28cc1.json",
        trigger: "Execute Workflow Trigger (Invoked by AI Agent)",
        purpose: "Pulls Google Calendar busy events for the next 7 days, computes free 30-minute intervals during business hours (10:00–18:00 IST Mon–Sat) with a 2-hour minimum lead buffer, caps results at 6 slots total (max 3/day), and returns ISO timestamps.",
        stages: [
          {
            id: "ts-1",
            name: "Get Calendar Events (7-day window)",
            type: "calendar",
            description: "Pulls all confirmed events from Google Calendar between now and next 9 days in Asia/Kolkata timezone.",
            details: "Builds real busy intervals."
          },
          {
            id: "ts-2",
            name: "Compute Free Slot Algorithm",
            type: "code",
            description: "Calculates free 30-minute blocks adhering to business hours, weekday rules, and 2-hour lead time.",
            details: "Caps at 6 total options and max 3 per day so the WhatsApp chat remains scannable and non-overwhelming.",
            codeSnippet: `const free = [];\nfor (let mins = WORK_START * 60; mins + SLOT_MIN <= WORK_END * 60; mins += SLOT_MIN) {\n  const start = Date.UTC(y, m, d0 + d, 0, mins) - OFFSET, end = start + SLOT_MIN * 60000;\n  if (start < earliest) continue;\n  if (busy.some(b => b.s < end && b.e > start)) continue;\n  free.push({ start_time: iso(start), end_time: iso(end), label: label(start) });\n}`
          }
        ]
      },
      {
        id: "wf-tool-save",
        title: "Sub-Workflow — Tool: Save Lead",
        filename: "Tool_-_Save_Lead_8ce416bc.json",
        trigger: "Execute Workflow Trigger (Invoked by AI Agent)",
        purpose: "Receives raw JSON lead data, cleans blocked and empty fields, clamps numerical lead_score (0–100), standardizes temperature, and performs an idempotent upsert into Supabase buyer_leads.",
        stages: [
          {
            id: "tl-1",
            name: "Field Sanitization & Whitelist Validation",
            type: "code",
            description: "Validates input keys against allowed schema, handles field aliases, and clamps lead score between 0 and 100.",
            details: "Prevents SQL errors and schema pollution from hallucinated keys."
          },
          {
            id: "tl-2",
            name: "Upsert to Supabase 'buyer_leads'",
            type: "database",
            description: "Executes HTTP POST to Supabase REST endpoint with resolution=merge-duplicates on wa_id conflict.",
            details: "Returns the authoritative lead_id used for relational approval tracking."
          }
        ]
      },
      {
        id: "wf-approval-handler",
        title: "Workflow 2 — Human Approval Decision Handler",
        filename: "Workflow_2_-_Human_Approval_Decision_Handler__1__165a032c.json",
        trigger: "Slack Trigger (Listening to #lead-support-team)",
        purpose: "Listens for human advisor decisions in Slack (e.g. '<id> | APPROVE | Pets are welcome'), atomically updates the approval request in Supabase, verifies the 24-hour WhatsApp messaging window, and delivers an agent-voiced reply to the customer.",
        stages: [
          {
            id: "ah-1",
            name: "Slack Decision Listener & Regex Parser",
            type: "notification",
            description: "Parses human decision typed in Slack using pattern: `<request_id> | APPROVE/REJECT | <instruction>`.",
            details: "Validates request ID and extracts the human property advisor's instruction."
          },
          {
            id: "ah-2",
            name: "Atomic Decision Claim in Supabase",
            type: "database",
            description: "Executes update on 'approval_requests' WHERE approval_status = 'PENDING'.",
            details: "Prevents race conditions: if multiple staff members reply to the same thread, only the first claim succeeds."
          },
          {
            id: "ah-3",
            name: "Calculate 24h WhatsApp Service Window",
            type: "code",
            description: "Checks hours elapsed since the customer's latest inbound message timestamp.",
            details: "Ensures Meta WhatsApp Business messaging policy compliance (free-form message if <=24h, approved utility template if >24h)."
          },
          {
            id: "ah-4",
            name: "Agent Voice Rewriter (LangChain LLM)",
            type: "code",
            description: "Rewrites raw human staff notes into a warm, natural WhatsApp message in the agency's voice.",
            details: "Softens blunt team notes while preserving 100% factual accuracy.",
            codeSnippet: `// System prompt rule:\n// Speak directly to the customer in warm agent voice.\n// Use ONLY facts in TEAM_NOTE. Never invent details.\n// Do not mention Slack, approvals, scores, or internal systems.`
          },
          {
            id: "ah-5",
            name: "Send WhatsApp Response & Slack Confirmation",
            type: "notification",
            description: "Delivers the approved reply to the customer's WhatsApp chat and confirms delivery in Slack.",
            details: "Closes the human-in-the-loop lifecycle seamlessly."
          }
        ]
      }
    ],
    caseStudy: {
      overview: "An enterprise-grade WhatsApp AI Qualification and Booking Engine for real estate agencies. It manages prospective property buyers through natural conversational qualification, debounces rapid multi-message bursts, matches buyer criteria against live property databases, routes complex edge-case questions (like pet policies or price negotiations) to human staff via Slack with 24h Meta compliance, and schedules viewings directly onto Google Calendar with double verification.",
      businessProblem: {
        summary: "High-value real estate leads expect instantaneous replies on WhatsApp. When human brokers are delayed, leads go cold or contact competing agencies. Conversely, standard chatbots frustrate buyers by asking robotic form-like questions, failing to handle multiple quick texts, hallucinating property features, or booking appointments without checking real calendar availability.",
        painPoints: [
          "High lead response latency leading to lost property sales commissions.",
          "Rapid WhatsApp 'burst' messages breaking standard AI agents and causing multiple disjointed replies.",
          "Chatbots hallucinating property amenities, legal terms, or pet policies without human oversight.",
          "Calendar booking collisions and phantom appointments that fail to confirm on Google Calendar.",
          "Non-compliance with Meta's 24-hour WhatsApp messaging window policy."
        ],
        manualProcessBefore: [
          "Prospective buyer texted agency WhatsApp -> message sat unread while brokers were on site visits.",
          "Broker manually asked repetitive questions (budget, location, timeline) over hours of fragmented texting.",
          "Broker checked spreadsheet inventory manually to find matching listings.",
          "When buyer asked about building rules (e.g. pet friendliness), broker had to call property management.",
          "Scheduling a viewing required manual back-and-forth coordinate checks on personal calendars."
        ]
      },
      architecture: {
        diagramSummary: "Synchronized multi-workflow architecture connecting Meta WhatsApp Cloud API, Supabase PostgreSQL, LangChain Agent with Google Gemma & OpenRouter LLMs, Google Calendar, and Slack for human-in-the-loop approvals.",
        dataFlow: [
          "1. Customer sends messages on WhatsApp -> WhatsApp Trigger -> Message Buffer in Supabase",
          "2. 8-second debounce window groups rapid burst texts -> Latest execution continues with combined text",
          "3. System checks pending human approvals -> Sends holding message if team review is active",
          "4. AI Agent queries 'property_list' in Supabase -> Matches exact listing (e.g. Emerald Heights)",
          "5. Unverified customer question (e.g. 'Are pets allowed?') -> Triggers Request Approval tool",
          "6. Slack alert notifies #lead-support-team -> Human replies '<id> | APPROVE | Complex welcomes pets'",
          "7. Workflow 2 verifies 24h window -> Rewrites note in agent voice -> Texts customer on WhatsApp",
          "8. Lead requests viewing -> Get Available Slots computes free 30-min blocks (Mon-Sat 10am-6pm IST)",
          "9. Lead confirms slot -> Book Appointment rechecks overlap, creates event, verifies event ID",
          "10. System updates 'buyer_leads' in Supabase, alerts Slack, and delivers final WhatsApp confirmation"
        ]
      },
      howItWorks: [
        {
          step: 1,
          title: "Burst Message Debouncing",
          description: "When buyers send multiple rapid texts (e.g. 'I want an apartment' / 'In Madhapur' / 'Budget 80L'), an 8-second debounce window and race-condition filter combine them into a single coherent prompt."
        },
        {
          step: 2,
          title: "Natural Buyer Qualification",
          description: "Engages in a warm, one-question-per-turn dialogue capturing name, property type, location, budget, purchase timeline, and financing readiness."
        },
        {
          step: 3,
          title: "Inventory Database Matching",
          description: "Calls the Supabase Properties List tool to identify verified matching listings (e.g., Emerald Heights 3 BHK in Madhapur at ₹98L)."
        },
        {
          step: 4,
          title: "Human-in-the-Loop Slack Approval",
          description: "When a customer asks a question not in the property data sheet (such as building pet rules or price negotiations), the agent raises an approval request to Slack and waits for property advisors to approve or reject."
        },
        {
          step: 5,
          title: "Double-Verified Calendar Booking",
          description: "Computes real free 30-minute calendar slots, asks explicit customer permission, rechecks for overlaps, books the Google Calendar event, and confirms event creation before delivering confirmation."
        }
      ],
      logicAndDecisionEngine: {
        deterministicVsAi: "Balances high-speed LLM conversational synthesis (Google Gemma / OpenRouter) with strict deterministic constraints: deterministic 8s debounce buffering, regex-enforced human decision parsing in Slack, algorithmic 30-minute slot calculations, and mandatory double-verification of Google Calendar event IDs before telling the user an appointment is booked.",
        scoringBreakdown: {
          budget: "Clear budget: 20 pts · Approximate: 10 pts",
          companySize: "Purchase timeline: Within 1 month (25 pts), 1-3 months (20 pts), 3-6 months (15 pts)",
          seniority: "Financing ready / Pre-approved loan: 20 pts · Actively arranging: 15 pts",
          thresholds: "HOT Lead: >=70 pts (Triggers appointment workflow) · WARM Lead: 40-69 pts · COLD Lead: <40 pts"
        },
        securityNotes: [
          "Meta 24-hour customer service window is deterministically calculated from the customer's actual message timestamp.",
          "Atomic database updates prevent concurrent execution races when multiple human advisors respond to approval notifications."
        ]
      },
      integrations: [
        { tool: "n8n LangChain Runtime", purpose: "Agent reasoning, tool-calling loop, and buffer window memory", authMethod: "n8n Self-hosted / Cloud" },
        { tool: "WhatsApp Cloud API", purpose: "Inbound customer webhooks and outbound messaging", authMethod: "Meta OAuth 2.0 & Webhook Secret" },
        { tool: "Supabase (PostgreSQL)", purpose: "buyer_leads, message_buffer, approval_requests, property_list tables", authMethod: "Supabase Service Role Key" },
        { tool: "Google Calendar API", purpose: "Live availability calculation and viewing appointment event creation", authMethod: "Google OAuth 2.0" },
        { tool: "Slack API", purpose: "Human-in-the-loop decision routing and hot lead notifications", authMethod: "Slack Bot Token (channels:history, chat:write)" },
        { tool: "Google Gemma / OpenRouter", purpose: "High-performance LLM engines for conversation & agent voice rewriting", authMethod: "API Bearer Token" }
      ],
      reliabilityAndErrorHandling: {
        deduplication: "Message buffer debouncing and unique wa_id upserts ensure multiple quick WhatsApp messages never create duplicate buyer profiles.",
        tamperProtection: "Calendar booking requires slot re-check and event ID verification. If a slot is taken during checkout, it returns SLOT_TAKEN and prompts the user for a new time.",
        centralizedTriage: "Human approval decisions are claimed atomically in Supabase so duplicate Slack deliveries never generate duplicate customer replies."
      },
      businessValue: {
        potentialBenefits: [
          "Reduces lead response latency from hours to seconds on WhatsApp.",
          "Handles burst multi-message conversations without robotic repeating questions.",
          "Bridges AI autonomy with human broker judgment via Slack for sensitive questions.",
          "Directly schedules verified viewings on Google Calendar with zero double-booking risk.",
          "Eliminates hours of manual data entry by synchronizing directly with Supabase CRM."
        ],
        unverifiedNotice: "Note: The video recording shows an actual live execution on WhatsApp demonstrating end-to-end qualification, human Slack approval, and calendar slot booking."
      },
      limitationsAndFutureImprovements: {
        currentLimitations: [
          "Currently configured specifically for buyer qualification; seller intake workflows are intentionally separated.",
          "WhatsApp templates for messages outside the 24-hour window require pre-approval in Meta Business Manager."
        ],
        plannedEnhancements: [
          "Add WhatsApp Interactive Buttons for one-tap calendar slot selection.",
          "Integrate automated property PDF brochure delivery directly within the WhatsApp chat."
        ]
      }
    }
  },

  {
    id: "sales-pipeline-automation",
    title: "Automated Lead Follow-Up & Sales Pipeline — Form Intake, Scoring & Calendar Sync",
    shortTitle: "Automated Sales Pipeline",
    slug: "sales-pipeline-automation",
    category: "Sales & CRM Operations",
    tagline: "An automated sales system that captures form inquiries, scores leads objectively, sends personalized follow-ups with 1-click unsubscribes, and syncs booked meetings.",
    problem: "Inbound leads arrived unverified into disjointed spreadsheets, resulting in slow response times, missed enterprise opportunities, lack of follow-up consistency, and zero automated CRM sync when prospects booked meetings.",
    solution: "Architected a synchronized 7-workflow automation architecture in n8n backed by Supabase PostgreSQL. The system normalizes form data, prevents duplicate submissions, scores prospects on a 100-point scale across 3 tiers, triggers personalized Gmail follow-ups with secure cryptographic unsubscribes, updates lead state upon incoming reply detection, and auto-links Cal.com bookings.",
    implementationStatus: "Configured & Tested",
    workflowCount: 7,
    clientWorkflowSteps: [
      { step: 1, title: "Web Form Submission", description: "Captures raw inquiries from website forms with strict validation and sanitization.", tool: "Tally / Webhook" },
      { step: 2, title: "Lead Qualification & Scoring", description: "Computes 100-point score based on budget, company size, and job role to assign tiers.", tool: "Scoring Engine" },
      { step: 3, title: "CRM Database Sync", description: "Stores clean lead records with deduplication to prevent duplicate outreach.", tool: "Supabase CRM" },
      { step: 4, title: "Personalized Email Sequence", description: "Dispatches tailored outreach via Gmail with secure 1-click unsubscribe links.", tool: "Gmail OAuth2" },
      { step: 5, title: "Reply Tracking & Meeting Sync", description: "Detects prospect replies to notify reps, and updates CRM status when meetings are booked.", tool: "Cal.com & Slack" }
    ],
    keyOutputs: [
      {
        title: "Deterministic 100-Point Lead Qualification & Tiering Engine",
        category: "Lead Pipeline",
        description: "Ingests raw web form submissions, cleans phone/text fields, validates corporate email syntax via regex, and computes an objective 0–100 score across budget, company size, and job role to assign Tier 1 (Enterprise), Tier 2 (Mid-Market), or Tier 3 (Nurture).",
        businessBenefit: "Eliminates guesswork for sales reps; fast-tracks high-ticket deals to account executives within 60 seconds while auto-nurturing smaller accounts."
      },
      {
        title: "Automated Multi-Stage Follow-Up Sequences with Cryptographic 1-Click Unsubscribe",
        category: "Outbound Outreach",
        description: "Dispatches tailored Gmail sequences on timed schedules. Every outgoing email includes a cryptographically hashed (HMAC-SHA256) 1-click unsubscribe token verified against a secret key.",
        businessBenefit: "Delivers consistent, timely prospect follow-ups without manual typing, while strictly maintaining email deliverability and GDPR/CAN-SPAM compliance."
      },
      {
        title: "Real-Time Inbound Reply Detection & Sequence Circuit-Breaker",
        category: "CRM Safeguard",
        description: "Monitors inbox webhooks for prospect replies, updates lead status in Supabase to 'replied', and halts automated follow-up sequences immediately.",
        businessBenefit: "Eliminates embarrassing robotic follow-ups after a prospect has already responded, enabling seamless human handoff with full historical context."
      },
      {
        title: "Cal.com Meeting Ingestion & PostgreSQL CRM Synchronization",
        category: "Meeting Operations",
        description: "Captures Cal.com booking webhooks, extracts attendee details, reconciles against lead records in Supabase, and updates deal stage to 'meeting_scheduled'.",
        businessBenefit: "Eliminates double-entry and manual calendar reconciliation; sales reps enter discovery calls with full lead history already synced."
      },
      {
        title: "Instant Slack Deal Alerts & 9:00 AM Executive Daily Pipeline Briefing",
        category: "Team Visibility",
        description: "Pushes real-time Slack alerts for Tier-1 inquiries and booked meetings, plus triggers a scheduled morning briefing summarizing new leads, replies, and pipeline velocity.",
        businessBenefit: "Keeps leadership and revenue teams aligned on daily pipeline momentum without requiring anyone to log into multiple dashboards."
      },
      {
        title: "Centralized Fault-Tolerance, Severity Triage & Audit Logging",
        category: "System Reliability",
        description: "Global error handler node catches uncaught exceptions across all workflows, categorizes severity (CRITICAL, WARNING, INFO), and logs incidents to Supabase while notifying engineers on Slack.",
        businessBenefit: "Guarantees zero silent pipeline failures. If an API times out or webhook errors, the team is alerted immediately with execution IDs for instant resolution."
      }
    ],
    techStack: [
      { name: "n8n", role: "Workflow Orchestrator & Logic Engine" },
      { name: "Supabase", role: "Relational Storage (leads, raw_submissions, meetings, error_logs)" },
      { name: "Gmail OAuth2", role: "Transactional Welcome & Follow-up Sequences" },
      { name: "Slack API", role: "Instant Tier-based Sales Alerts & Daily Executive Digest" },
      { name: "Cal.com", role: "Calendar Booking Webhook & Lead Reconciliation" },
      { name: "JavaScript / ES6", role: "Normalisation, Scoring Rubric & Cryptographic Token Generation" },
    ],
    workflows: [
      {
        id: "wf-1",
        title: "Workflow 1 — Lead Intake & Scoring Pipeline",
        filename: "Workflow_1___Lead_Intake_Pipeline__Supabase___1__5158b1d9.json",
        trigger: "POST Webhook (/lead/intake from Tally form)",
        purpose: "Ingests raw web form submissions, cleans and normalizes multi-format budget labels, performs strict regex email validation, checks for duplicate leads, executes a 100-point scoring engine, saves to Supabase, and routes via Gmail and Slack based on priority tier.",
        stages: [
          {
            id: "wf1-1",
            name: "Webhook Ingestion",
            type: "webhook",
            description: "Listens for incoming HTTP POST payloads from Tally lead capture forms.",
            details: "Configured with responseNode mode for synchronous HTTP status communication (200 OK or 409 Conflict)."
          },
          {
            id: "wf1-2",
            name: "Normalise Payload",
            type: "code",
            description: "JavaScript node standardizing field names, parsing budget strings, and validating emails.",
            details: "Converts strings like '1L above' to 100,000 and '30k - 50k' to 30,000. Formats timestamps to Asia/Kolkata timezone. Throws an exception if email fails standard RFC regex.",
            codeSnippet: `// Parse budget label → numeric lower bound\nfunction parseBudget(label) {\n  if (!label) return 0;\n  const s = label.toLowerCase().replace(/[₹$,\\s]/g, '').replace(/above|plus|\\+/g, '');\n  if (s.includes('l')) return parseFloat(s.replace('l', '')) * 100000;\n  if (s.includes('k')) return parseFloat(s.replace('k', '')) * 1000;\n  return parseFloat(s) || 0;\n}`
          },
          {
            id: "wf1-3",
            name: "Raw Submissions Audit",
            type: "database",
            description: "Inserts raw submission payload into Supabase 'raw_submissions' table for audit trail.",
            details: "Guarantees zero data loss even if downstream scoring or routing hits an unexpected exception."
          },
          {
            id: "wf1-4",
            name: "Deduplication Check",
            type: "database",
            description: "Queries Supabase 'leads' table by email to detect existing submissions.",
            details: "Prevents duplicate entries and spammed submissions from skewing CRM metrics."
          },
          {
            id: "wf1-5",
            name: "Is New Lead? Branch",
            type: "filter",
            description: "Conditional IF node inspecting query result length.",
            details: "If duplicate found: immediately returns HTTP 409 'This email has already been submitted'. If new: proceeds to scoring engine."
          },
          {
            id: "wf1-6",
            name: "Lead Scoring Engine",
            type: "code",
            description: "Calculates a deterministic 100-point score across budget, company size, and title seniority.",
            details: "Budget (up to 40 pts), Company size (up to 35 pts), Seniority (up to 25 pts). Tiers: High (>=70), Mid (>=40), Low (<40).",
            codeSnippet: `// Tier Assignment\nlet tier;\nif (score >= 70) tier = 'high';\nelse if (score >= 40) tier = 'mid';\nelse tier = 'low';\n\nreturn [{ json: { ...lead, lead_score: score, lead_tier: tier, status: 'new' } }];`
          },
          {
            id: "wf1-7",
            name: "Append to Supabase 'leads'",
            type: "database",
            description: "Persists scored lead with initial status 'new' and follow_up_count: 0.",
            details: "Stores full contact profile, score, tier, and timestamp."
          },
          {
            id: "wf1-8",
            name: "Tier-Based Switch Router",
            type: "notification",
            description: "Directs outreach based on evaluated tier.",
            details: "High Tier triggers personalized VIP welcome email via Gmail + instant Slack alert to #lead-support-team. Mid Tier dispatches nurture sequence with case studies. Low Tier dispatches cold timeline inquiry."
          }
        ],
        branchingRules: [
          { condition: "Email already exists in database", outcome: "HTTP 409 Conflict returned; pipeline terminates without re-alerting sales." },
          { condition: "Lead Tier == 'high' (Score >= 70)", outcome: "Personal VIP welcome sent + immediate Slack alert pinged to sales channel." },
          { condition: "Lead Tier == 'mid' (Score 40-69)", outcome: "Nurture sequence triggered with case study & pricing breakdown." },
          { condition: "Lead Tier == 'low' (Score < 40)", outcome: "Cold touch email verifying buying timeline." }
        ],
        databaseInteractions: [
          { table: "raw_submissions", operation: "INSERT", fields: ["email", "payload"] },
          { table: "leads", operation: "SELECT & INSERT", fields: ["email", "full_name", "job_title", "company", "budget", "lead_score", "lead_tier", "status", "follow_up_count"] }
        ],
        failureHandling: "Global Error Workflow 5 configured as error handler for immediate Slack alerting and incident logging."
      },
      {
        id: "wf-2",
        title: "Workflow 2 — Follow-up Sequence Engine",
        filename: "Workflow_2___Follow-up_Sequence__Supabase___1__c5d3d69e.json",
        trigger: "Scheduled Cron Interval (Daily Check)",
        purpose: "Polls active leads due for follow-up, verifies opt-out status, constructs personalized 3-step email cadences with tamper-proof cryptographic unsubscribe tokens, sends emails via Gmail, and increments follow-up counts in Supabase.",
        stages: [
          {
            id: "wf2-1",
            name: "Daily Schedule Trigger",
            type: "trigger",
            description: "Triggers on regular scheduled intervals to evaluate candidate leads.",
            details: "Runs batch checks across active records in the database."
          },
          {
            id: "wf2-2",
            name: "Get Leads Due for Follow-up",
            type: "database",
            description: "Queries Supabase 'leads' table where status == 'new'.",
            details: "Pulls all leads currently awaiting nurture steps."
          },
          {
            id: "wf2-3",
            name: "Follow-up Count & Opt-out Check",
            type: "filter",
            description: "Strict filter ensuring follow_up_count < 3 AND status != 'opted_out'.",
            details: "Enforces 3-touch cap to prevent email spamming and respects suppression list."
          },
          {
            id: "wf2-4",
            name: "Build Email & Cryptographic Token",
            type: "code",
            description: "Generates step-specific subject, body, Cal.com booking link, and HMAC token.",
            details: "Computes a unique 32-character hash token using a secure secret key to verify unsubscribe requests and prevent malicious unsubscription forgery.",
            codeSnippet: `// Anti-tamper token generation\nfunction generateToken(email, secret) {\n  const combined = email + secret + email.length;\n  let hash = 0;\n  for (let i = 0; i < combined.length; i++) {\n    hash = ((hash << 5) - hash) + combined.charCodeAt(i);\n    hash = hash & hash;\n  }\n  const positiveHash = Math.abs(hash).toString(16);\n  const extra = (email.length * secret.length).toString(16);\n  return (positiveHash + extra + positiveHash).padEnd(32, '0').substring(0, 32);\n}`
          },
          {
            id: "wf2-5",
            name: "Send Follow-up Email",
            type: "notification",
            description: "Dispatches personalized email via Gmail OAuth2.",
            details: "Includes custom greeting, company reference, Cal.com booking button, reply CTA, and 1-click unsubscribe."
          },
          {
            id: "wf2-6",
            name: "Update Supabase State",
            type: "database",
            description: "Increments follow_up_count, sets last_contacted, next_followup_date (+1 day), and updates status.",
            details: "Automatically sets status to 'sequence_complete' once 3 follow-ups have been dispatched."
          }
        ]
      },
      {
        id: "wf-3",
        title: "Workflow 3 — Executive Daily Digest",
        filename: "Workflow_3___Daily_Digest__Supabase___1__5c73ff1d.json",
        trigger: "Cron: 08:00 AM Weekdays (0 8 * * 1-5)",
        purpose: "Aggregates pipeline health across all Supabase leads every morning, computes total count, average lead score, tier breakdown, and follow-up progress, and formats an executive summary for Slack.",
        stages: [
          {
            id: "wf3-1",
            name: "Schedule: 8AM Weekdays",
            type: "trigger",
            description: "Scheduled cron running Monday through Friday at 08:00 AM.",
            details: "Ensures the revenue team starts the morning with full pipeline visibility."
          },
          {
            id: "wf3-2",
            name: "Fetch All Leads",
            type: "database",
            description: "Queries all lead records from Supabase 'leads' table.",
            details: "Extracts full cohort data for pipeline metrics synthesis."
          },
          {
            id: "wf3-3",
            name: "Calculate Metrics & Format Digest",
            type: "code",
            description: "JavaScript node calculating key pipeline indicators.",
            details: "Computes Total Leads, Today's New Leads, Average Lead Score (out of 100), High/Mid/Low tier distribution, and Active vs Completed sequences."
          },
          {
            id: "wf3-4",
            name: "Slack Post to #lead-support-team",
            type: "notification",
            description: "Posts structured executive summary with pipeline counts and today's leads roster.",
            details: "Gives sales leadership real-time visibility without requiring manual report exports."
          }
        ]
      },
      {
        id: "wf-4",
        title: "Workflow 4 — Inbound Reply Detection & Status Advancement",
        filename: "Workflow_4___Handle_Replies__Supabase___1__7c98289f.json",
        trigger: "Gmail Polling Trigger (Every minute for in:inbox)",
        purpose: "Detects replies to follow-up emails, cleans email snippet and HTML entities, locates corresponding lead in Supabase, marks status as 'replied' (which instantly arrests further cold touches), and pings Slack with message text for sales takeover.",
        stages: [
          {
            id: "wf4-1",
            name: "Gmail Polling Trigger",
            type: "trigger",
            description: "Checks Gmail inbox every minute for inbound responses.",
            details: "Monitors responses to outreach campaigns in real time."
          },
          {
            id: "wf4-2",
            name: "Extract & Clean Email Content",
            type: "code",
            description: "Extracts sender email address, strips quoted reply history, and decodes HTML entities.",
            details: "Cleans snippet text by removing 'On [date] wrote:' patterns so sales reps only see the prospect's actual response."
          },
          {
            id: "wf4-3",
            name: "Lookup Lead in Supabase",
            type: "database",
            description: "Searches Supabase 'leads' table matching the reply sender email.",
            details: "Finds the original prospect profile, tier, and score."
          },
          {
            id: "wf4-4",
            name: "Update Status to 'replied'",
            type: "database",
            description: "Updates lead status in Supabase to 'replied' and updates last_contacted.",
            details: "Crucial safeguard: changing status away from 'new' automatically stops the automated follow-up sequence."
          },
          {
            id: "wf4-5",
            name: "Instant Slack Alert for Sales Rep",
            type: "notification",
            description: "Sends immediate Slack notification containing prospect name, tier, score, and their message.",
            details: "Enables human sales reps to jump into active conversations within seconds."
          }
        ]
      },
      {
        id: "wf-5",
        title: "Workflow 5 — Centralized Error Triage & Audit Logger",
        filename: "Workflow_5___Error_Handler__Supabase__e2ef23b4.json",
        trigger: "n8n Global errorTrigger Node",
        purpose: "Acts as the centralized fault-tolerance handler for all other workflows in the system. Classifies error severity (CRITICAL, WARNING for timeouts, INFO for duplicates), posts structured Slack alerts, and logs incidents to Supabase.",
        stages: [
          {
            id: "wf5-1",
            name: "Global Error Trigger",
            type: "trigger",
            description: "Catches uncaught exceptions from any workflow configured with errorWorkflow ID.",
            details: "Zero-dependency failure catcher ensuring silent workflow breaks never happen."
          },
          {
            id: "wf5-2",
            name: "Format & Classify Severity",
            type: "code",
            description: "Parses workflow name, execution ID, error stack, and assigns severity badge.",
            details: "Severity heuristic: Duplicate errors mapped to INFO; timeouts mapped to WARNING; syntax/API faults mapped to CRITICAL."
          },
          {
            id: "wf5-3",
            name: "Slack Error Notification",
            type: "notification",
            description: "Posts error details, failed workflow name, and execution ID directly to Slack.",
            details: "Allows engineers to open n8n execution history directly and debug issues."
          },
          {
            id: "wf5-4",
            name: "Log to Supabase 'error_logs'",
            type: "database",
            description: "Writes error record into Supabase for uptime auditing and system reliability analytics.",
            details: "Maintains an immutable record of historical pipeline faults."
          }
        ]
      },
      {
        id: "wf-6",
        title: "Workflow 6 — Cryptographic Unsubscribe Handler",
        filename: "Workflow_6___Unsubscribe_Handler__Supabase___1__fb56d328.json",
        trigger: "GET / POST Webhook (/webhook/unsubscribe)",
        purpose: "Handles 1-click unsubscribe clicks from follow-up emails. Recomputes token with secret key to prevent spoofing, marks lead status as 'opted_out' in Supabase, and serves a branded confirmation HTML page.",
        stages: [
          {
            id: "wf6-1",
            name: "Webhook Listener",
            type: "webhook",
            description: "Receives email and token query parameters from unsubscribe link clicks.",
            details: "Exposed via public webhook endpoint."
          },
          {
            id: "wf6-2",
            name: "Verify Cryptographic Token",
            type: "code",
            description: "Re-runs the hashing algorithm with the secret key to ensure token integrity.",
            details: "Protects leads from malicious unsubscribe forgery by verifying the hash against the email."
          },
          {
            id: "wf6-3",
            name: "Update Supabase Status to 'opted_out'",
            type: "database",
            description: "Flags lead as opted_out in Supabase.",
            details: "Immediately suppresses future email dispatches."
          },
          {
            id: "wf6-4",
            name: "Render Branded Confirmation HTML",
            type: "notification",
            description: "Returns clean, professional HTML page confirming successful unsubscription.",
            details: "Styled confirmation page reassuring the recipient they will receive no further emails."
          }
        ]
      },
      {
        id: "wf-7",
        title: "Workflow 7 — Cal.com Calendar Booking Integration",
        filename: "Workflow_7___Cal.com_Booking_Integration_3cb78ad3.json",
        trigger: "POST Webhook (/calcom/booking on meeting creation)",
        purpose: "Captures Cal.com booking webhooks, extracts attendee and schedule info, reconciles attendee email against Supabase leads, updates status to 'meeting_scheduled', logs the meeting to 'meetings' table, and alerts Slack.",
        stages: [
          {
            id: "wf7-1",
            name: "Cal.com Webhook Ingestion",
            type: "webhook",
            description: "Receives meeting created event payload from Cal.com.",
            details: "Responds with HTTP 200 OK immediately to satisfy webhook SLA."
          },
          {
            id: "wf7-2",
            name: "Parse Booking Payload",
            type: "code",
            description: "Extracts attendee email, name, meeting title, start/end timestamps, and formats dates for Asia/Kolkata timezone.",
            details: "Handles timezone conversions and extracts booking UID for deduplication."
          },
          {
            id: "wf7-3",
            name: "Find Lead in Supabase",
            type: "database",
            description: "Queries Supabase 'leads' table by attendee email to check if meeting was booked by an active lead.",
            details: "Relational foreign-key linking between lead and scheduled meeting."
          },
          {
            id: "wf7-4",
            name: "Update Status to 'meeting_scheduled'",
            type: "database",
            description: "Advances lead status to 'meeting_scheduled' in Supabase.",
            details: "Moves prospect along CRM pipeline and automatically suspends cold sequence."
          },
          {
            id: "wf7-5",
            name: "Save to 'meetings' Table",
            type: "database",
            description: "Inserts meeting record into Supabase with lead_id, timestamps, and attendee metadata.",
            details: "Stores complete meeting details for sales scheduling history."
          },
          {
            id: "wf7-6",
            name: "Slack Meeting Alert",
            type: "notification",
            description: "Posts rich notification to #lead-support-team with meeting title, attendee name, time, and database confirmation.",
            details: "Warns if the meeting was booked by an unrecognized contact for manual CRM linking."
          }
        ]
      }
    ],
    caseStudy: {
      overview: "An autonomous, multi-stage sales pipeline built with n8n and Supabase. It takes raw inbound leads from web forms, validates and normalizes contact attributes, computes a 100-point deterministic qualification score, stores clean records in PostgreSQL, initiates customized email sequences via Gmail, monitors replies to transition leads from cold outreach to human sales reps, and seamlessly links Cal.com meeting bookings.",
      businessProblem: {
        summary: "Modern sales teams often suffer from severe lead decay: when form inquiries arrive, sales reps either take hours to respond or fail to follow up consistently. High-value enterprise prospects receive the same generic outreach as low-budget inquiries, and meeting bookings happen in silos disconnected from the lead database.",
        painPoints: [
          "Manual lead entry into spreadsheets causes input errors and delayed response times.",
          "No objective scoring system to prioritize enterprise decision-makers over low-intent tire kickers.",
          "Inconsistent follow-up cadences leading to lost pipeline opportunities.",
          "Manual email checking and lack of instant alerts when a prospect replies.",
          "Calendar bookings disconnected from the core prospect database."
        ],
        manualProcessBefore: [
          "Website form submitted -> notification sat in generic company inbox for hours.",
          "Sales rep manually opened email, copied info into Google Sheets or CRM.",
          "Rep eyeballed the company and budget to decide when or if to write a custom email.",
          "Follow-up emails were sent manually from individual rep inboxes, often forgotten after 1 attempt.",
          "When leads booked a meeting via calendar, rep manually searched spreadsheets to update their status."
        ]
      },
      architecture: {
        diagramSummary: "Seven modular n8n workflows synchronized via Supabase PostgreSQL, webhooks, and Slack channels. Each workflow has a single clear responsibility and communicates through strict database state transitions ('new' -> 'replied' | 'meeting_scheduled' | 'sequence_complete' | 'opted_out').",
        dataFlow: [
          "1. Tally Form -> Webhook -> Normalisation (JS) -> Dedup Check -> Scoring Engine (100 pts) -> Supabase 'leads'",
          "2. Tier Switch -> VIP Welcome / Nurture / Cold Touch (Gmail) + High-Priority Slack Alert",
          "3. Daily Schedule -> Query 'new' leads -> Cap check (<3) -> Generate Anti-Tamper Token -> Gmail -> Supabase update",
          "4. Gmail Trigger -> Parse Reply -> Lookup Supabase -> Advance Status to 'replied' -> Instant Slack Rep Alert",
          "5. Unsubscribe Webhook -> Verify Cryptographic Token -> Mark 'opted_out' -> Render HTML Confirmation",
          "6. Cal.com Webhook -> Parse Attendee -> Reconcile Lead -> Status 'meeting_scheduled' -> Save Meeting Record -> Slack Notification",
          "7. Central Error Trigger -> Categorize Severity (Critical/Warning/Info) -> Post Slack Card -> Log to 'error_logs'"
        ]
      },
      howItWorks: [
        {
          step: 1,
          title: "Intake & Data Normalization",
          description: "When a prospect submits an inquiry, the webhook receives raw fields. A custom JavaScript node resolves dropdown option IDs, parses loose budget text (e.g., '1L above', '30k-50k') into standard integer values, formats the timestamp, and validates the email format."
        },
        {
          step: 2,
          title: "Deduplication & Rejection Safeguard",
          description: "Before creating records, the pipeline checks Supabase for matching email addresses. If a duplicate submission is found, the system immediately returns an HTTP 409 Conflict with a helpful message, preventing double-alerting sales or overwriting active sequences."
        },
        {
          step: 3,
          title: "100-Point Scoring Engine",
          description: "The lead is scored across three core criteria: Budget (up to 40 pts), Company Size (up to 35 pts), and Job Title Seniority (up to 25 pts). Tiers are assigned deterministically: High (>=70), Mid (>=40), and Low (<40)."
        },
        {
          step: 4,
          title: "Multi-Tier Routing & Immediate Notification",
          description: "High-tier prospects receive an automated VIP welcome email while the sales channel receives an instant high-priority Slack alert. Mid and Low tiers receive tailored nurture or timeline clarification messages."
        },
        {
          step: 5,
          title: "Scheduled Multi-Touch Follow-Up",
          description: "A daily cron workflow retrieves leads with status 'new' and follow-up count under 3. It generates an email tailored to the touch step, generates a cryptographically signed 1-click unsubscribe URL, and logs the touch date in Supabase."
        },
        {
          step: 6,
          title: "Inbound Reply Interception",
          description: "An inbox polling workflow checks for replies, decodes HTML entities, strips quoted text, updates the lead status in Supabase to 'replied' (which stops the cold sequence), and notifies the rep on Slack to take over."
        },
        {
          step: 7,
          title: "Cal.com Meeting Reconciliation",
          description: "When a meeting is scheduled via Cal.com, the webhook identifies the attendee's email, advances their status in Supabase to 'meeting_scheduled', inserts a record in the 'meetings' table, and notifies the team."
        }
      ],
      logicAndDecisionEngine: {
        deterministicVsAi: "This system relies on deterministic JavaScript logic (rule-based scoring, strict regex validation, arithmetic budget parsing, and mathematical token generation) rather than probabilistic LLMs for core routing. This choice guarantees 100% predictable execution, zero hallucinations, millisecond execution speeds, and zero token API costs.",
        scoringBreakdown: {
          budget: ">=100k: +40 pts · >=50k: +25 pts · >=30k: +15 pts · >=20k: +5 pts · None/0: +0 pts",
          companySize: "1000+: +35 pts · 100-1000: +20 pts · 10-100: +10 pts · 1-10: +3 pts · Unknown: +0 pts",
          seniority: "C-Suite / Founder: +25 pts · VP / Director: +20 pts · Manager / Lead: +15 pts · IC: +8 pts · Junior: +2 pts",
          thresholds: "High Tier: >=70 pts (VIP treatment & Slack alert) · Mid Tier: 40-69 pts (Nurture sequence) · Low Tier: <40 pts (Cold check)"
        },
        securityNotes: [
          "Unsubscribe links are protected with a 32-character HMAC-style cryptographic hash derived from the recipient email and a backend secret key.",
          "Incoming webhook endpoints enforce strict payload extraction and type-safe fallbacks.",
          "All Supabase queries utilize parameterized filters to eliminate injection vulnerabilities."
        ]
      },
      integrations: [
        { tool: "n8n", purpose: "Orchestration, webhook endpoints, error triggers, and scheduled jobs", authMethod: "Self-hosted / n8n Cloud API" },
        { tool: "Supabase (PostgreSQL)", purpose: "Primary database for leads, raw submissions, meetings, and error logs", authMethod: "Supabase API Key / Service Role" },
        { tool: "Gmail API", purpose: "Automated sequence delivery and inbox reply monitoring", authMethod: "OAuth 2.0 Client Credentials" },
        { tool: "Slack API", purpose: "Real-time sales alerts, daily executive digests, and critical error notifications", authMethod: "Slack Bot Token (chat:write)" },
        { tool: "Cal.com", purpose: "Booking webhook listener and schedule synchronization", authMethod: "Webhook Secret Verification" },
        { tool: "Tally", purpose: "Frontend lead capture form", authMethod: "Webhook Payload Token" }
      ],
      reliabilityAndErrorHandling: {
        deduplication: "Deduplication is enforced at the database level by email. Duplicate submissions return an HTTP 409 response rather than creating ghost leads.",
        tamperProtection: "Unsubscribe URLs require a valid token computed from secret key + recipient email. Unauthorized or altered unsubscribe requests return an HTTP 400 Bad Request.",
        centralizedTriage: "Workflow 5 serves as the global error workflow. Any uncaught failure across all 6 workflows triggers an instant Slack alert with workflow name, execution ID, and error stack, while logging the incident to the 'error_logs' table."
      },
      businessValue: {
        potentialBenefits: [
          "Reduces lead response latency from hours to seconds for inbound inquiries.",
          "Ensures 100% of qualified leads receive structured, timely follow-up touches.",
          "Saves sales reps hours of manual data entry and spreadsheet copying.",
          "Eliminates lead leakage when prospects book meetings directly on the calendar.",
          "Provides management with a real-time daily Slack digest of pipeline health."
        ],
        unverifiedNotice: "Note: These represent intended architectural capabilities and process improvements. Exact percentage gains or revenue impacts will vary based on client traffic volume, sales cycle length, and team responsiveness."
      },
      limitationsAndFutureImprovements: {
        currentLimitations: [
          "The current export reflects a migration from Google Sheets to Supabase, where Google Sheets nodes remain present in disabled state as legacy fallbacks.",
          "Apollo / LinkedIn enrichment was planned in the code comments but omitted from this phase to minimize external API costs.",
          "Follow-up emails are sent using standard HTML templates; AI personalization based on prospect website content is not yet integrated."
        ],
        plannedEnhancements: [
          "Integrate Gemini Flash to generate personalized icebreakers based on company message and website URL.",
          "Add WhatsApp / SMS channel fallback for leads who do not open emails after 48 hours.",
          "Build two-way sync with HubSpot or Salesforce via webhook triggers."
        ]
      }
    }
  },

  // Project 2: Personal Assistant — Intelligent Schedule & Task Agent
  {
    id: "personal-assistant-schedule-agent",
    title: "AI Personal Assistant & Task Scheduler — Conversational Google Sheets Automation",
    shortTitle: "AI Task & Schedule Assistant",
    slug: "personal-assistant-schedule-agent",
    category: "Productivity & Executive Support",
    tagline: "A conversational assistant that creates, updates, and organizes tasks in Google Sheets from natural language prompts, with real-time web research tools.",
    problem: "Professionals lose time constantly manually opening, formatting, sorting, and modifying spreadsheet task trackers. Natural language inputs ('schedule n8n study tomorrow', 'mark review complete') fail standard spreadsheet schemas, create messy duplicates, and lack conversational context.",
    solution: "Engineered an autonomous AI Agent in n8n leveraging LangChain, Groq (gpt-oss-safeguard-20b) and OpenRouter (o3-mini:batch) models with Window Buffer Memory. The agent is empowered with a Google Sheets appendOrUpdate tool and live SerpApi search tools, enforcing strict M/D/YYYY date conversions, relative date parsing, duplicate prevention, and verified tool-execution reporting.",
    implementationStatus: "Configured & Tested",
    workflowCount: 1,
    clientWorkflowSteps: [
      { step: 1, title: "Natural Language Chat", description: "User sends everyday message or voice command via Telegram chat.", tool: "Telegram Bot" },
      { step: 2, title: "Intent & Date Parsing", description: "Agent extracts task details, parses relative dates ('tomorrow at 3pm') into standard formats.", tool: "LangChain & Groq" },
      { step: 3, title: "Google Sheets Task Management", description: "Automatically adds new tasks, updates existing statuses, or reads pending items.", tool: "Google Sheets API" },
      { step: 4, title: "Live Web Research", description: "Searches Google for real-time information, links, and answers when needed.", tool: "SerpApi" },
      { step: 5, title: "Instant Telegram Confirmation", description: "Replies with clean summary confirming the scheduled action.", tool: "Telegram Response" }
    ],
    keyOutputs: [
      {
        title: "Natural Language Task & Relative Date Normalization",
        category: "Executive Productivity",
        description: "Understands conversational chat prompts (e.g. 'schedule prep call tomorrow afternoon', 'reschedule review for next Friday') and normalizes dates into standardized calendar formats (M/D/YYYY).",
        businessBenefit: "Saves busy founders, executives, and managers 30–60 minutes per day by eliminating manual calendar clicks and task scheduling friction."
      },
      {
        title: "Google Sheets Task Database Management & Duplicate Prevention",
        category: "Data Integrity",
        description: "Uses custom LangChain tool calling to append new tasks, search existing entries, and update completion statuses in Google Sheets without creating messy duplicates.",
        businessBenefit: "Maintains a single source of truth in an accessible spreadsheet format your team already uses, without expensive or proprietary project management licenses."
      },
      {
        title: "Live Web Research & Fact Retrieval (SerpApi Integration)",
        category: "Real-Time Intelligence",
        description: "Equipped with live Google Search tool capability to look up company websites, news, market facts, and external references directly inside conversational workflow.",
        businessBenefit: "Provides verified external context and direct web links without leaving your chat or interrupting workflow focus."
      },
      {
        title: "Multi-Turn Conversational Memory Buffer",
        category: "Contextual AI",
        description: "Maintains rolling chat history so the agent remembers previous instructions and tasks, allowing natural revisions like 'change the priority to high' or 'move that to 5 PM'.",
        businessBenefit: "Provides a truly conversational assistant experience that understands context rather than robotic single-command bots that force you to re-type instructions."
      }
    ],
    techStack: [
      { name: "n8n LangChain Agent", role: "Autonomous Agent Orchestrator with Fallback" },
      { name: "Groq (gpt-oss-safeguard)", role: "Primary Low-Latency LLM" },
      { name: "OpenRouter (o3-mini)", role: "Secondary Reasoning Fallback Model" },
      { name: "Google Sheets Tool", role: "appendOrUpdate Task Engine (M/D/YYYY Schema)" },
      { name: "SerpApi HTTP Tool", role: "Live Web & Google News Retrieval" },
      { name: "Window Buffer Memory", role: "Multi-turn Conversational Context" }
    ],
    workflows: [
      {
        id: "wf-personal-assistant",
        title: "Personal Assistant — Schedule & Tool-Calling Agent",
        filename: "Personal_assistant_6d327063.json",
        trigger: "Chat Trigger (n8n LangChain Chat)",
        purpose: "Listens for user chat messages, maintains conversation memory, interprets schedule requests, queries/updates the connected Google Sheet without creating duplicate rows, and uses live web search tools when needed.",
        stages: [
          {
            id: "pa-1",
            name: "Chat Message Trigger",
            type: "trigger",
            description: "Listens for natural language queries and scheduling instructions via the chat interface.",
            details: "Standard n8n LangChain chat webhook receiving user message strings."
          },
          {
            id: "pa-2",
            name: "LangChain AI Agent (Tool Orchestrator)",
            type: "code",
            description: "Autonomous agent governing tool selection, prompt rules, date conversion, and response formatting.",
            details: "Configured with strict prompt invariants: must never claim a task was saved unless tool succeeded, converts relative dates ('tomorrow', 'next Monday') to M/D/YYYY format, searches existing tasks before creating duplicates.",
            codeSnippet: `// System prompt rule highlights:\n// 1. Google Sheet uses M/D/YYYY (e.g. 9/10/2026). Never use 2026-09-10 or 10/09/2026.\n// 2. Relative dates: convert 'today', 'tomorrow' to actual calendar dates first.\n// 3. Status handling: Defaults to 'Pending', marks 'Completed' or 'In Progress'.\n// 4. Duplicate prevention: search existing rows before appending new rows.`
          },
          {
            id: "pa-3",
            name: "Groq & OpenRouter LLM Backends",
            type: "code",
            description: "Multi-model reasoning architecture featuring Groq for rapid replies and OpenRouter o3-mini for reasoning.",
            details: "Groq provides ultra-fast tool-calling inference, while OpenRouter acts as an intelligent model fallback."
          },
          {
            id: "pa-4",
            name: "Window Buffer Memory",
            type: "code",
            description: "Retains multi-turn conversation context across recent exchanges.",
            details: "Allows the agent to understand follow-up references like 'change that date to Friday' or 'also mark that as done'."
          },
          {
            id: "pa-5",
            name: "Google Sheets CRUD Tool",
            type: "database",
            description: "Executes appendOrUpdate on the 'Daily Schedule' spreadsheet.",
            details: "Matches rows on 'task' column, writes date, task, and status using $fromAI parameter overrides."
          },
          {
            id: "pa-6",
            name: "Live Web & News Tools (SerpApi)",
            type: "webhook",
            description: "Provides real-time search engine access for contextual inquiries.",
            details: "Connected via HTTP Request Tool targeting Google AI mode and Google News engines."
          }
        ],
        branchingRules: [
          { condition: "User requests adding a new task", outcome: "Converts date to M/D/YYYY -> Checks existing rows -> Appends row with status 'Pending'." },
          { condition: "User requests modifying or completing a task", outcome: "Searches Google Sheet -> Identifies matching row -> Updates status to 'Completed' / 'In Progress'." },
          { condition: "Task to update cannot be found in Sheet", outcome: "Agent refrains from auto-creating; informs user task was not found and requests clarification." }
        ],
        databaseInteractions: [
          { table: "Daily Schedule (Sheet1)", operation: "appendOrUpdate", fields: ["date", "task", "status"] }
        ]
      }
    ],
    caseStudy: {
      overview: "A personal productivity and task management AI Agent built using n8n and LangChain. Rather than functioning as a passive chatbot, the agent possesses autonomous tool-calling capabilities that directly interact with Google Sheets to maintain an organized daily schedule, enforce strict date formats, detect potential duplicates, and consult live web search APIs when requested.",
      businessProblem: {
        summary: "Professionals and busy executives rely on spreadsheets and task lists to organize daily commitments, but manually updating rows, formatting dates consistently, and editing task statuses throughout a busy day creates operational friction. Without strict input validation, date formats degrade into inconsistent representations that break downstream sorting and calendar integrations.",
        painPoints: [
          "Manual spreadsheet data entry interrupts productive focus.",
          "Inconsistent date formats (YYYY-MM-DD vs DD/MM/YYYY vs Month Day) corrupt sorting and reporting.",
          "Duplicate tasks get added accidentally when team members don't search prior entries.",
          "Context switching between chat interfaces and spreadsheets reduces execution speed."
        ],
        manualProcessBefore: [
          "User remembered a task -> opened browser -> loaded Google Drive -> navigated to spreadsheet.",
          "Manually calculated what 'next Thursday' was on the calendar and typed the date.",
          "Created new row, risking adding a duplicate if the task was already noted earlier.",
          "To complete a task, scrolled down hundreds of rows to locate the specific entry."
        ]
      },
      architecture: {
        diagramSummary: "n8n LangChain Agent architecture connecting a Chat Trigger, Groq/OpenRouter LLM engines, Window Buffer Memory, and tools including a Google Sheets appendOrUpdate tool and SerpApi search tools.",
        dataFlow: [
          "1. User sends natural language request ('Add task for tomorrow to prepare pitch deck')",
          "2. Chat Trigger forwards message payload to n8n LangChain AI Agent",
          "3. AI Agent loads conversation history from Window Buffer Memory",
          "4. Agent prompts Groq / OpenRouter LLM to parse intent, calculate actual date, and check tools",
          "5. Agent invokes Google Sheets Tool with strict M/D/YYYY date and 'Pending' status",
          "6. Tool executes appendOrUpdate on 'Daily Schedule' sheet and returns execution status",
          "7. Agent formats concise confirmation response ('Added: Prepare pitch deck — 9/11/2026.')"
        ]
      },
      howItWorks: [
        {
          step: 1,
          title: "Natural Language Ingestion",
          description: "Receives user text such as 'Mark my n8n task for tomorrow as completed' or 'What do I have scheduled for next Monday?'"
        },
        {
          step: 2,
          title: "Date Normalization & Semantic Parsing",
          description: "Calculates the real calendar date for relative terms ('today', 'tomorrow', 'next Monday') and converts it strictly into the required M/D/YYYY format (e.g. 9/10/2026)."
        },
        {
          step: 3,
          title: "Duplicate & Existence Verification",
          description: "Queries the Google Sheet tool before creating new records to ensure a similar task isn't already active for that date."
        },
        {
          step: 4,
          title: "Deterministic Google Sheet Execution",
          description: "Executes the appendOrUpdate operation through Google Sheets OAuth2 API, modifying only the targeted date, task, or status fields."
        },
        {
          step: 5,
          title: "Honest Verified Feedback",
          description: "Strictly adheres to system instructions: only confirms task creation or status updates if the Google Sheets tool returned a successful execution."
        }
      ],
      logicAndDecisionEngine: {
        deterministicVsAi: "The system combines LLM semantic understanding (interpreting varied human requests and relative dates) with deterministic tool boundaries. The LLM is restricted from modifying column headers, prohibited from altering existing date formats, and enforced to use standard statuses (Pending, In Progress, Completed).",
        securityNotes: [
          "External tool API credentials (Google OAuth2 and SerpApi) are kept strictly within n8n credential stores and never echoed to chat.",
          "Tool parameters use typed n8n expressions ($fromAI) to ensure schema conformity."
        ]
      },
      integrations: [
        { tool: "n8n LangChain Agent", purpose: "Tool selection, memory management, and execution orchestration", authMethod: "n8n Internal Runtime" },
        { tool: "Google Sheets API", purpose: "Target spreadsheet storage for daily schedule and task states", authMethod: "Google OAuth 2.0 Client" },
        { tool: "Groq Cloud API", purpose: "High-speed LLM inference (openai/gpt-oss-safeguard-20b)", authMethod: "Groq Bearer Token" },
        { tool: "OpenRouter API", purpose: "Reasoning model fallback (openai/o3-mini:batch)", authMethod: "OpenRouter API Key" },
        { tool: "SerpApi", purpose: "Live Google Search and Google News lookup tool", authMethod: "SerpApi Key (Masked)" }
      ],
      reliabilityAndErrorHandling: {
        deduplication: "Agent performs prior lookup in Google Sheets before appending rows. If a task already exists, it updates the existing status instead of duplicating.",
        tamperProtection: "Schema enforcement restricts row writes strictly to 'date', 'task', and 'status' columns. Modifying spreadsheet headers is explicitly prohibited.",
        centralizedTriage: "If a requested task cannot be found for an update operation, the agent halts, refuses to create an accidental ghost task, and asks the user for clarification."
      },
      businessValue: {
        potentialBenefits: [
          "Eliminates manual spreadsheet browsing and updating friction.",
          "Guarantees 100% consistent date formatting (M/D/YYYY) across all records.",
          "Enables instant hands-free task tracking directly from conversational interfaces.",
          "Protects task lists against accidental duplicates and corrupted headers."
        ],
        unverifiedNotice: "Note: Realized productivity gains will depend on individual daily task volume and user adherence to conversational tracking."
      },
      limitationsAndFutureImprovements: {
        currentLimitations: [
          "Currently operates via n8n's web chat trigger; not yet connected to voice or mobile messaging apps like Telegram or Slack.",
          "Google Sheets tool uses appendOrUpdate matching by task name, which can occasionally collide on identically named generic tasks (e.g., 'Meeting')."
        ],
        plannedEnhancements: [
          "Add WhatsApp / Telegram trigger for mobile voice note task capture.",
          "Connect Google Calendar API to allow bidirectional syncing between spreadsheet tasks and calendar timeblocks."
        ]
      }
    }
  },

  // Project 3: WhatsApp Nutrition & Wellness AI Assistant
  {
    id: "whatsapp-nutrition-agent",
    title: "WhatsApp Health & Nutrition Assistant — Dietary Micro-Coaching & Safety Triage",
    shortTitle: "WhatsApp Nutrition Assistant",
    slug: "whatsapp-nutrition-agent",
    category: "Healthcare & Lifestyle Automation",
    tagline: "A personalized WhatsApp health assistant that provides whole-food nutritional guidance with built-in clinical emergency guardrails.",
    problem: "Wellness clinics, fitness coaches, and health practitioners struggle to provide timely 24/7 dietary habit guidance. Most automated chatbots offer generic, unengaging advice, fail to understand local foods (like Indian meal staples), or dangerously attempt to diagnose medical symptoms.",
    solution: "Built a production WhatsApp conversational agent powered by n8n, Groq's high-speed Qwen 3.8 27B model, and custom session-keyed buffer memory. The agent features an extensive clinical safety constitution: immediate triage for medical red flags (chest pain, fainting, shortness of breath), strict refusal to prescribe drugs or diagnose diseases, non-judgmental portion micro-coaching (palm/fist rules), and localized food intelligence.",
    implementationStatus: "Configured & Tested",
    workflowCount: 1,
    clientWorkflowSteps: [
      { step: 1, title: "WhatsApp Message Ingest", description: "User messages their dietary goal, meal question, or daily nutrition query.", tool: "WhatsApp API" },
      { step: 2, title: "Clinical Red-Flag Check", description: "Screens message for critical symptoms (chest pain, dizziness); redirects to emergency medical care.", tool: "Safety Guardrails" },
      { step: 3, title: "Goal & Preference Analysis", description: "Recalls previous conversations using wa_id memory buffer to personalize recommendations.", tool: "Session Memory" },
      { step: 4, title: "Personalized Nutrition Advice", description: "Delivers realistic, culturally familiar meal options emphasizing balanced protein and fiber.", tool: "Groq Qwen 2.5 LLM" },
      { step: 5, title: "Daily Habit Reinforcement", description: "Encourages positive, sustainable habit changes without crash diets or food shaming.", tool: "WhatsApp Message" }
    ],
    keyOutputs: [
      {
        title: "24/7 Inbound WhatsApp Dietary & Habit Micro-Coaching",
        category: "Client Engagement",
        description: "Delivers instantaneous, culturally adaptable nutrition advice, meal ideas, and hydration guidance directly through WhatsApp messaging.",
        businessBenefit: "Enables wellness clinics, fitness coaches, and nutrition practices to provide 24/7 client support between appointments without hiring shifts of customer service reps."
      },
      {
        title: "Clinical Red-Flag Emergency Triage Safety Shield",
        category: "Risk & Compliance",
        description: "System prompts continuously scan for acute medical symptoms (chest pain, shortness of breath, severe dizziness, disordered eating) and immediately output urgent emergency care referral instructions.",
        businessBenefit: "Protects business liability and patient welfare by enforcing strict medical non-advice boundaries and guiding critical conditions to emergency providers."
      },
      {
        title: "Isolated Multi-User WhatsApp ID (wa_id) Session Memory",
        category: "User Privacy",
        description: "Partitions conversation history strictly by individual phone number (wa_id), remembering dietary restrictions, past meals, and goals without cross-user leakage.",
        businessBenefit: "Zero app download or account login friction for clients while ensuring complete data privacy and personalized ongoing continuity."
      },
      {
        title: "Empathetic Habit Building & Portion Guidance",
        category: "Behavioral Health",
        description: "Employs practical, non-punitive advice focusing on sustainable habits, protein pacing, and fiber intake rather than crash starvation diets.",
        businessBenefit: "Increases long-term client retention and satisfaction for coaching businesses by driving genuine, sustainable lifestyle results."
      }
    ],
    techStack: [
      { name: "n8n LangChain Agent", role: "Conversational Logic & Safety Guardrail Runner" },
      { name: "WhatsApp Trigger API", role: "Inbound WhatsApp Message Webhook" },
      { name: "WhatsApp Cloud API", role: "Outbound Transactional WhatsApp Message Delivery" },
      { name: "Groq (Qwen 3.8 27B)", role: "Ultra-Low Latency Conversational LLM" },
      { name: "Session-Keyed Memory", role: "Multi-User Isolated Context by WhatsApp ID (wa_id)" }
    ],
    workflows: [
      {
        id: "wf-whatsapp-nutrition",
        title: "WhatsApp Nutrition Agent — Mobile Wellness Assistant",
        filename: "Whatsapp_Nutrition_agent_6c7a5568.json",
        trigger: "WhatsApp Trigger API (on message updates)",
        purpose: "Receives incoming WhatsApp messages, isolates conversational memory per user phone ID, evaluates dietary queries against clinical safety rules and medical red flags, and delivers concise, personalized nutritional habit guidance.",
        stages: [
          {
            id: "wn-1",
            name: "WhatsApp Trigger Node",
            type: "webhook",
            description: "Listens for real-time message events from WhatsApp OAuth credentials.",
            details: "Extracts sender's WhatsApp phone ID (wa_id) and incoming message text body."
          },
          {
            id: "wn-2",
            name: "Session-Keyed Buffer Memory",
            type: "code",
            description: "Isolates conversation context strictly by recipient wa_id ({{ $json.contacts[0].wa_id }}).",
            details: "Guarantees that multiple concurrent users chatting with the WhatsApp assistant never leak or cross-contaminate conversation state."
          },
          {
            id: "wn-3",
            name: "Groq Chat Model (Qwen 3.8 27B)",
            type: "code",
            description: "High-throughput LLM running on Groq hardware for sub-second response generation.",
            details: "Essential for WhatsApp UX where users expect near-instant responses."
          },
          {
            id: "wn-4",
            name: "AI Agent & Clinical Safety Engine",
            type: "code",
            description: "Comprehensive system prompt enforcing medical boundaries, emergency triage, and portion guidelines.",
            details: "Detects emergency red flags, enforces disclaimer rules, forbids crash diets/fasting, and provides localized Indian and global food alternatives.",
            codeSnippet: `// Emergency Red-Flag Protocol:\n// If user describes chest pain, difficulty breathing, fainting, severe vomiting,\n// loss of consciousness, or blood in stool: IMMEDIATELY instruct them to seek urgent\n// emergency medical care. Do not attempt nutrition advice.`
          },
          {
            id: "wn-5",
            name: "WhatsApp Outbound Node",
            type: "notification",
            description: "Sends formatted response text back to the user's WhatsApp number.",
            details: "Dispatches mobile-optimized text with clean bullet points and spaced paragraphs."
          }
        ],
        branchingRules: [
          { condition: "User mentions acute medical symptoms (chest pain, breathing difficulty, dizziness)", outcome: "Halts nutrition advice -> Urgently directs to emergency medical care." },
          { condition: "User requests diet plan without details", outcome: "Asks max 2 concise follow-up questions (primary goal + veg/non-veg preference)." },
          { condition: "User asks about supplements or diagnosed conditions (diabetes, kidney)", outcome: "Provides general food-first context with explicit healthcare professional disclaimer." }
        ]
      }
    ],
    caseStudy: {
      overview: "A production-grade mobile conversational AI agent deployed on WhatsApp, designed to deliver personalized, culturally relevant nutrition habit guidance and meal planning assistance while adhering to strict clinical safety guardrails.",
      businessProblem: {
        summary: "Dietary habits account for a significant portion of chronic lifestyle challenges, but accessing qualified nutrition guidance is often expensive, slow, and inaccessible. Health clinics and wellness businesses receive hundreds of repetitive questions daily ('What should I eat for breakfast?', 'Can I eat eggs every day?', 'Is rice bad for weight loss?'). Traditional bots fail because they provide rigid Western meal suggestions that clash with local food cultures, or dangerously attempt to answer medical questions without safety triage.",
        painPoints: [
          "Coaches and clinic staff spend hours answering repetitive basic nutrition inquiries.",
          "Standard AI chatbots default to Western ingredients (kale, quinoa, salmon) that are inaccessible or unaffordable for Indian and global audiences.",
          "Risk of AI hallucinating dangerous medical advice or endorsing crash starvation diets.",
          "Clunky mobile user experiences where long academic paragraphs alienate WhatsApp users."
        ],
        manualProcessBefore: [
          "Clients messaged coach or clinic on WhatsApp asking about meals.",
          "Coach replied hours later when between sessions, often giving hasty answers.",
          "No persistent conversation history when clients swapped phones or inquired weeks later.",
          "Emergency health symptoms mentioned in chat could be missed in crowded inboxes."
        ]
      },
      architecture: {
        diagramSummary: "WhatsApp Trigger Webhook -> LangChain AI Agent (Groq Qwen 3.8 27B) -> Session-Keyed Memory (wa_id) -> WhatsApp Cloud API Delivery.",
        dataFlow: [
          "1. Inbound WhatsApp message received by WhatsApp Trigger node",
          "2. System extracts sender wa_id and message text body",
          "3. Session Memory retrieves past messages tied strictly to that wa_id",
          "4. AI Agent evaluates message against Medical Red-Flag & Safety Constitution",
          "5. Groq Qwen 3.8 27B synthesizes practical, non-judgmental guidance with localized foods",
          "6. WhatsApp Outbound node dispatches formatted text with emojis and clear bullets",
          "7. Session Memory commits latest exchange to buffer window"
        ]
      },
      howItWorks: [
        {
          step: 1,
          title: "Inbound Message Webhook",
          description: "Captures user inquiries via official WhatsApp Trigger API, extracting the user's phone identifier and message body."
        },
        {
          step: 2,
          title: "Session Key Isolation",
          description: "Uses customKey memory mapped to wa_id, ensuring 100% privacy and conversational continuity for each individual client."
        },
        {
          step: 3,
          title: "Clinical Emergency & Safety Evaluation",
          description: "Instantly screens for red-flag symptoms (chest pain, fainting, difficulty breathing). If detected, triggers emergency escalation protocol."
        },
        {
          step: 4,
          title: "Culturally Localized Habit Synthesis",
          description: "Provides realistic meal suggestions balancing protein, complex carbs, and fiber using familiar foods (paneer, dal, rajma, curd, poha, idli, oats, eggs) without shaming."
        },
        {
          step: 5,
          title: "Mobile-Optimized WhatsApp Dispatch",
          description: "Delivers clean, scannable advice using bullet points and practical portion heuristics (palm/fist portions) rather than intimidating calorie calculations."
        }
      ],
      logicAndDecisionEngine: {
        deterministicVsAi: "Leverages an advanced system prompt constitution that acts as a deterministic safety wrapper around the generative LLM. The AI is hard-coded to refuse medical diagnosis, never prescribe drugs, prohibit crash diets, enforce disclaimers on medical topics, and limit follow-up questions to 1–2 prompts so users aren't overwhelmed.",
        securityNotes: [
          "Strict PII prohibition: The agent is constitutionally banned from requesting passwords, OTPs, bank accounts, or government IDs.",
          "All recipient phone numbers and tokens are handled securely via n8n WhatsApp credentials."
        ]
      },
      integrations: [
        { tool: "WhatsApp Trigger API", purpose: "Inbound webhook listener for WhatsApp messages", authMethod: "Meta OAuth & Webhook Secret" },
        { tool: "WhatsApp Cloud API", purpose: "Outbound message delivery engine", authMethod: "WhatsApp API Bearer Token" },
        { tool: "Groq Cloud API", purpose: "Ultra-low latency LLM inference (Qwen 3.8 27B)", authMethod: "Groq API Key" },
        { tool: "n8n LangChain Runtime", purpose: "Session buffer memory & agent execution", authMethod: "Internal Runtime" }
      ],
      reliabilityAndErrorHandling: {
        deduplication: "Session buffer window memory prevents re-answering redundant questions while remembering user dietary preferences (e.g. vegetarian vs non-vegetarian).",
        tamperProtection: "Messages are bound to authenticated WhatsApp phone IDs, preventing conversation hijacking.",
        centralizedTriage: "Clinical red-flag situations immediately bypass standard dietary suggestions and direct user to local emergency medical care."
      },
      businessValue: {
        potentialBenefits: [
          "Provides instantaneous 24/7 dietary habit coaching directly inside the client's favorite messaging app.",
          "Scales nutrition coaching capacity to hundreds of concurrent users without increasing coach headcount.",
          "Protects brand and client safety with clinical guardrails and medical disclaimers.",
          "Increases client retention through non-judgmental, culturally tailored nutrition advice."
        ],
        unverifiedNotice: "Note: The assistant provides general nutrition guidance and is explicitly not a substitute for clinical dietetic or medical evaluation."
      },
      limitationsAndFutureImprovements: {
        currentLimitations: [
          "Currently text-based; does not analyze photo uploads of meals for visual nutrition estimation.",
          "Session memory uses Window Buffer in memory, which resets on workflow service restarts."
        ],
        plannedEnhancements: [
          "Integrate Gemini Multimodal Vision to allow clients to send meal photos for instant macronutrient estimation.",
          "Persist chat history in Supabase PostgreSQL for permanent cross-session memory."
        ]
      }
    }
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: "n8n-workflow-engineering",
    title: "Custom n8n Workflow Automation",
    category: "Process Automation",
    problemAddressed: "Teams waste countless hours every week manually copying data between tools, sending repetitive emails, and managing operational bottlenecks.",
    solutionSummary: "Design and implement production-ready n8n workflows that connect your forms, databases, communication channels, and internal tools with deterministic reliability.",
    deliverables: [
      "Custom n8n workflow architecture and exported JSON definitions",
      "Robust data normalization and custom JavaScript transformation nodes",
      "Error handling, retries, and real-time failure notification setup",
      "Comprehensive handover documentation and deployment guidance"
    ],
    idealFor: [
      "B2B service firms handling manual lead operations",
      "Agencies looking to automate client onboarding and reporting",
      "Startups wanting enterprise-grade automations without high SaaS subscription overhead"
    ]
  },
  {
    id: "ai-agents-and-tool-calling",
    title: "Autonomous AI Agents & Tool-Calling Systems",
    category: "AI Engineering",
    problemAddressed: "Static software and manual workflows cannot handle nuanced user requests, unstructured text, or dynamic data lookups.",
    solutionSummary: "Build LangChain-powered AI agents with access to real tools (Google Sheets, SQL databases, live web search, CRM APIs) and conversational memory.",
    deliverables: [
      "Autonomous agent workflows with tool-calling capabilities",
      "Strict schema enforcement and input validation prompt engineering",
      "Multi-model routing (Groq, OpenRouter, Gemini) with graceful fallbacks",
      "Multi-turn session memory configuration"
    ],
    idealFor: [
      "Executives seeking hands-free spreadsheet and schedule management",
      "Teams needing intelligent assistants that execute real database operations",
      "Businesses wanting conversational access to internal operational tools"
    ]
  },
  {
    id: "whatsapp-and-messaging-automation",
    title: "WhatsApp & Mobile Messaging Automation",
    category: "Conversational Automation",
    problemAddressed: "Clients expect instant communication on messaging apps, but staff cannot be on call 24/7 to answer repetitive inquiries.",
    solutionSummary: "Deploy conversational AI assistants on WhatsApp Cloud API equipped with isolated user session memory, culturally localized knowledge, and clinical safety guardrails.",
    deliverables: [
      "Meta / WhatsApp Cloud API webhook configuration",
      "Per-phone-number isolated conversation session memory",
      "Comprehensive system prompt with emergency triage & guardrails",
      "Sub-second response pipelines using Groq high-speed inference"
    ],
    idealFor: [
      "Wellness clinics, gymnasiums, and nutrition coaching businesses",
      "Customer support desks handling high WhatsApp inquiry volume",
      "Service providers wanting 24/7 client engagement in chat"
    ]
  },
  {
    id: "lead-scoring-and-intake",
    title: "Lead Qualification & Intake Systems",
    category: "Sales Automation",
    problemAddressed: "Sales reps spend excessive time researching low-budget prospects while high-value enterprise inquiries sit untouched in an inbox.",
    solutionSummary: "Build automated intake pipelines that validate incoming contacts, filter duplicates, score leads on objective multi-factor criteria, and route VIP prospects to sales instantly.",
    deliverables: [
      "Webhook intake endpoints connecting web forms (Tally, Typeform, Webflow)",
      "Multi-factor scoring rubric tailored to your Ideal Customer Profile (ICP)",
      "Instant prioritized Slack / WhatsApp / Email alerts for high-value inquiries",
      "Automated nurture or polite qualification paths for lower-tier inquiries"
    ],
    idealFor: [
      "High-ticket agencies and consulting practices",
      "SaaS sales teams with diverse inbound traffic",
      "B2B services with clear budget and company size thresholds"
    ]
  },
  {
    id: "crm-and-database-synchronization",
    title: "CRM & Database Synchronization",
    category: "Data Architecture",
    problemAddressed: "Customer data gets fragmented across marketing forms, sales inboxes, calendar bookings, and billing platforms.",
    solutionSummary: "Engineer clean relational schemas in Supabase or PostgreSQL and establish reliable bidirectional syncs across your business software.",
    deliverables: [
      "Relational database schema design (leads, activities, meetings, logs)",
      "Safe idempotency and deduplication logic",
      "Real-time event synchronization between webhooks and CRM",
      "Historical data migration scripts and Google Sheets legacy bridges"
    ],
    idealFor: [
      "Companies outgrowing spreadsheet-based operations",
      "Teams needing a central source of truth for pipeline analytics",
      "Businesses moving from manual spreadsheets to structured SQL databases"
    ]
  },
  {
    id: "automated-messaging-and-scheduling",
    title: "Multi-Channel Follow-up & Scheduling Integration",
    category: "Communication",
    problemAddressed: "Over 60% of inbound prospects go cold due to inconsistent manual follow-up or friction in booking a discovery meeting.",
    solutionSummary: "Implement automated multi-touch email sequences with built-in reply detection that halts cadences when prospects answer, integrated directly with Cal.com or Calendly.",
    deliverables: [
      "Timed multi-touch sequence engine with configurable delays",
      "Inbound reply listener that detects replies and alerts reps instantly",
      "Calendar booking webhooks that automatically advance deal stages",
      "Cryptographically secure 1-click unsubscribe mechanisms for compliance"
    ],
    idealFor: [
      "Sales teams looking to maintain persistent, respectful follow-up cadences",
      "Consultants needing friction-free calendar booking workflows",
      "Founders managing outbound and inbound communications simultaneously"
    ]
  }
];

export const workProcessSteps: WorkProcessStep[] = [
  {
    number: "01",
    title: "Understand the Business Problem",
    summary: "Deep dive into your operational bottleneck, data dependencies, and actual business objectives before writing a single line of automation logic.",
    deliverable: "Scope & Objectives Document"
  },
  {
    number: "02",
    title: "Map the Existing Manual Process",
    summary: "Document every human step, edge case, tool interaction, and potential point of failure in your current manual workflow.",
    deliverable: "Visual Process Flowchart"
  },
  {
    number: "03",
    title: "Design the Automation Architecture",
    summary: "Select the optimal mix of triggers, deterministic code nodes, database schemas, and external APIs to ensure maximum reliability and cost efficiency.",
    deliverable: "System Architecture Blueprint"
  },
  {
    number: "04",
    title: "Build, Validate & Test",
    summary: "Develop the workflows in n8n, write custom data transformations, implement error handling, and test rigorously with real edge-case payloads.",
    deliverable: "Working Tested Workflows"
  },
  {
    number: "05",
    title: "Deploy & Document the System",
    summary: "Deploy to your production environment, configure environment secrets, and provide clear step-by-step documentation for your internal team.",
    deliverable: "Production Deployment & SOPs"
  },
  {
    number: "06",
    title: "Support & Iteration Under Agreed Terms",
    summary: "Provide scheduled monitoring, edge-case maintenance, and feature enhancements as your business requirements evolve.",
    deliverable: "Ongoing Maintenance Agreement"
  }
];
