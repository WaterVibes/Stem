"use client";

import { useState } from 'react';

interface Effect {
  id: string;
  name: string;
  icon: string;
  type: 'filter' | 'effect' | 'transition';
}

const videoEffects: Effect[] = [
  { id: 'flash', name: 'Flash', icon: '⚡', type: 'effect' },
  { id: 'pulse', name: 'Pulse', icon: '💫', type: 'effect' },
  { id: 'shake', name: 'Shake', icon: '🌀', type: 'effect' },
];

const filters: Effect[] = [
  { id: 'vintage', name: 'Vintage', icon: '🎞️', type: 'filter' },
  { id: 'b&w', name: 'B&W', icon: '◾', type: 'filter' },
  { id: 'vivid', name: 'Vivid', icon: '🎨', type: 'filter' },
];

const transitions: Effect[] = [
  { id: 'fade', name: 'Fade', icon: '🌅', type: 'transition' },
  { id: 'slide', name: 'Slide', icon: '➡️', type: 'transition' },
  { id: 'zoom', name: 'Zoom', icon: '🔍', type: 'transition' },
];

export default function EffectsPanel() {
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedTransition, setSelectedTransition] = useState<string | null>(null);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        {/* Effects Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-white/60 mb-3">Effects</h3>
          <div className="grid grid-cols-3 gap-2">
            {videoEffects.map((effect) => (
              <button
                key={effect.id}
                onClick={() => setSelectedEffect(effect.id === selectedEffect ? null : effect.id)}
                className={`p-3 rounded-lg flex flex-col items-center gap-2 hover:bg-white/5 ${
                  selectedEffect === effect.id ? 'bg-white/10' : ''
                }`}
              >
                <span className="text-2xl">{effect.icon}</span>
                <span className="text-sm">{effect.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-white/60 mb-3">Filters</h3>
          <div className="grid grid-cols-3 gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id === selectedFilter ? null : filter.id)}
                className={`p-3 rounded-lg flex flex-col items-center gap-2 hover:bg-white/5 ${
                  selectedFilter === filter.id ? 'bg-white/10' : ''
                }`}
              >
                <span className="text-2xl">{filter.icon}</span>
                <span className="text-sm">{filter.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Transitions Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-white/60 mb-3">Transitions</h3>
          <div className="grid grid-cols-3 gap-2">
            {transitions.map((transition) => (
              <button
                key={transition.id}
                onClick={() => setSelectedTransition(transition.id === selectedTransition ? null : transition.id)}
                className={`p-3 rounded-lg flex flex-col items-center gap-2 hover:bg-white/5 ${
                  selectedTransition === transition.id ? 'bg-white/10' : ''
                }`}
              >
                <span className="text-2xl">{transition.icon}</span>
                <span className="text-sm">{transition.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/60 block mb-2">Brightness</label>
            <input
              type="range"
              min="0"
              max="200"
              defaultValue="100"
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 block mb-2">Contrast</label>
            <input
              type="range"
              min="0"
              max="200"
              defaultValue="100"
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 block mb-2">Saturation</label>
            <input
              type="range"
              min="0"
              max="200"
              defaultValue="100"
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 