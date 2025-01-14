# GrassApp - Modern Video Sharing Platform

A Next.js 14 application for sharing and discovering videos, featuring a cyberpunk-inspired design and modern user experience.

## Features

### Core Functionality
- 🎥 Video upload and sharing
- 👥 User authentication and profiles
- ❤️ Interactive video engagement (likes, comments, shares)
- 🔍 Smart video recommendations
- 🏷️ Tag-based categorization

### Modern UI/UX
- 🎨 Cyberpunk-inspired design with neon accents
- 🌗 Dark theme with glassmorphism effects
- 📱 Fully responsive layouts
- ✨ Smooth animations and transitions
- 🎯 Intuitive navigation

### Technical Features
- ⚡ Next.js 14 with App Router
- 💎 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🔐 Secure authentication
- 🗄️ Type-safe API layer
- 📦 Zustand for state management
- 🚀 Optimistic updates
- ♾️ Infinite scroll
- 🔄 Real-time interactions

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/grassapp.git
cd grassapp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js 14 app directory
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── store/           # Zustand state management
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── services/        # API and business logic
```

## Key Components

### Video Feed
- Responsive grid layout
- Smart video recommendations
- Infinite scroll loading
- Filter and sort options

### Video Player
- Autoplay on scroll
- Mute/unmute controls
- Like and share functionality
- Comment system

### User Profile
- Video management
- Profile customization
- Activity tracking
- Social interactions

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Testing
- Unit tests with Jest
- Integration tests with Testing Library
- E2E tests with Cypress

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- All contributors and users of the platform
