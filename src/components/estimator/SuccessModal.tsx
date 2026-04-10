import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Mail, X, ArrowRight } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectDetails: string;
  recipientEmail: string;
}

export const SuccessModal = ({ isOpen, onClose, projectDetails, recipientEmail }: SuccessModalProps) => {
  const handleSendEmail = async () => {
    // Save to server database
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDetails,
          recipientEmail,
          source: window.location.pathname
        })
      });
    } catch (error) {
      console.error("Failed to save lead to server:", error);
    }

    const subject = encodeURIComponent("New Project Quotation Request - Structura");
    const body = encodeURIComponent(
      `Hello Structura Team,\n\nI would like to request a formal quotation for my project with the following details:\n\n${projectDetails}\n\nPlease get back to me as soon as possible.\n\nBest regards,`
    );
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl text-center"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-secondary/20 hover:text-secondary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-3xl font-black text-secondary tracking-tighter mb-4">
              Estimate Ready!
            </h3>
            <p className="text-secondary/60 font-medium mb-10 leading-relaxed">
              Your design cost estimate has been generated. To receive a formal signed quotation, please send these details to our business email.
            </p>

            <div className="space-y-3">
              <button 
                onClick={handleSendEmail}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3"
              >
                <Mail className="w-5 h-5" />
                Send via Gmail
              </button>
              <button 
                onClick={onClose}
                className="w-full bg-secondary/5 hover:bg-secondary/10 text-secondary font-bold py-4 rounded-2xl transition-all"
              >
                Back to Estimator
              </button>
            </div>

            <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mt-8">
              Recipient: {recipientEmail}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
