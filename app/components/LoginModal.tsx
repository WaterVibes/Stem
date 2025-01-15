"use client";

import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [showCredentials, setShowCredentials] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, any email/password combination works
    if (email && password) {
      onLogin();
      onClose();
    }
  };

  const handleSocialLogin = () => {
    onLogin();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1D1D1D] rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Log in to Stem</h2>

        <div className="space-y-4">
          {showCredentials ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => setShowCredentials(false)}
                className="w-full px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20"
              >
                Back to login options
              </button>
            </form>
          ) : (
            <>
              <button
                onClick={() => setShowCredentials(true)}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Use email / username
              </button>

              <button
                onClick={handleSocialLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
                Continue with Twitter
              </button>

              <button
                onClick={handleSocialLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continue with Facebook
              </button>
            </>
          )}
        </div>

        <p className="text-sm text-white/40 text-center mt-6">
          By continuing, you agree to Stem&apos;s Terms of Service and acknowledge Stem&apos;s Privacy Policy
        </p>
      </div>
    </div>
  );
} 