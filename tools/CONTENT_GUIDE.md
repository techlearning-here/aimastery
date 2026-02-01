# Content Guide: Creating Tool Pages

This guide explains how to prepare content for AI Tech Mint tool pages. **No coding required** - you just need to fill in a text file.

---

## Quick Start (5 minutes)

### Step 1: Copy the Template

1. Go to the folder: `tools/data/tool_pages/`
2. Copy the file `_template.yaml`
3. Rename it to your tool name (lowercase, use hyphens for spaces)
   - ✅ `chatgpt.yaml`
   - ✅ `dall-e-3.yaml`
   - ✅ `github-copilot.yaml`
   - ❌ `ChatGPT.yaml` (no capitals)
   - ❌ `dall e 3.yaml` (no spaces)

### Step 2: Open and Edit

Open the file in any text editor (VS Code, Notepad, TextEdit, etc.)

### Step 3: Fill in the Content

Follow the sections below to fill in each part.

---

## Content Sections Explained

### 1. Tool Metadata (Required)

```yaml
tool:
  name: "ChatGPT"                      # Official tool name
  slug: "chatgpt"                      # Same as filename (no .yaml)
  category: "foundation"               # See category list below
  emoji: "🤖"                          # One emoji that represents the tool
  short_title: "AI Assistant"          # 2-4 words describing what it is
  tagline: "Your AI-powered assistant" # Catchy one-liner for the hero
```

