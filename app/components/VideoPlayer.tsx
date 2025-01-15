'use client';

import { useState } from 'react';
import { useAuth } from '../context/auth-context';
import TipModal from './TipModal';
import MintNFTModal from './MintNFTModal';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  duration: number;
  creatorAddress: string;
  creatorName: string;
}

export default function VideoPlayer({
  videoId,
  title,
  description,
  duration,
  creatorAddress,
  creatorName,
}: VideoPlayerProps) {
  const { user } = useAuth();
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);

  return (
    <div className="relative">
      <video
        src={`/api/videos/${videoId}`}
        className="w-full aspect-video rounded-lg"
        controls
      />
      
      <div className="absolute bottom-4 right-4 flex gap-2">
        {user && creatorAddress && (
          <>
            <button
              onClick={() => setIsTipModalOpen(true)}
              className="px-4 py-2 bg-[#1F6B3B] text-white rounded-lg font-semibold hover:bg-[#1F6B3B]/80"
            >
              Tip Creator
            </button>
            <button
              onClick={() => setIsMintModalOpen(true)}
              className="px-4 py-2 bg-[#1F6B3B] text-white rounded-lg font-semibold hover:bg-[#1F6B3B]/80 flex items-center gap-1"
            >
              <SparklesIcon className="h-5 w-5" />
              Mint as NFT
            </button>
          </>
        )}
      </div>

      <TipModal
        isOpen={isTipModalOpen}
        onClose={() => setIsTipModalOpen(false)}
        recipientAddress={creatorAddress}
        recipientName={creatorName}
      />

      <MintNFTModal
        isOpen={isMintModalOpen}
        onClose={() => setIsMintModalOpen(false)}
        videoId={videoId}
        videoTitle={title}
        videoDescription={description}
        videoDuration={duration}
      />
    </div>
  );
} 