'use client';

import { CheckCircle, X } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface HubSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignupComplete?: () => void;
  portalId?: string;
  formId?: string;
}

// Add HubSpot types to window object
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          region?: string;
          target: string;
          onFormSubmitted?: () => void;
        }) => void;
      };
    };
  }
}

const HubSpotModal: React.FC<HubSpotModalProps> = ({
  isOpen,
  onClose,
  onSignupComplete,
  portalId = '46224345',
  formId = '8f9b35de-f230-430c-ab8e-062afd49fed3'
}) => {
  const [isHubSpotLoaded, setIsHubSpotLoaded] = useState(false);
  const [isFormCreated, setIsFormCreated] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Load HubSpot script when modal opens
  useEffect(() => {
    if (typeof window !== 'undefined' && isOpen) {
      // Load HubSpot Forms script if not already loaded
      if (!window.hbspt) {
        const script = document.createElement('script');
        script.src = '//js.hsforms.net/forms/embed/v2.js';
        script.charset = 'utf-8';
        script.type = 'text/javascript';
        script.onload = () => setIsHubSpotLoaded(true);
        document.head.appendChild(script);
      } else {
        setIsHubSpotLoaded(true);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (
      isOpen &&
      !isSuccess &&
      !isFormCreated &&
      formRef.current &&
      isHubSpotLoaded &&
      window.hbspt
    ) {
      // Clear any existing form by emptying the container
      formRef.current.innerHTML = '';

      // Create HubSpot form
      window.hbspt.forms.create({
        portalId: portalId,
        formId: formId,
        region: 'na1',
        target: '#hubspot-modal-form',
        onFormSubmitted: () => {
          setIsSuccess(true);
          // Store signup in localStorage
          localStorage.setItem('supernal_popup_signup_completed', 'true');
          // Auto-close after showing success state
          setTimeout(() => {
            onSignupComplete?.();
            onClose();
          }, 2000);
        }
      });

      setIsFormCreated(true);
    }
  }, [
    isOpen,
    isSuccess,
    isFormCreated,
    isHubSpotLoaded,
    portalId,
    formId,
    onSignupComplete,
    onClose
  ]);

  // Reset form state when form closes
  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setIsFormCreated(false);
    }
  }, [isOpen]);

  // Handle click outside to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-end p-4">
          <button
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pb-8">
          {!isSuccess ? (
            <>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Join Supernal Coding
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get notified about new features, enterprise offerings, and
                  development updates.
                </p>
              </div>

              <div id="hubspot-modal-form" ref={formRef} className="space-y-4">
                {!isHubSpotLoaded && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Loading form...
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  By signing up, you agree to our{' '}
                  <a
                    href="/docs/terms"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Terms
                  </a>{' '}
                  and{' '}
                  <a
                    href="/docs/privacy"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to Supernal Coding!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You're now connected to the future of development
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HubSpotModal;
