# 🍡 Tanghulu Recipe - Next.js Headless WordPress

A beautiful, fast frontend for your Tanghulu Recipe WordPress site built with Next.js and deployed on Cloudflare Pages.

## ✨ Features

- **Lightning Fast** - Static generation with ISR (60-second revalidate)
- **Beautiful Design** - Warm, appetizing colors perfect for food content
- **Fully Responsive** - Looks great on all devices
- **SEO Optimized** - Meta tags, Open Graph, structured data
- **Recipe Focused** - Designed specifically for recipe content
- **Cloudflare Pages Ready** - Configured for easy deployment

## 🚀 Quick Start

### Prerequisites

1. WordPress site with **WPGraphQL** plugin installed
2. Node.js 18+ installed
3. Git for deployment

### Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```
WORDPRESS_API_URL=https://cms.tanghulurecipe.com/graphql
NEXT_PUBLIC_SITE_URL=https://tanghulurecipe.com
```

### WordPress Setup

1. Install **WPGraphQL** plugin
2. Endpoint: `https://cms.tanghulurecipe.com/graphql`

## 🌐 Deploy to Cloudflare Pages

1. Push to GitHub
2. Go to Cloudflare Pages → Create Project
3. Connect your repo
4. Build settings:
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Output: `.vercel/output/static`
5. Add environment variable: `WORDPRESS_API_URL`
6. Deploy!

## 📁 Project Structure

```
tanghulu-nextjs/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── Layout.js
│   └── PostCard.js
├── lib/
│   ├── wordpress.js    # GraphQL queries
│   └── utils.js        # Helpers
├── pages/
│   ├── index.js        # Homepage
│   ├── [slug].js       # Posts & Pages
│   ├── blog.js         # Blog listing
│   └── category/[slug].js
├── styles/
│   └── globals.css
└── .env.local
```

## 🎨 Design

- **Colors**: Warm reds, golden caramel, cream backgrounds
- **Fonts**: Playfair Display (headings), Nunito (body), Caveat (accents)
- **Style**: Clean, appetizing, food-focused

---

Made with ❤️ for Tanghulu lovers
