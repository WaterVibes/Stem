'use client';

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      {/* Content */}
      <div className="pt-4">
        {children}
      </div>
    </div>
  );
} 