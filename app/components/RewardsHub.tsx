import { useState, useEffect, memo } from 'react';
import { useStemRewards } from '../hooks/useStemRewards';
import { 
  FireIcon, 
  TrophyIcon, 
  ClockIcon, 
  SparklesIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

// Dynamically import the tutorial to reduce initial bundle size
const GACATutorial = dynamic(() => import('./GACATutorial'), {
  loading: () => null,
  ssr: false
});

// Memoize the tooltip component to prevent unnecessary re-renders
const TOOLTIPS = {
  dailyStreak: "Log in daily to earn increasing GACA rewards. Your streak multiplies your rewards!",
  streamRewards: "Watch streams to earn GACA tokens. Every 30 minutes of watching earns you rewards.",
  creatorRewards: "Create and share content to earn GACA. Get tips and revenue share from your content.",
  engagement: "Interact with content to earn GACA. Comment, like, and share to earn rewards.",
  community: "Use GACA to unlock exclusive content and support your favorite creators."
};

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip = memo(({ content, children }: TooltipProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative group">
      <div 
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="w-full"
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-50 w-64 p-2 mt-2 text-sm text-gray-300 bg-black border border-[#1F6B3B]/20 rounded-lg shadow-xl transform-gpu">
          {content}
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

// Memoize the info card to prevent unnecessary re-renders
interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  tooltipContent: string;
}

const InfoCard = memo(({ icon: Icon, title, description, tooltipContent }: InfoCardProps) => (
  <Tooltip content={tooltipContent}>
    <div className="bg-black/30 border border-[#1F6B3B]/20 rounded-xl p-6 h-full transition-transform hover:scale-[1.02] transform-gpu">
      <Icon className="h-8 w-8 text-[#1F6B3B] mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </Tooltip>
));

InfoCard.displayName = 'InfoCard';

export default function RewardsHub() {
  const {
    canClaimDaily,
    canClaimStream,
    currentStreak,
    longestStreak,
    streamMinutes,
    claimDaily,
    claimStream,
  } = useStemRewards();

  const [isLoading, setIsLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenGACATutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
      localStorage.setItem('hasSeenGACATutorial', 'true');
    }
  }, []);

  const handleClaimDaily = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await claimDaily();
    } catch (error) {
      console.error('Failed to claim daily reward:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimStream = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await claimStream();
    } catch (error) {
      console.error('Failed to claim stream reward:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showTutorial && <GACATutorial onClose={() => setShowTutorial(false)} />}
      
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Welcome Section */}
        <div className="text-center mb-6 md:mb-8 relative">
          <button
            onClick={() => setShowTutorial(true)}
            className="absolute right-0 top-0 text-gray-400 hover:text-white transition-colors transform-gpu hover:scale-110"
            title="Open Tutorial"
          >
            <QuestionMarkCircleIcon className="h-6 w-6" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Welcome to Stem Rewards</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Earn GACA tokens for being an active member of our community. Watch streams,
            create content, and engage with others to earn rewards!
          </p>
        </div>

        {/* Daily Rewards Card */}
        <Tooltip content={TOOLTIPS.dailyStreak}>
          <div className="bg-black/50 border border-[#1F6B3B]/20 rounded-xl p-4 md:p-6 backdrop-blur-sm transition-transform hover:scale-[1.01] transform-gpu">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <div className="flex items-center space-x-3">
                <FireIcon className="h-6 w-6 text-[#1F6B3B]" />
                <h2 className="text-lg md:text-xl font-semibold">Daily Login Streak</h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Current Streak:</span>
                <span className="text-lg font-bold text-[#1F6B3B]">{currentStreak} days</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Longest Streak: {longestStreak} days</p>
                <p className="text-sm">
                  {canClaimDaily ? 'Ready to claim!' : 'Come back tomorrow for more rewards!'}
                </p>
              </div>
              <button
                onClick={handleClaimDaily}
                disabled={!canClaimDaily || isLoading}
                className={`px-6 py-2 rounded-lg font-semibold transition-all transform-gpu hover:scale-105 w-full md:w-auto
                  ${canClaimDaily 
                    ? 'bg-[#1F6B3B] hover:bg-[#1F6B3B]/80 text-white' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              >
                {isLoading ? 'Claiming...' : 'Claim Daily Reward'}
              </button>
            </div>
          </div>
        </Tooltip>

        {/* Stream Rewards Card */}
        <Tooltip content={TOOLTIPS.streamRewards}>
          <div className="bg-black/50 border border-[#1F6B3B]/20 rounded-xl p-4 md:p-6 backdrop-blur-sm transition-transform hover:scale-[1.01] transform-gpu">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <div className="flex items-center space-x-3">
                <SparklesIcon className="h-6 w-6 text-[#1F6B3B]" />
                <h2 className="text-lg md:text-xl font-semibold">Stream Rewards</h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Minutes Watched:</span>
                <span className="text-lg font-bold text-[#1F6B3B]">{streamMinutes} min</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Watch streams to earn GACA tokens</p>
                <p className="text-sm">
                  {canClaimStream ? 'Rewards available!' : 'Keep watching to earn rewards'}
                </p>
              </div>
              <button
                onClick={handleClaimStream}
                disabled={!canClaimStream || isLoading}
                className={`px-6 py-2 rounded-lg font-semibold transition-all transform-gpu hover:scale-105 w-full md:w-auto
                  ${canClaimStream 
                    ? 'bg-[#1F6B3B] hover:bg-[#1F6B3B]/80 text-white' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              >
                {isLoading ? 'Claiming...' : 'Claim Stream Reward'}
              </button>
            </div>
          </div>
        </Tooltip>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <InfoCard
            icon={TrophyIcon}
            title="Creator Rewards"
            description="Upload videos and earn GACA tokens from tips, NFT sales, and engagement."
            tooltipContent={TOOLTIPS.creatorRewards}
          />
          
          <InfoCard
            icon={ClockIcon}
            title="Engagement Rewards"
            description="Comment, like, and share content to earn GACA tokens and unlock exclusive perks."
            tooltipContent={TOOLTIPS.engagement}
          />

          <InfoCard
            icon={SparklesIcon}
            title="Community Benefits"
            description="Use GACA tokens to support creators, unlock exclusive content, and join special events."
            tooltipContent={TOOLTIPS.community}
          />
        </div>
      </div>
    </>
  );
} 