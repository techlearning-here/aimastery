# 🚀 Deployment Guide - Jinja2 + GitHub Pages

This guide explains how to deploy your Jinja2-generated site to GitHub Pages.

---

## ✅ Short Answer: YES, It Works Perfectly!

**GitHub Pages only sees static HTML files.** It doesn't know or care that they were generated with Jinja2.

---

## 🎯 Three Deployment Options

### Option 1: Manual Build + Commit (Easiest - Start Here!) ⭐

**How it works:**
1. You build the site locally
2. Commit both source files and generated HTML
3. Push to GitHub
4. GitHub Pages serves the HTML

**Perfect for:** Getting started, small teams, simple workflow

---

### Option 2: Automated with GitHub Actions (Recommended Long-term)

**How it works:**
1. You commit only source files (YAML, templates)
2. GitHub Actions automatically builds on push
3. Generated HTML is deployed
4. GitHub Pages serves it

**Perfect for:** Teams, reducing git clutter, professional workflow

---

### Option 3: Separate Branch (Advanced)

**How it works:**
1. Source code in `main` branch
2. Generated site in `gh-pages` branch
3. GitHub Pages deploys from `gh-pages`

**Perfect for:** Large projects, complete separation

---

## 📖 Option 1: Manual Build (Detailed Guide)

### Step-by-Step Workflow

#### 1. Make Changes to Your Site

```bash
# Edit tool data
nano tools/data/tools.yaml
```

#### 2. Build the Site

```bash
cd tools
python3 build.py
```

**Output:**
```
🚀 AI TECH MINT - JINJA2 STATIC SITE GENERATOR
📂 Loading data from YAML...
   ✅ Loaded 10 tools
🏠 Rendering homepage...
   ✅ Generated: ../output/index.html
📦 Copying static assets...
   ✅ Copied CSS files
   ✅ Copied images
✨ BUILD COMPLETE! ✨
```

#### 3. Copy Generated Files to Root

```bash
# Use the deploy script
cd tools
./deploy.sh
```

Or manually:
```bash
cp output/index.html ../index.html
# Copy other files as needed
```

#### 4. Commit and Push

```bash
cd ..
git add index.html tools/data/tools.yaml
git commit -m "Add new AI tools"
git push origin main
```

#### 5. Done! 🎉

GitHub Pages automatically deploys your changes (usually takes 1-2 minutes).

Visit: `https://yourusername.github.io/repo-name/`

---

### Using the Deploy Script

We've created a handy script that does steps 2-3 automatically:

```bash
cd tools
./deploy.sh
```

**What it does:**
1. ✅ Runs `python3 build.py`
2. ✅ Copies generated files to root
3. ✅ Shows git status
4. ✅ Reminds you of next steps

**Then you just:**
```bash
git add .
git commit -m "Update site"
git push
```

---

## 📖 Option 2: GitHub Actions (Automated)

### Setup (One-time)

#### 1. Enable GitHub Actions Workflow

The workflow file is already created at `.github/workflows/build-and-deploy.yml`, but it's commented out.

**Edit the file and uncomment everything:**

```bash
nano .github/workflows/build-and-deploy.yml
```

Remove the `#` from all lines to enable it.

#### 2. Configure GitHub Pages

1. Go to your repo: `https://github.com/yourusername/repo-name`
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Click **Save**

#### 3. Push the Workflow

```bash
git add .github/workflows/build-and-deploy.yml
git commit -m "Add automated build workflow"
git push
```

### Daily Workflow (After Setup)

```bash
# 1. Edit data
nano tools/data/tools.yaml

# 2. Commit and push
git add tools/data/tools.yaml
git commit -m "Add new tool"
git push

# 3. That's it! GitHub Actions automatically:
#    - Installs Python
#    - Installs dependencies
#    - Runs build.py
#    - Commits generated HTML
#    - Deploys to GitHub Pages
```

**Check build status:**
- Go to your repo → **Actions** tab
- See real-time build progress
- Get notified if build fails

---

## 🔍 Comparison

| Feature | Manual Build | GitHub Actions | Separate Branch |
|---------|-------------|----------------|-----------------|
| Setup complexity | ⭐ Easy | ⭐⭐ Medium | ⭐⭐⭐ Complex |
| Git history | Mixed (source + generated) | Clean (auto-commits) | Very clean |
| Build location | Your computer | GitHub servers | GitHub servers |
| Build time | Instant | 1-2 minutes | 1-2 minutes |
| Requires Python locally | ✅ Yes | ❌ No | ❌ No |
| Auto-deploy | ❌ No | ✅ Yes | ✅ Yes |
| Best for | Starting out, small sites | Production, teams | Large projects |

