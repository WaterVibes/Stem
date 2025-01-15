'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('/images/default-avatar.svg');

  const handleSave = () => {
    // TODO: Implement save functionality
    onClose();
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all border border-[#2f2f2f]">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-lg font-medium text-white">
                    Edit profile
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 hover:bg-white/10 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Profile Photo */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={photo}
                        alt="Profile"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <button className="px-4 py-2 text-sm text-[#1F6B3B] border border-[#1F6B3B]/50 rounded-md hover:bg-[#1F6B3B]/10">
                      Change photo
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:border-[#1F6B3B]/50"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:border-[#1F6B3B]/50"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:border-[#1F6B3B]/50 resize-none"
                      placeholder="Bio"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6">
                  <button
                    onClick={handleSave}
                    className="w-full py-2 bg-[#1F6B3B] text-white rounded-md font-medium hover:bg-[#1F6B3B]/80 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 