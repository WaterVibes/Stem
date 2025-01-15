"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/auth-context';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [showCredentials, setShowCredentials] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setError('');
      await login(email, password);
      onLogin();
      onClose();
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login failed:', error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-black border border-[#00ff9d]/20 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-2xl font-bold gradient-text">
                    Welcome to Stem
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-[#00ff9d]/60 hover:text-[#00ff9d]"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {showCredentials ? (
                    <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                      {error && (
                        <div className="bg-red-500/10 text-red-500 p-3 border border-red-500/20">
                          {error}
                        </div>
                      )}
                      <div>
                        <input
                          type="email"
                          placeholder="Email or username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-black border border-[#00ff9d]/20 focus:outline-none focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] transition-all hover-scale text-[#00ff9d]"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-black border border-[#00ff9d]/20 focus:outline-none focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] transition-all hover-scale text-[#00ff9d]"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-4 py-3 bg-[#00ff9d] text-black font-medium hover:bg-[#00ff9d]/90 transition-colors"
                      >
                        Log in
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCredentials(false)}
                        className="w-full px-4 py-3 bg-black border border-[#00ff9d]/20 hover:border-[#00ff9d] transition-colors text-[#00ff9d]"
                      >
                        Back to login options
                      </button>
                    </form>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowCredentials(true)}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black border border-[#00ff9d]/20 hover:border-[#00ff9d] transition-colors text-[#00ff9d]"
                      >
                        <UserIcon className="w-5 h-5" />
                        Use email / username
                      </button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-[#00ff9d]/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-black text-[#00ff9d]/60">Or continue with</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          // Mock social login
                          login('demo@example.com', 'password').then(() => {
                            onLogin();
                            onClose();
                          });
                        }}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#00ff9d] text-black font-medium hover:bg-[#00ff9d]/90 transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                        </svg>
                        Continue with Google
                      </button>
                    </>
                  )}
                </div>

                <p className="mt-4 text-sm text-[#00ff9d]/60">
                  By continuing, you agree to Stem's Terms of Service and acknowledge that you've read our Privacy Policy
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 