# MetaChecker

A free, open-source website metadata and SEO analysis tool built with Next.js. Analyze any URL to inspect metadata, preview social media cards, and generate AI-powered SEO suggestions.

## Features

### Metadata Inspector

Paste any URL and get a complete breakdown of its metadata:

- **Basic SEO** — Title, description, keywords, author, theme color
- **Open Graph** — All `og:` properties including image dimensions, video, and audio
- **Twitter Cards** — Card type, title, description, image, site, and creator
- **Facebook** — App ID, pages, domain verification
- **Discord & Slack** — Platform-specific link previews
- **Technical SEO** — Canonical URL, robots directives, viewport, charset, language, manifest, favicons
- **Article Metadata** — Published/modified time, author, section, tags
- **Sitemap & Robots** — Detection of sitemap.xml and robots.txt with content display

### Social Media Preview

See exactly how your page appears when shared on:

- Facebook / Open Graph
- X (Twitter)
- Discord
- Slack

### AI SEO Generator

Powered by Google Gemini, generate optimized metadata for any page:

- **From URL** — Analyze existing metadata and generate improved versions
- **From Prompt** — Describe your page and get complete metadata generated from scratch
- AI suggests better titles, descriptions, Open Graph tags, and Twitter Cards
- Results displayed in the same dashboard format for easy comparison

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4, Radix UI, CVA
- **State** — TanStack React Query
- **AI** — Google Gemini (gemini-2.5-flash)
- **HTML Parsing** — Cheerio
- **Animations** — Motion (Framer Motion)
- **Architecture** — [Feature-Sliced Design](https://feature-sliced.design/)

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your Gemini API key to .env.local

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key for AI SEO generation |

## Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full Feature-Sliced Design breakdown.
