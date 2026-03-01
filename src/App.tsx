import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import { HeroAnimation } from './HeroAnimation';
import { ClinicAnimation } from './ClinicAnimation';
import { PharmacyAnimation } from './PharmacyAnimation';
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Activity,
  Users,
  Calendar,
  MessageSquare,
  ShieldCheck,
  BarChart3,
  Stethoscope,
  Pill,
  LayoutDashboard,
  ArrowRight,
  Linkedin,
  Instagram,
  Facebook
} from 'lucide-react';

// --- Components ---

const Button = ({
  children,
  variant = 'primary',
  href,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  href?: string;
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-[#0f172a] text-white hover:bg-[#1e293b] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-900/10",
    secondary: "bg-white text-[#0f172a] border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
    outline: "border border-slate-300 text-[#0f172a] hover:bg-slate-50",
    text: "text-[#0f172a] hover:text-slate-600 px-4",
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "", id = "" }) => (
  <section id={id} className={`py-16 md:py-24 px-6 md:px-8 max-w-[1400px] mx-auto ${className}`}>
    {children}
  </section>
);

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Main App Component ---

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'terms' | 'privacy'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [-20, 0]);

  const navLinks = [
    { name: "Product", href: "#product" },
    { name: "For Clinics", href: "#clinics" },
    { name: "For Pharmacies", href: "#pharmacies" },
    { name: "Programs", href: "#programs" },
    { name: "Pricing", href: "#pricing" },
  ];

  if (currentView === 'terms') {
    return (
      <TermsOfService
        onBack={() => {
          setCurrentView('home');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (currentView === 'privacy') {
    return (
      <PrivacyPolicy
        onBack={() => {
          setCurrentView('home');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* --- Navigation --- */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass-nav"
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs font-bold">M</div>
            MamaSafe AI
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="https://mamasafeai.netlify.app/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Sign In
            </a>
            <Button href="https://mamasafeai.netlify.app/" className="px-5 py-2 h-9 text-xs">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-b border-slate-100 px-6 py-4 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-slate-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-100" />
              <a href="https://mamasafeai.netlify.app/" className="text-base font-medium text-slate-600 py-2">Sign In</a>
              <Button href="https://mamasafeai.netlify.app/" className="w-full justify-center">Get Started</Button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* --- Hero Section --- */}
      <section className="pt-24 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-6 text-balance">
              The AI operating system for modern clinics and pharmacies.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg md:text-2xl text-slate-500 mb-10 max-w-3xl mx-auto text-balance font-light leading-relaxed">
              MamaSafe AI unifies AI triage, clinic workflows, pharmacy dispensing, and patient follow-ups into one calm, intelligent workspace, designed for maternal and primary care in Africa.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Button href="https://mamasafeai.netlify.app/" className="h-12 px-8 text-base w-full sm:w-auto">
                Get Started with MamaSafe AI
              </Button>
              <Button variant="text" href="#product" className="group flex items-center gap-2">
                See how it works <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="relative max-w-5xl mx-auto">
            <HeroAnimation />
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-100/50 via-purple-100/30 to-teal-100/50 blur-3xl -z-10 rounded-full opacity-60"></div>
          </FadeIn>
        </div>
      </section>

      {/* --- Product Overview --- */}
      <Section id="product" className="bg-white rounded-[3rem] my-12">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-6">How MamaSafe AI works</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">A complete care loop from the moment a patient walks in until they are fully recovered.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Stethoscope className="w-6 h-6 text-indigo-600" />,
              title: "Enroll & Triage",
              desc: "AI-powered symptom analysis to quickly assess risk and guide next steps."
            },
            {
              icon: <Activity className="w-6 h-6 text-indigo-600" />,
              title: "Structured Workflow",
              desc: "Registration → History → Lab → Diagnosis → Pharmacy → Payment."
            },
            {
              icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
              title: "Automated Follow-ups",
              desc: "Tasks due, 24h follow-ups, SMS/WhatsApp reminders, and clear queues."
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
              title: "Track Impact",
              desc: "AI conversations, tests done, tasks resolved, and facility-level metrics."
            }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1} className="bg-slate-50 rounded-3xl p-8 hover:bg-slate-100 transition-colors duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* --- For Clinics --- */}
      <Section id="clinics">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wide mb-6">
              For Clinics
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-balance">
              Give your clinic a calm, intelligent command center.
            </h2>
            <p className="text-xl text-slate-500 mb-8 leading-relaxed">
              One view for all patients, visits, lab tests, diagnoses, and payments. AI triage flags high-risk patients early, while clear workflows ensure junior and senior clinicians work consistently.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Real-time dashboard with visits today",
                "AI triage & risk assessment",
                "Integrated lab & diagnosis workflow",
                "Automated patient reminders"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="outline" href="https://mamasafeai.netlify.app/">
              Explore Clinic Features
            </Button>
          </FadeIn>
          <FadeIn delay={0.2} className="relative">
            <ClinicAnimation />
          </FadeIn>
        </div>
      </Section>

      {/* --- For Pharmacies --- */}
      <Section id="pharmacies" className="bg-slate-900 rounded-[3rem] text-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 lg:order-1 relative">
            <PharmacyAnimation />
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-6 border border-emerald-500/20">
              For Pharmacies
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 text-balance">
              Turn your pharmacy into a proactive care partner.
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Dispensing queue showing who to serve now, "Dispensed today" logs, and automatic follow-up dates to keep patients on track with their medication adherence.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Dedicated dispensing queue",
                "Medication adherence tracking",
                "Inventory visibility",
                "Automated refill reminders"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button className="bg-white text-slate-900 hover:bg-slate-100" href="https://mamasafeai.netlify.app/">
              View Pharmacy Tools
            </Button>
          </FadeIn>
        </div>
      </Section>

      {/* --- For Programs (Superadmin) --- */}
      <Section id="programs">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold uppercase tracking-wide mb-6">
            For Programs & NGOs
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6">
            Manage dozens of facilities from a single pane of glass.
          </h2>
          <p className="text-xl text-slate-500">
            Onboard and manage clinics, view subscriptions, track AI conversations, and measure overall program impact across your entire network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Centralized Management",
              desc: "Onboard facilities, manage users, and configure settings from one superadmin portal.",
              color: "bg-blue-50 text-blue-600"
            },
            {
              title: "Impact Analytics",
              desc: "Real-time dashboards showing tests done, patients treated, and tasks resolved.",
              color: "bg-purple-50 text-purple-600"
            },
            {
              title: "Subscription Control",
              desc: "Manage billing, subscriptions, and feature access for every facility in your network.",
              color: "bg-orange-50 text-orange-600"
            }
          ].map((card, i) => (
            <FadeIn key={i} delay={i * 0.1} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50">
              <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-6`}>
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{card.title}</h3>
              <p className="text-slate-500">{card.desc}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* --- Features Deep Dive --- */}
      <Section className="bg-slate-50 rounded-[3rem]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {[
            {
              title: "AI & Intelligence",
              points: ["AI symptom checker", "Triage reasoning engine", "Next appointment suggestions"],
              icon: <Activity className="w-6 h-6" />
            },
            {
              title: "Patient Journey",
              points: ["Seamless enrollment", "Complete medical history", "Transfer between facilities"],
              icon: <Users className="w-6 h-6" />
            },
            {
              title: "Messaging",
              points: ["SMS reminders", "WhatsApp notifications", "2-way engagement"],
              icon: <MessageSquare className="w-6 h-6" />
            },
            {
              title: "Security & Privacy",
              points: ["Facility-level isolation", "Role-based access", "Audit logging"],
              icon: <ShieldCheck className="w-6 h-6" />
            },
            {
              title: "Workflow",
              points: ["6-stage clinical flow", "Lab integration", "Pharmacy dispensing"],
              icon: <Calendar className="w-6 h-6" />
            },
            {
              title: "Billing & Usage",
              points: ["Transparent billing", "AI usage metering", "Financial reports"],
              icon: <BarChart3 className="w-6 h-6" />
            }
          ].map((feature, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm text-slate-900">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              </div>
              <ul className="space-y-2 pl-12">
                {feature.points.map((point, j) => (
                  <li key={j} className="text-slate-500 text-sm list-disc marker:text-slate-300">
                    {point}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* --- Pricing --- */}
      <Section id="pricing">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-6">Simple, transparent pricing.</h2>
          <p className="text-xl text-slate-500">Choose the plan that fits your facility or program.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FadeIn className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-medium text-slate-900 mb-2">Clinics & Pharmacies</h3>
            <div className="text-4xl font-bold text-slate-900 mb-6">Standard</div>
            <p className="text-slate-500 mb-8">Perfect for individual facilities looking to modernize their operations.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3 text-slate-700"><Check className="w-5 h-5 text-green-500" /> Full Workflow OS</li>
              <li className="flex gap-3 text-slate-700"><Check className="w-5 h-5 text-green-500" /> AI Triage & Symptom Checker</li>
              <li className="flex gap-3 text-slate-700"><Check className="w-5 h-5 text-green-500" /> SMS/WhatsApp Reminders</li>
              <li className="flex gap-3 text-slate-700"><Check className="w-5 h-5 text-green-500" /> Patient Management</li>
            </ul>
            <Button href="https://mamasafeai.netlify.app/" className="w-full">Get Started</Button>
          </FadeIn>

          <FadeIn delay={0.1} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl text-white">
            <h3 className="text-xl font-medium text-slate-200 mb-2">Programs & NGOs</h3>
            <div className="text-4xl font-bold text-white mb-6">Enterprise</div>
            <p className="text-slate-400 mb-8">For health systems managing multiple facilities and measuring impact at scale.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-emerald-400" /> Superadmin Portal</li>
              <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-emerald-400" /> Multi-facility Analytics</li>
              <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-emerald-400" /> Custom Integrations</li>
              <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-emerald-400" /> Dedicated Support</li>
            </ul>
            <Button variant="secondary" href="https://mamasafeai.netlify.app/" className="w-full">Contact Sales</Button>
          </FadeIn>
        </div>
      </Section>

      {/* --- FAQ --- */}
      <Section className="border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {[
              { q: "Where is MamaSafe AI available?", a: "MamaSafe AI is currently launching in Kenya and expanding across Africa. It is designed for low-resource settings." },
              { q: "Does it work with low connectivity?", a: "Yes, the platform is optimized for low-bandwidth environments, though an internet connection is required for AI features." },
              { q: "Is patient data secure?", a: "Absolutely. We use strict facility-level data isolation and industry-standard encryption to ensure patient privacy." },
              { q: "How does it integrate with existing workflows?", a: "MamaSafe AI is designed to replace manual paper records or fragmented systems, becoming the single source of truth for the patient journey." }
            ].map((item, i) => (
              <div key={i} className="border-b border-slate-100 pb-8">
                <h3 className="text-lg font-medium text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- Footer --- */}
      <footer className="bg-slate-50 py-16 px-6 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs font-bold">M</div>
                <span className="text-lg font-semibold text-slate-900">MamaSafe AI</span>
              </div>
              <p className="text-slate-500 max-w-xs">
                The calm, intelligent control center for modern clinics and pharmacies.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><a href="#clinics" className="hover:text-slate-900">For Clinics</a></li>
                  <li><a href="#pharmacies" className="hover:text-slate-900">For Pharmacies</a></li>
                  <li><a href="#programs" className="hover:text-slate-900">For Programs</a></li>
                  <li><a href="#pricing" className="hover:text-slate-900">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-slate-900">About</a></li>
                  <li><a href="#" className="hover:text-slate-900">Contact</a></li>
                  <li>
                    <a href="/privacy.html" className="hover:text-slate-900 text-left">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms.html" className="hover:text-slate-900 text-left">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/deletion.html" className="hover:text-slate-900 text-left">
                      Data Deletion
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Connect</h4>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/company/mamasafe-ai/" className="text-slate-400 hover:text-indigo-600 transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/edwar.dogola" className="text-slate-400 hover:text-indigo-600 transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/share/1HgY12Zh5W/" className="text-slate-400 hover:text-indigo-600 transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
            <p className="text-sm text-slate-400">© 2026 MamaSafe AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="https://mamasafeai.netlify.app/" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