---

## 💡 Recommendations

### For You (Starting Out):

**Week 1-2: Manual Build (Option 1)**
- ✅ Simple and fast
- ✅ See how it works
- ✅ No complexity

**Week 3+: GitHub Actions (Option 2)**
- ✅ Automate the workflow
- ✅ Cleaner git history
- ✅ Professional setup

### For Interns:

**Manual build is PERFECT:**
- They edit YAML files
- Run `./deploy.sh`
- Commit and push
- Easy to review PRs (just data changes)

---

## 🎓 Understanding GitHub Pages

### What GitHub Pages Does:

```
GitHub Repo
    ↓
Serves static files from:
    - index.html
    - CSS files
    - JS files
    - Images
    ↓
Your website at: username.github.io/repo
```

### What GitHub Pages Doesn't Do:

❌ Run Python scripts
❌ Execute Jinja2 templates
❌ Build anything server-side

### Why This Works:

✅ You generate HTML **before** pushing
✅ GitHub Pages **only sees HTML**
✅ Same as any static website

---

## 🔧 Troubleshooting

### Build fails with "Module not found"

**Solution:**
```bash
cd tools
pip install -r requirements.txt
```

### Generated files not showing on GitHub Pages

**Check:**
1. Files are committed: `git status`
2. Files are pushed: `git push`
3. GitHub Pages is enabled: Repo → Settings → Pages
4. Wait 1-2 minutes for deployment

### GitHub Actions workflow not running

**Check:**
1. Workflow file is uncommented
2. File is in `.github/workflows/`
3. Pushed to `main` branch
4. Actions are enabled: Repo → Settings → Actions

### CSS/images not loading

**Check:**
1. Paths in templates are correct: `../css/styles.css`
2. Files are copied to output: Check `output/` folder
3. Files are in repo root
4. Case-sensitive paths (GitHub Pages is case-sensitive)

---

## 📊 Deployment Checklist

### Before First Deployment:

- [ ] Python 3.11+ installed
- [ ] Dependencies installed: `pip install -r requirements.txt`
- [ ] Build script works: `python3 build.py`
- [ ] Generated HTML looks correct: Open `output/index.html`
- [ ] GitHub Pages enabled in repo settings

### Before Each Deployment:

- [ ] Data is updated in `tools/data/tools.yaml`
- [ ] Site builds without errors: `python3 build.py`
- [ ] Preview looks good: Open `output/index.html`
- [ ] Commit message is descriptive

### After Deployment:

- [ ] Push succeeded: Check GitHub repo
- [ ] GitHub Pages deployed: Check Actions tab (if using)
- [ ] Site is live: Visit your GitHub Pages URL
- [ ] Everything works: Test links, images, etc.

---

## 🚀 Quick Reference Commands

### Manual Build & Deploy:

```bash
# Full workflow
cd tools
python3 build.py
./deploy.sh
cd ..
git add .
git commit -m "Update site"
git push
```

### One-liner (after setup):

```bash
cd tools && python3 build.py && ./deploy.sh && cd .. && git add . && git commit -m "Update" && git push
```

---

## 🎯 Example: Adding a New Tool

### Complete workflow:

```bash
# 1. Edit data
nano tools/data/tools.yaml
# Add your tool data

# 2. Build
cd tools
python3 build.py

# 3. Preview (optional)
open output/index.html

# 4. Deploy
./deploy.sh

# 5. Commit
cd ..
git add index.html tools/data/tools.yaml
git commit -m "Add GPT-4 Turbo to Foundation category"
git push origin main

# 6. Wait 1-2 minutes, then visit your site!
```

**Total time: 3-5 minutes** ✨

---

## 💰 Cost

**GitHub Pages:**
- ✅ FREE for public repos
- ✅ FREE for private repos (within limits)
- ✅ No hosting fees
- ✅ No server management

**GitHub Actions (if using):**
- ✅ FREE for public repos (unlimited)
- ✅ FREE tier for private repos (2,000 minutes/month)
- ✅ Your build takes ~30 seconds

---

## ✨ Summary

**YES, Jinja2 + GitHub Pages work perfectly together!**

✅ Generate HTML locally or with GitHub Actions
✅ Push to GitHub like any static site
✅ GitHub Pages serves it automatically
✅ Free hosting, fast loading, no server needed

**The magic:** Jinja2 runs on your computer (or GitHub Actions), GitHub Pages only sees the final HTML.

---

**Questions? Issues? Check the troubleshooting section above!**