**Categories to choose from:**
| Category | Use for |
|----------|---------|
| `foundation` | Core AI tools (ChatGPT, Claude, Gemini) |
| `creative` | Image/design tools (Canva, Midjourney, DALL-E) |
| `writing` | Writing tools (Jasper, Copy.ai, Grammarly) |
| `technical` | Developer tools (GitHub Copilot, Cursor) |
| `business` | Business tools (Notion AI, Zapier) |
| `research` | Research tools (Perplexity, Elicit) |
| `voice` | Audio/voice tools (ElevenLabs, Murf) |
| `video` | Video tools (Runway, Synthesia, Pictory) |
| `data` | Data tools (Julius, Code Interpreter) |
| `directory` | AI directories (There's an AI for That, Futurepedia) |

### 2. SEO Information (Required)

```yaml
  meta_description: "Learn ChatGPT - Complete guide to AI conversations, 
    prompt engineering, and productivity. Free tutorials and tips."
  keywords: "ChatGPT tutorial, ChatGPT guide, learn ChatGPT, ChatGPT tips, 
    AI assistant, OpenAI"
```

**Tips:**
- `meta_description`: 150-160 characters, include tool name
- `keywords`: 5-10 relevant search terms, comma-separated

### 3. Call-to-Action (CTA)

```yaml
  cta_url: "https://chat.openai.com/?utm_source=aitechmint"
  cta_text: "Try ChatGPT Free →"
  cta_subtitle: "Join 100M+ users worldwide"
```

**Important:** Always add `?utm_source=aitechmint` to the URL for tracking.

### 4. What Is [Tool]? Section

```yaml
content:
  what_is: |
    <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary);">
        ChatGPT is an AI chatbot developed by OpenAI that can understand 
        and respond to natural language. It can help with writing, coding, 
        research, brainstorming, and much more.
    </p>
    
    <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary);">
        Launched in November 2022, ChatGPT quickly became the fastest-growing 
        app in history, reaching 100 million users in just two months.
    </p>
```

**What to include:**
- What the tool is (1-2 sentences)
- What it does / main benefits
- Brief history or popularity stats
- Keep the `<p>` tags and styling exactly as shown

### 5. Who Is It For?

```yaml
  who_is_for:
    - title: "Students"
      description: "Research, writing assistance, and study help"
    - title: "Professionals"
      description: "Email drafting, report writing, and brainstorming"
    - title: "Developers"
      description: "Code generation, debugging, and documentation"
    - title: "Content Creators"
      description: "Blog posts, social media, and creative writing"
```

**Aim for 4-6 audiences.**

### 6. Key Features

```yaml
  features:
    - icon: "💬"
      title: "Natural Conversations"
      description: "Chat naturally like you would with a human. Ask follow-up 
        questions and refine responses."
      pro_tip: "Be specific in your prompts for better results."
    
    - icon: "🧠"
      title: "Memory & Context"
      description: "ChatGPT remembers what you've discussed in the conversation 
        and builds on previous messages."
```

**Icon suggestions:**
- 💬 Chat/conversation
- 🧠 Intelligence/learning
- ⚡ Speed/performance
- 🎨 Creative/design
- 📊 Data/analytics
- 🔒 Security/privacy
- 🌐 Web/internet
- 📱 Mobile/apps
- 🤖 AI/automation
- ✨ Magic/special

**Aim for 4-8 features.**

### 7. Getting Started Steps

```yaml
  getting_started: |
    <p style="font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 30px;">
        Getting started with ChatGPT takes just a few minutes:
    </p>
    
    <h3>Step 1: Create an Account</h3>
    <p style="color: var(--text-secondary); line-height: 1.8;">
        Go to <a href="https://chat.openai.com" target="_blank" 
        style="color: var(--primary-color);">chat.openai.com</a> and sign up 
        with your email, Google, or Microsoft account.
    </p>
    
    <h3>Step 2: Start a Conversation</h3>
    <p style="color: var(--text-secondary); line-height: 1.8;">
        Type your question or request in the chat box. Be clear and specific.
    </p>
    
    <h3>Step 3: Refine Your Results</h3>
    <p style="color: var(--text-secondary); line-height: 1.8;">
        Ask follow-up questions to improve the response. You can ask ChatGPT 
        to make it shorter, longer, more formal, etc.
    </p>
```

**Tips:**
- 3-5 steps is ideal
- Keep steps simple and actionable
- Include links where helpful

### 8. Pricing

```yaml
  pricing_summary: "ChatGPT offers a free tier and ChatGPT Plus at $20/month."
  
  pricing:
    - name: "Free"
      price: "$0"
      period: "/month"
      features:
        - "Access to GPT-3.5"
        - "Unlimited messages"
        - "Web browsing (limited)"
      cta_text: "Start Free"
    
    - name: "Plus"
      price: "$20"
      period: "/month"
      featured: true
      badge: "Most Popular"
      features:
        - "Access to GPT-4"
        - "Faster response times"
        - "Priority access"
        - "Advanced data analysis"
        - "DALL-E image generation"
      cta_text: "Upgrade to Plus"
```

**Notes:**
- Add `featured: true` to highlight the recommended plan
- `badge:` adds a ribbon (use "Most Popular", "Best Value", etc.)

### 9. Pros & Cons

```yaml
  pros:
    - "Free tier is very capable for most users"
    - "Natural, conversational interface"
    - "Constantly improving with updates"
    - "Supports many languages"
    - "Can help with almost any task"
  
  cons:
    - "Can sometimes provide inaccurate information"
    - "Knowledge cutoff date (not real-time)"
    - "GPT-4 requires paid subscription"
    - "Can be slow during peak times"
```

**Be honest!** Users appreciate balanced reviews.

### 10. FAQ

```yaml
  faq:
    - question: "Is ChatGPT free?"
      answer: "Yes! ChatGPT offers a free tier with access to GPT-3.5. 
        ChatGPT Plus ($20/month) provides access to GPT-4 and additional features."
    
    - question: "Is ChatGPT safe to use?"
      answer: "ChatGPT is generally safe, but avoid sharing sensitive personal 
        information. OpenAI may use conversations to improve the model unless 
        you opt out in settings."
    
    - question: "Can ChatGPT write code?"
      answer: "Yes! ChatGPT can write, debug, and explain code in many 
        programming languages including Python, JavaScript, and more."
```

**Aim for 4-6 questions.** Think about what users commonly ask.

### 11. Related Tools

```yaml
  related_tools:
    - icon: "🧠"
      name: "Claude"
      description: "Anthropic's AI assistant with longer context"
      url: "#"
    
    - icon: "✨"
      name: "Gemini"
      description: "Google's multimodal AI"
      url: "#"
    
    - icon: "🔍"
      name: "Perplexity"
      description: "AI-powered search engine"
      url: "#"
```

**Include 3 related tools.**

---

## Complete Example

See `canva.yaml` for a complete, filled-in example.

---

## Common Mistakes to Avoid

| ❌ Don't | ✅ Do |
|----------|-------|
| Use tabs for indentation | Use 2 spaces |
| Forget the `|` for multi-line text | Add `|` after fields with HTML |
| Remove the HTML styling | Keep all `<p>`, `<h3>` tags |
| Use quotes inside quotes | Use single quotes inside double |
| Leave placeholder text | Fill in all sections |

---

## YAML Formatting Tips

### Multi-line Text
Use `|` for blocks of text:
```yaml
what_is: |
  <p>First paragraph here.</p>
  <p>Second paragraph here.</p>
```

### Lists
Use `-` for list items:
```yaml
features:
  - icon: "🎨"
    title: "Feature One"
  - icon: "⚡"
    title: "Feature Two"
```

### Quotes
If your text contains colons or special characters, wrap in quotes:
```yaml
title: "What is ChatGPT?"
description: "The world's most popular AI: now available free"
```

---

## Checklist Before Submitting

- [ ] Filename is lowercase with hyphens (e.g., `tool-name.yaml`)
- [ ] `slug` matches filename (without .yaml)
- [ ] All required fields are filled in
- [ ] `cta_url` includes `?utm_source=aitechmint`
- [ ] No placeholder text remaining
- [ ] Pricing information is current
- [ ] Pros AND cons are included (be balanced!)
- [ ] 4-6 FAQ questions answered
- [ ] Spell-checked content

---

## Need Help?

1. **Look at the example:** `canva.yaml` shows a complete page
2. **Copy the template:** `_template.yaml` has all fields with comments
3. **Test your YAML:** Paste into [yamllint.com](https://www.yamllint.com/) to check for errors

---

## After You're Done

Send your completed `.yaml` file to the developer. They will:
1. Add it to `tools/data/tool_pages/`
2. Run the build script
3. Review the generated page
4. Deploy to the website

**That's it! No coding required on your part.**
