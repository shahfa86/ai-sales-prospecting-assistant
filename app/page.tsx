"use client";

import { FormEvent, useMemo, useState } from "react";

type ProspectingForm = {
  companyName: string;
  companyWebsite: string;
  industry: string;
  targetPersona: string;
  productOrService: string;
  outreachGoal: string;
};

type ProspectingOutput = {
  accountSummary: string;
  buyerPriorities: string[];
  likelyPainPoints: string[];
  discoveryQuestions: string[];
  coldEmail: string;
  callOpeningScript: string;
  linkedInMessage: string;
  crmNotes: string[];
  recommendedNextSteps: string[];
};

const emptyForm: ProspectingForm = {
  companyName: "",
  companyWebsite: "",
  industry: "",
  targetPersona: "",
  productOrService: "",
  outreachGoal: "",
};

const fields = [
  {
    id: "companyName",
    label: "Company name",
    placeholder: "Acme Manufacturing",
  },
  {
    id: "companyWebsite",
    label: "Company website",
    placeholder: "https://www.example.com",
  },
  {
    id: "industry",
    label: "Industry",
    placeholder: "Industrial equipment",
  },
  {
    id: "targetPersona",
    label: "Target persona",
    placeholder: "VP of Operations",
  },
  {
    id: "productOrService",
    label: "Product or service being sold",
    placeholder: "Predictive maintenance platform",
  },
  {
    id: "outreachGoal",
    label: "Main outreach goal",
    placeholder: "Book a 20-minute discovery call",
  },
] as const;

function tidy(value: string, fallback: string) {
  return value.trim() || fallback;
}

function generateMockProspectingOutput(form: ProspectingForm): ProspectingOutput {
  const company = tidy(form.companyName, "the account");
  const website = tidy(form.companyWebsite, "their website");
  const industry = tidy(form.industry, "their market");
  const persona = tidy(form.targetPersona, "the target buyer");
  const offering = tidy(form.productOrService, "your solution");
  const goal = tidy(form.outreachGoal, "start a helpful conversation");

  return {
    accountSummary: `${company} appears to be a ${industry} organization. Based on the website provided (${website}), the best starting point is a practical message for ${persona} that connects ${offering} to measurable business outcomes and supports the goal to ${goal}.`,
    buyerPriorities: [
      `Improve operational results in ${industry} without adding unnecessary complexity.`,
      `Understand how ${offering} can create value quickly for ${persona}.`,
      "Reduce risk, save time, and make the next buying step easy to evaluate.",
    ],
    likelyPainPoints: [
      `Manual or disconnected workflows may slow down teams at ${company}.`,
      `${persona} may need clearer visibility into performance, cost, or pipeline impact.`,
      `Existing tools may not fully support the desired outcome: ${goal}.`,
    ],
    discoveryQuestions: [
      `What is the biggest challenge your team is trying to solve in ${industry} this quarter?`,
      `How does ${company} currently measure success for this area?`,
      `What would make ${offering} worth exploring for ${persona}?`,
      `If you achieved ${goal}, what would change for your team?`,
    ],
    coldEmail: `Subject: Quick idea for ${company}\n\nHi ${persona},\n\nI noticed ${company} works in ${industry}, and I wanted to share a practical idea. Teams often look for ways to reduce friction, improve visibility, and move faster without creating extra work.\n\n${offering} may be able to help your team make progress toward ${goal}.\n\nWould it be worth a short conversation to compare what you are doing today with a few options that could be easy to evaluate?\n\nBest,\nYour Name`,
    callOpeningScript: `Hi, this is Your Name. I am reaching out because ${company} looks like a strong fit for a short conversation about ${offering}. I work with teams in ${industry} that want to ${goal}. Do you have a minute for me to explain why I called?`,
    linkedInMessage: `Hi ${persona}, I came across ${company} and thought your team may be interested in practical ways ${offering} can support ${goal}. Open to connecting?`,
    crmNotes: [
      `Account: ${company}`,
      `Website: ${website}`,
      `Industry: ${industry}`,
      `Persona: ${persona}`,
      `Offering: ${offering}`,
      `Primary goal: ${goal}`,
    ],
    recommendedNextSteps: [
      `Review ${company}'s website for recent news, customer segments, and leadership priorities.`,
      `Personalize the cold email with one specific observation about ${industry}.`,
      `Send the LinkedIn message to ${persona} after the first email.`,
      "Log the outreach sequence and schedule a follow-up reminder in the CRM.",
    ],
  };
}

function OutputCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="output-card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export default function Home() {
  // Main form state: each input writes to this single object so beginners can see the full form shape in one place.
  const [form, setForm] = useState<ProspectingForm>(emptyForm);
  const [output, setOutput] = useState<ProspectingOutput | null>(null);

  const completedFields = useMemo(
    () => Object.values(form).filter((value) => value.trim().length > 0).length,
    [form],
  );

  function handleChange(field: keyof ProspectingForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Submit handler: stop the browser refresh and generate a local mock result from the current form values.
    event.preventDefault();
    setOutput(generateMockProspectingOutput(form));
  }

  function handleReset() {
    setForm(emptyForm);
    setOutput(null);
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Beginner-friendly Next.js + TypeScript project</p>
          <h1>AI Sales Prospecting Assistant</h1>
          <p className="hero-copy">
            Turn basic account details into a polished mock prospecting brief, complete with outreach copy,
            discovery prompts, CRM notes, and next steps. Everything runs locally with simple React state.
          </p>
          <div className="hero-actions">
            <a href="#prospecting-form" className="primary-link">
              Build a prospecting brief
            </a>
            <span>{completedFields} of 6 fields filled</span>
          </div>
        </div>
        <div className="hero-card" aria-label="Application highlights">
          <p>Version 1</p>
          <strong>Mock AI-style output only</strong>
          <span>No API keys, no backend, and no external services required.</span>
        </div>
      </section>

      <section className="workspace">
        <form id="prospecting-form" className="form-card" onSubmit={handleSubmit}>
          <div className="section-heading">
            <p className="eyebrow">Input</p>
            <h2>Prospect details</h2>
            <p>Enter the basics about the account and the message you want to send.</p>
          </div>

          <div className="field-grid">
            {fields.map((field) => (
              <label key={field.id}>
                <span>{field.label}</span>
                <input
                  value={form[field.id]}
                  onChange={(event) => handleChange(field.id, event.target.value)}
                  placeholder={field.placeholder}
                />
              </label>
            ))}
          </div>

          <div className="button-row">
            <button type="submit">Generate mock brief</button>
            <button type="button" className="secondary-button" onClick={handleReset}>
              Clear
            </button>
          </div>
        </form>

        <div className="results-panel">
          <div className="section-heading">
            <p className="eyebrow">Output</p>
            <h2>Sales prospecting brief</h2>
            <p>
              Mock output generation: this section uses only the text you entered and simple template logic in
              this file.
            </p>
          </div>

          {!output ? (
            <div className="empty-state">
              <h3>Your generated brief will appear here.</h3>
              <p>Fill in the form and submit it to see beginner-friendly mock AI-style sales guidance.</p>
            </div>
          ) : (
            <div className="output-grid">
              <OutputCard title="1. Account summary">
                <p>{output.accountSummary}</p>
              </OutputCard>

              <OutputCard title="2. Buyer priorities">
                <ul>{output.buyerPriorities.map((item) => <li key={item}>{item}</li>)}</ul>
              </OutputCard>

              <OutputCard title="3. Likely pain points">
                <ul>{output.likelyPainPoints.map((item) => <li key={item}>{item}</li>)}</ul>
              </OutputCard>

              <OutputCard title="4. Discovery questions">
                <ul>{output.discoveryQuestions.map((item) => <li key={item}>{item}</li>)}</ul>
              </OutputCard>

              <OutputCard title="5. Cold email">
                <pre>{output.coldEmail}</pre>
              </OutputCard>

              <OutputCard title="6. Call opening script">
                <p>{output.callOpeningScript}</p>
              </OutputCard>

              <OutputCard title="7. LinkedIn message">
                <p>{output.linkedInMessage}</p>
              </OutputCard>

              <OutputCard title="8. CRM notes">
                <ul>{output.crmNotes.map((item) => <li key={item}>{item}</li>)}</ul>
              </OutputCard>

              <OutputCard title="9. Recommended next steps">
                <ul>{output.recommendedNextSteps.map((item) => <li key={item}>{item}</li>)}</ul>
              </OutputCard>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
