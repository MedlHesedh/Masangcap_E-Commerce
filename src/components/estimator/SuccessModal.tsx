import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Mail, X, ArrowRight, PartyPopper } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectDetails: string;
  recipientEmail: string;
}

export const SuccessModal = ({ isOpen, onClose, projectDetails, recipientEmail }: SuccessModalProps) => {
  const [isSent, setIsSent] = useState(false);

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
    
    // Show confirmation screen
    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl text-center overflow-hidden"
          >
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 text-secondary/20 hover:text-secondary transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
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
                      onClick={handleClose}
                      className="w-full bg-secondary/5 hover:bg-secondary/10 text-secondary font-bold py-4 rounded-2xl transition-all"
                    >
                      Back to Estimator
                    </button>
                  </div>

                  <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mt-8">
                    Recipient: {recipientEmail}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 relative">
                    <PartyPopper className="w-12 h-12" />
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 1] }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <h3 className="text-4xl font-black text-secondary tracking-tighter mb-4">
                    Request Sent!
                  </h3>
                  <p className="text-secondary/60 font-medium mb-10 leading-relaxed">
                    Thank you! Your project details have been recorded and your email client has been opened. We will review your request and get back to you shortly.
                  </p>

                  <div className="bg-secondary/5 rounded-2xl p-6 mb-10 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">Status</span>
                    </div>
                    <p className="text-sm font-bold text-secondary">Awaiting Team Review</p>
                  </div>

                  <button 
                    onClick={handleClose}
                    className="w-full bg-secondary text-white font-black py-4 rounded-2xl shadow-xl shadow-secondary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
