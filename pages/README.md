# Tool Pages Directory Structure

This directory contains all individual tool learning pages, organized by category.

## 📁 Folder Structure

```
pages/
├── foundation/          🎓 Core AI skills (12 tools)
│   └── (ChatGPT, Claude, Gemini, Perplexity, etc.)
│
├── creative/            🎨 Design & Art tools (15 tools)
│   ├── canva.html      ✅ COMPLETE
│   └── (Midjourney, DALL-E, Adobe Firefly, etc.)
│
├── writing/             ✍️ Content creation tools (13 tools)
│   └── (Jasper, Copy.ai, Grammarly, etc.)
│
├── technical/           💻 Development tools (12 tools)
│   └── (GitHub Copilot, Cursor, Codeium, etc.)
│
├── business/            💼 Productivity & management (21 tools)
│   └── (Notion, Monday, Asana, Trello, etc.)
│
├── research/            📚 Research & analysis tools (15 tools)
│   └── (Consensus, SciSpace, Perplexity, etc.)
│
├── voice-audio/         🎙️ Voice & audio tools (12 tools)
│   └── (ElevenLabs, Descript, Otter.ai, etc.)
│
├── video/               🎬 Video creation tools (12 tools)
│   └── (Synthesia, HeyGen, Runway, etc.)
│
├── data/                📊 Data tools (4 tools)
│   └── (Julius, Rows, etc.)
│
└── directories/         🔗 AI resource directories (8 resources)
    └── (FuturePedia, There's An AI For That, etc.)
```

## 🔗 URL Structure

Each tool page follows this pattern:
```
https://aitechmint.com/pages/{category}/{tool-name}.html
```

Examples:
- `https://aitechmint.com/pages/creative/canva.html`
- `https://aitechmint.com/pages/foundation/chatgpt.html`
- `https://aitechmint.com/pages/business/notion.html`

## 📋 File Path Conventions

When creating new tool pages in subfolders, ensure paths are updated:

**CSS:**
```html
<link rel="stylesheet" href="../../css/styles.css">
```

**Images:**
```html
<img src="../../images/tools/tool-name.png">
```

**Navigation Links:**
```html
<a href="../../index.html">Back to All Tools</a>
```

## ✅ Completed Pages

- [x] `/creative/canva.html` - Canva design tool guide

## 📝 Coming Soon

### High Priority (Popular Tools)
1. `/foundation/chatgpt.html`
2. `/foundation/claude.html`
3. `/creative/midjourney.html`
4. `/technical/github-copilot.html`
5. `/business/notion.html`

### Phase 1 (First 20 tools - 2-3 months)
- Foundation: ChatGPT, Claude, Gemini, Perplexity (4)
- Creative: Midjourney, DALL-E, Adobe Firefly (3)
- Writing: Jasper, Grammarly, QuillBot (3)
- Technical: GitHub Copilot, Cursor, Codeium (3)
- Business: Notion, Monday, Asana (3)
- Video: Synthesia, HeyGen, Runway (3)
- Voice: ElevenLabs (1)

## 🎯 Tool Page Template

Each tool page includes:
1. Hero section with primary CTA
2. What Is [Tool]? (Introduction)
3. Key Features (8 feature cards)
4. Pricing & Plans (with CTAs)
5. Getting Started Tutorial (7 steps)
6. Core Workflows & Use Cases (4 examples)
7. Pros & Cons (honest assessment)
8. FAQs (8 questions)
9. Final CTA section
10. Affiliate disclosure
11. Related tools
12. Navigation back to main site

**Template Location:** `/misc/tool_pages/TOOL_PAGE_TEMPLATE_PLAN.md`

## 🚀 Creating a New Tool Page

1. **Copy the template:**
   ```bash
   cp pages/creative/canva.html pages/{category}/{tool-name}.html
   ```

2. **Update content:**
   - Search & replace "Canva" with the new tool name
   - Update pricing, features, use cases, FAQs
   - Ensure all paths are correct (../../)

3. **Customize:**
   - Update hero gradient colors to match tool brand
   - Add tool-specific sections if needed
   - Curate 4 quality YouTube videos
   - Take screenshots of the tool

4. **Set up monetization:**
   - Sign up for tool's affiliate program
   - Replace all 7 CTA links with affiliate URLs
   - Update UTM parameters

5. **Test:**
   - Check mobile responsive
   - Verify all links work
   - Test page load speed
   - Validate HTML

**Estimated time:** 8-10 hours per tool

## 📊 Progress Tracking

**Total Tools:** 113  
**Completed:** 1 (0.9%)  
**In Progress:** 0  
**Remaining:** 112  

**Estimated Completion:**
- Part-time (20h/week): ~11 months
- Full-time (40h/week): ~5.5 months
- Team of 3: ~4 months

## 💰 Monetization Strategy

Each tool page includes **7 strategic CTAs:**
1. Hero section (primary CTA)
2. Post-introduction
3. Pricing table - Free tier
4. Pricing table - Pro tier (highest intent)
5. Post-tutorial
6. Sticky sidebar (optional)
7. Final CTA (last chance)

**Tracking:** All CTAs include UTM parameters and click tracking via Google Analytics 4.

**Revenue Model:** Affiliate commissions from tool sign-ups and upgrades.

## 📚 Documentation

- **Template Plan:** `/misc/tool_pages/TOOL_PAGE_TEMPLATE_PLAN.md`
- **Implementation Phases:** `/misc/tool_pages/TOOL_PAGE_IMPLEMENTATION_PHASES.md`
- **Quick Reference:** `/misc/tool_pages/TOOL_PAGE_QUICK_REFERENCE.md`
- **Video Strategy:** `/misc/tool_pages/TOOL_PAGE_VIDEO_STRATEGY.md`
- **Monetization:** `/misc/tool_pages/AFFILIATE_MONETIZATION_STRATEGY.md`
- **Canva TODO:** `/misc/tool_pages/CANVA_PAGE_TODO.md`

## 🔄 Updates

- **2026-01-23:** Created category folder structure (10 categories)
- **2026-01-23:** Completed Canva tool page (first example)
- **2026-01-23:** Moved Canva to `/creative/` folder

---

**Note:** This is a living document. Update as new pages are added and the structure evolves.
