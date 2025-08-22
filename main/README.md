
# Minimal Personal Site

This is a minimal [Next.js](https://nextjs.org) personal site. Articles are grouped by series and written in Markdown with LaTeX support (via KaTeX). Clean, minimal code and easy extensibility for content organization and math rendering.

## Features
- Articles organized by series (see `content/` folder)
- Write in Markdown with LaTeX math (block and inline)
- Math rendered with KaTeX
- Minimal, extensible codebase

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your site.

## Writing Articles

- Add new series as folders in `content/`
- Add articles as `.md` files with frontmatter (`title`, `date`, `series`)
- Use Markdown and LaTeX math (e.g., `$E=mc^2$` or `$$E=mc^2$$`)

## Deployment

Push to GitHub and connect your repo to [Vercel](https://vercel.com/) for instant deployment.
