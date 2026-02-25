import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 md:px-12 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Last updated: February 25, 2026</p>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
          <p>
            At MamaSafe AI, we are committed to protecting your privacy and the sensitive health data entrusted to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, such as when you create an account, register a patient, or communicate with us. This may include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and professional credentials.</li>
            <li><strong>Patient Health Information (PHI):</strong> Medical history, symptoms, diagnosis data, and treatment plans entered into the system.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our platform, including access times and features used.</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, maintain, and improve our services.</li>
            <li>Process transactions and manage user accounts.</li>
            <li>Send technical notices, updates, security alerts, and support messages.</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our service.</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Data Security and Isolation</h2>
          <p>
            We implement robust security measures to protect your data. A key feature of MamaSafe AI is <strong>Facility-Level Data Isolation</strong>. This means that patient data is strictly segregated; a clinic cannot access data from another facility unless explicitly authorized for a referral or transfer. We use industry-standard encryption for data in transit and at rest.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Sharing of Information</h2>
          <p>
            We do not sell your personal information. We may share information as follows:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>With Vendors and Service Providers:</strong> Who need access to such information to carry out work on our behalf (e.g., hosting, SMS delivery).</li>
            <li><strong>For Legal Reasons:</strong> If we believe disclosure is in accordance with, or required by, any applicable law or legal process.</li>
            <li><strong>Aggregated Data:</strong> We may share aggregated or de-identified information that cannot reasonably be used to identify you.</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">5. Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal information, including the right to access, correct, or delete your data. To exercise these rights, please contact us.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, provide you with additional notice.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@mamasafe.ai.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
