import { useState, createElement, memo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  WalletIcon, 
  GiftIcon, 
  HandThumbUpIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
  action?: string;
}

const FAQ_ITEMS = [
  {
    question: "What is GACA?",
    answer: "GACA is Stem's community token that rewards you for participating. You can earn it through various activities and use it for exclusive content, tipping creators, and special perks."
  },
  {
    question: "How do I earn GACA?",
    answer: "You can earn GACA by watching streams, creating content, engaging with posts, and maintaining daily login streaks. The more you participate, the more you earn!"
  },
  {
    question: "What can I do with GACA?",
    answer: "Use GACA to tip your favorite creators, unlock exclusive content, participate in special events, and get community perks. Every GACA transaction supports the Stem ecosystem."
  },
  {
    question: "Is GACA safe?",
    answer: "Yes! GACA is built on secure blockchain technology. Your tokens are safely stored in your wallet, and all transactions are transparent and verifiable."
  }
];

const TUTORIAL_STEPS: Step[] = [
  {
    title: "Welcome to GACA!",
    description: "GACA is your key to unlocking all the benefits of Stem. Think of it like reward points, but better - you can use them across the platform and they have real value!",
    icon: GiftIcon
  },
  {
    title: "Connect Your Wallet",
    description: "Your wallet is like a digital account that holds your GACA tokens. Don't worry - we'll help you set one up if you don't have one!",
    icon: WalletIcon,
    action: "Connect Wallet"
  },
  {
    title: "Start Earning",
    description: "Earn GACA by watching streams, creating content, and engaging with the community. The more you participate, the more you earn!",
    icon: HandThumbUpIcon
  },
  {
    title: "Use Your GACA",
    description: "Use GACA to tip creators, unlock exclusive content, and get special perks. Every interaction helps support the Stem community!",
    icon: CurrencyDollarIcon
  }
];

interface Props {
  onClose?: () => void;
}

// Memoize FAQ item to prevent unnecessary re-renders
const FAQItem = memo(({ question, answer }: { question: string; answer: string }) => (
  <div className="border-b border-[#1F6B3B]/20 last:border-0 pb-4 last:pb-0">
    <h3 className="font-semibold mb-2">{question}</h3>
    <p className="text-sm text-gray-400">{answer}</p>
  </div>
));

FAQItem.displayName = 'FAQItem';

// Memoize tutorial step to prevent unnecessary re-renders
const TutorialStep = memo(({ step, onAction }: { step: Step; onAction?: () => void }) => (
  <div className="mb-6">
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-3 bg-[#1F6B3B]/10 rounded-lg">
        {createElement(step.icon, {
          className: "h-6 w-6 text-[#1F6B3B]"
        })}
      </div>
      <h3 className="text-xl font-semibold">
        {step.title}
      </h3>
    </div>
    <p className="text-gray-400 mb-4">
      {step.description}
    </p>
    {step.action && (
      <button
        onClick={onAction}
        className="w-full py-2 px-4 bg-[#1F6B3B] hover:bg-[#1F6B3B]/80 rounded-lg font-semibold text-white transition-all transform-gpu hover:scale-105"
      >
        {step.action}
      </button>
    )}
  </div>
));

TutorialStep.displayName = 'TutorialStep';

export default function GACATutorial({ onClose }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFAQ, setShowFAQ] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    onClose?.();
  };
  
  const nextStep = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeModal();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black border border-[#1F6B3B]/20 p-4 md:p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <Dialog.Title className="text-lg font-semibold">
                    {showFAQ ? "Frequently Asked Questions" : "Getting Started with GACA"}
                  </Dialog.Title>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowFAQ(!showFAQ)}
                      className="text-gray-400 hover:text-white transition-colors transform-gpu hover:scale-110"
                      title={showFAQ ? "Back to tutorial" : "View FAQ"}
                    >
                      {showFAQ ? (
                        <InformationCircleIcon className="h-5 w-5" />
                      ) : (
                        <QuestionMarkCircleIcon className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-white transition-colors transform-gpu hover:scale-110"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {showFAQ ? (
                  <div className="space-y-4">
                    {FAQ_ITEMS.map((item, index) => (
                      <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-gray-800 rounded-full mb-6">
                      <div 
                        className="h-full bg-[#1F6B3B] rounded-full transition-all duration-300 transform-gpu"
                        style={{ width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
                      />
                    </div>

                    {/* Step Content */}
                    <TutorialStep 
                      step={TUTORIAL_STEPS[currentStep]} 
                      onAction={TUTORIAL_STEPS[currentStep].action ? closeModal : undefined}
                    />

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`px-4 py-2 rounded-lg font-medium transition-all transform-gpu hover:scale-105
                          ${currentStep === 0 
                            ? 'text-gray-600 cursor-not-allowed' 
                            : 'text-gray-400 hover:text-white'}`}
                      >
                        Back
                      </button>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>Step {currentStep + 1}</span>
                        <span>/</span>
                        <span>{TUTORIAL_STEPS.length}</span>
                      </div>
                      <button
                        onClick={nextStep}
                        className="px-4 py-2 rounded-lg font-medium text-[#1F6B3B] hover:text-[#1F6B3B]/80 transition-all transform-gpu hover:scale-105"
                      >
                        {currentStep === TUTORIAL_STEPS.length - 1 ? 'Finish' : 'Next'}
                      </button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 