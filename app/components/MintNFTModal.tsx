'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useStemNFT } from '../hooks/useStemNFT';
import { useNetwork } from 'wagmi';

interface MintNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  videoTitle: string;
  videoDuration: number;
  videoDescription: string;
}

interface Collaborator {
  address: string;
  share: number;
}

export default function MintNFTModal({
  isOpen,
  onClose,
  videoId,
  videoTitle,
  videoDuration,
  videoDescription,
}: MintNFTModalProps) {
  const [isExclusive, setIsExclusive] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { address: '', share: 100 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { mint, isSupported } = useStemNFT();
  const { chain } = useNetwork();

  const addCollaborator = () => {
    if (collaborators.length < 5) {
      setCollaborators([...collaborators, { address: '', share: 0 }]);
    }
  };

  const removeCollaborator = (index: number) => {
    if (collaborators.length > 1) {
      const newCollaborators = collaborators.filter((_, i) => i !== index);
      setCollaborators(newCollaborators);
    }
  };

  const updateCollaborator = (index: number, field: keyof Collaborator, value: string) => {
    const newCollaborators = [...collaborators];
    if (field === 'share') {
      newCollaborators[index].share = parseInt(value) || 0;
    } else {
      newCollaborators[index].address = value;
    }
    setCollaborators(newCollaborators);
  };

  const handleMint = async () => {
    if (!isSupported) {
      alert('NFT minting is not supported on this network');
      return;
    }

    const totalShares = collaborators.reduce((sum, c) => sum + c.share, 0);
    if (totalShares !== 100) {
      alert('Total shares must equal 100%');
      return;
    }

    if (collaborators.some(c => !c.address)) {
      alert('All collaborator addresses must be filled');
      return;
    }

    setIsLoading(true);
    try {
      const uri = `ipfs://${videoId}`; // Replace with actual IPFS URI
      await mint(
        uri,
        videoTitle,
        videoDescription,
        videoDuration,
        isExclusive,
        collaborators.map(c => c.address),
        collaborators.map(c => c.share * 100) // Convert percentages to basis points
      );
      onClose();
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Failed to mint NFT. Please try again.');
    } finally {
      setIsLoading(false);
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
          <div className="fixed inset-0 bg-black bg-opacity-80" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black border border-[#1F6B3B]/20 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium text-white">
                    Mint Video as NFT
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-300">
                      Exclusive Content
                    </label>
                    <button
                      onClick={() => setIsExclusive(!isExclusive)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isExclusive ? 'bg-[#1F6B3B]' : 'bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isExclusive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Revenue Sharing
                      </label>
                      {collaborators.map((collaborator, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={collaborator.address}
                            onChange={(e) =>
                              updateCollaborator(index, 'address', e.target.value)
                            }
                            placeholder="Wallet address"
                            className="flex-1 rounded-md bg-black border border-[#1F6B3B]/20 text-white px-3 py-2 text-sm focus:border-[#1F6B3B] focus:ring focus:ring-[#1F6B3B]/50"
                          />
                          <input
                            type="number"
                            value={collaborator.share}
                            onChange={(e) =>
                              updateCollaborator(index, 'share', e.target.value)
                            }
                            min="0"
                            max="100"
                            placeholder="%"
                            className="w-20 rounded-md bg-black border border-[#1F6B3B]/20 text-white px-3 py-2 text-sm focus:border-[#1F6B3B] focus:ring focus:ring-[#1F6B3B]/50"
                          />
                          {index > 0 && (
                            <button
                              onClick={() => removeCollaborator(index)}
                              className="p-2 text-gray-400 hover:text-white"
                            >
                              <MinusIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      {collaborators.length < 5 && (
                        <button
                          onClick={addCollaborator}
                          className="flex items-center gap-1 text-sm text-[#1F6B3B] hover:text-[#1F6B3B]/80"
                        >
                          <PlusIcon className="h-4 w-4" />
                          Add Collaborator
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleMint}
                    disabled={isLoading || !isSupported}
                    className="w-full rounded-md bg-[#1F6B3B] px-4 py-2 text-white font-medium hover:bg-[#1F6B3B]/80 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Minting...' : 'Mint NFT'}
                  </button>
                  {!isSupported && (
                    <p className="mt-2 text-sm text-gray-400">
                      NFT minting is not supported on {chain?.name || 'this network'}
                    </p>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 