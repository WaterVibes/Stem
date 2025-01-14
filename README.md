# Stem - Medical Cannabis Community App

A TikTok-style platform for the medical cannabis community, built with Next.js and TypeScript.

## Features

- Short-form video sharing focused on medical cannabis
- TikTok-style vertical scrolling interface
- User profiles and authentication
- Video upload capabilities
- Like and comment functionality
- Modern, responsive design

## Tech Stack

- **Frontend Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Authentication:** (Coming soon)
- **Video Processing:** (Coming soon)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/stem.git
cd stem
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the required environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:5000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/             # Next.js app router pages
├── components/      # Reusable UI components
├── services/        # API and external services
├── hooks/           # Custom React hooks
├── store/           # Global state management
├── utils/           # Helper functions
├── types/           # TypeScript types
└── env.ts           # Environment configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built as part of the GrassApp medical cannabis delivery platform
- Inspired by TikTok's engaging user interface
- Thanks to all contributors and the medical cannabis community
