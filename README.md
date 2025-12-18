# Vault Security Setup Wizard

An interactive wizard for configuring vault security with network connections and multisig device setup.

## Features

- Step-by-step vault security configuration
- Network mode opt-in for key sharing
- Multisig device loadout selection
- Interactive canvas visualization
- State persistence with localStorage

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

This project is configured for GitHub Pages deployment. Follow these steps:

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com/new) and create a new repository
2. Note the repository name (e.g., `vault-security-wizard`)

### 2. Update Repository Name

Replace `REPO_NAME` in two places:

**In `.github/workflows/deploy.yml`:**
```yaml
- name: Build
  run: npm run build:pages
  env:
    GITHUB_PAGES_BASE: /your-repo-name/
```

**In `package.json`:**
```json
"build:pages": "cross-env GITHUB_PAGES_BASE=/your-repo-name/ npm run build"
```

### 3. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

The workflow will automatically deploy on every push to `main`.

Your site will be available at: `https://YOUR_USERNAME.github.io/your-repo-name/`
