"use client";

import { useState } from 'react';

interface QualityPreset {
  name: string;
  resolution: string;
  fps: number;
  bitrate: number;
  keyframeInterval: number;
  audioQuality: number;
}

interface StreamQualityProps {
  onClose: () => void;
  onApply: (settings: QualityPreset) => void;
}

const QUALITY_PRESETS: QualityPreset[] = [
  {
    name: 'Ultra (4K)',
    resolution: '3840x2160',
    fps: 60,
    bitrate: 40000,
    keyframeInterval: 2,
    audioQuality: 320
  },
  {
    name: 'High (1440p)',
    resolution: '2560x1440',
    fps: 60,
    bitrate: 20000,
    keyframeInterval: 2,
    audioQuality: 256
  },
  {
    name: 'Standard (1080p)',
    resolution: '1920x1080',
    fps: 60,
    bitrate: 6000,
    keyframeInterval: 2,
    audioQuality: 192
  },
  {
    name: 'Low (720p)',
    resolution: '1280x720',
    fps: 30,
    bitrate: 3000,
    keyframeInterval: 2,
    audioQuality: 128
  },
  {
    name: 'Mobile',
    resolution: '854x480',
    fps: 30,
    bitrate: 1500,
    keyframeInterval: 2,
    audioQuality: 96
  }
];

export default function StreamQuality({ onClose, onApply }: StreamQualityProps) {
  const [selectedPreset, setSelectedPreset] = useState<QualityPreset>(QUALITY_PRESETS[2]); // Standard by default
  const [customSettings, setCustomSettings] = useState<QualityPreset>({
    resolution: QUALITY_PRESETS[2].resolution,
    fps: QUALITY_PRESETS[2].fps,
    bitrate: QUALITY_PRESETS[2].bitrate,
    keyframeInterval: QUALITY_PRESETS[2].keyframeInterval,
    audioQuality: QUALITY_PRESETS[2].audioQuality,
    name: 'Custom'
  });
  const [isCustom, setIsCustom] = useState(false);

  const [recordingSettings, setRecordingSettings] = useState({
    enabled: false,
    format: 'mp4',
    separateAudio: false,
    localBackup: true
  });

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black/80 border border-white/10 rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Stream Quality</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Quality Presets */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quality Presets</h3>
            <div className="grid grid-cols-2 gap-4">
              {QUALITY_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setSelectedPreset(preset);
                    setIsCustom(false);
                  }}
                  className={`p-4 rounded-lg border ${
                    selectedPreset.name === preset.name && !isCustom
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-sm text-white/60 mt-1">
                    {preset.resolution} @ {preset.fps}fps
                  </div>
                  <div className="text-sm text-white/60">
                    {preset.bitrate / 1000}Mbps | {preset.audioQuality}kbps audio
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Settings */}
          <div>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={isCustom}
                onChange={(e) => setIsCustom(e.target.checked)}
                className="rounded border-white/10 bg-white/5 text-green-500 focus:ring-green-500"
              />
              <span>Use Custom Settings</span>
            </label>

            {isCustom && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Resolution</label>
                  <select
                    value={customSettings.resolution}
                    onChange={(e) => setCustomSettings({ ...customSettings, resolution: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="3840x2160">4K (3840x2160)</option>
                    <option value="2560x1440">1440p (2560x1440)</option>
                    <option value="1920x1080">1080p (1920x1080)</option>
                    <option value="1280x720">720p (1280x720)</option>
                    <option value="854x480">480p (854x480)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">FPS</label>
                  <select
                    value={customSettings.fps}
                    onChange={(e) => setCustomSettings({ ...customSettings, fps: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="30">30 FPS</option>
                    <option value="60">60 FPS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Bitrate (kbps)</label>
                  <input
                    type="range"
                    min={1000}
                    max={40000}
                    step={500}
                    value={customSettings.bitrate}
                    onChange={(e) => setCustomSettings({ ...customSettings, bitrate: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-white/60 mt-1">
                    <span>1 Mbps</span>
                    <span>{customSettings.bitrate / 1000} Mbps</span>
                    <span>40 Mbps</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Audio Quality (kbps)</label>
                  <select
                    value={customSettings.audioQuality}
                    onChange={(e) => setCustomSettings({ ...customSettings, audioQuality: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="96">96 kbps</option>
                    <option value="128">128 kbps</option>
                    <option value="192">192 kbps</option>
                    <option value="256">256 kbps</option>
                    <option value="320">320 kbps</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Recording Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Recording Settings</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={recordingSettings.enabled}
                  onChange={(e) => setRecordingSettings({ ...recordingSettings, enabled: e.target.checked })}
                  className="rounded border-white/10 bg-white/5 text-green-500 focus:ring-green-500"
                />
                <span>Enable Local Recording</span>
              </label>

              {recordingSettings.enabled && (
                <div className="grid grid-cols-2 gap-4 pl-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Format</label>
                    <select
                      value={recordingSettings.format}
                      onChange={(e) => setRecordingSettings({ ...recordingSettings, format: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      <option value="mp4">MP4</option>
                      <option value="mkv">MKV</option>
                      <option value="mov">MOV</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={recordingSettings.separateAudio}
                        onChange={(e) => setRecordingSettings({ ...recordingSettings, separateAudio: e.target.checked })}
                        className="rounded border-white/10 bg-white/5 text-green-500 focus:ring-green-500"
                      />
                      <span>Separate Audio Track</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={recordingSettings.localBackup}
                        onChange={(e) => setRecordingSettings({ ...recordingSettings, localBackup: e.target.checked })}
                        className="rounded border-white/10 bg-white/5 text-green-500 focus:ring-green-500"
                      />
                      <span>Create Local Backup</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-white/10 rounded-lg hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={() => onApply(isCustom ? customSettings : selectedPreset)}
              className="px-6 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400"
            >
              Apply Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 