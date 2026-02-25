import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 md:px-12 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-slate-500 mb-8">Last updated: February 25, 2026</p>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the MamaSafe AI website and services (the "Service") operated by MamaSafe AI ("us", "we", or "our").
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. Use of Service</h2>
          <p>
            MamaSafe AI provides a platform for maternal and primary healthcare management. You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account and password.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Medical Disclaimer</h2>
          <p>
            The Service provides information and tools for healthcare management but does not provide medical advice, diagnosis, or treatment. The AI-powered features are intended to support, not replace, professional medical judgment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Data Privacy and Security</h2>
          <p>
            We take the privacy and security of patient data seriously. Our use of your personal information is governed by our Privacy Policy. By using the Service, you consent to the collection and use of information as detailed in our Privacy Policy.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of MamaSafe AI and its licensors. The Service is protected by copyright, trademark, and other laws.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">6. Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">7. Limitation of Liability</h2>
          <p>
            In no event shall MamaSafe AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">8. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@mamasafe.ai.
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
           <button 
            onClick={onBack}
            className="px-6 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
          >
            I Understand and Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
