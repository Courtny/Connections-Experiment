# GitHub Pages Deployment Guide

This project is configured to deploy to GitHub Pages using GitHub Actions.

## Setting the Repository Name

Before deploying, you need to set your repository name in two places:

### 1. Update `package.json`

In the `build:pages` script, replace `REPO_NAME` with your actual repository name:

```json
"build:pages": "cross-env GITHUB_PAGES_BASE=/REPO_NAME/ npm run build"
```

For example, if your repository is named `my-vite-app`, it should be:

```json
"build:pages": "cross-env GITHUB_PAGES_BASE=/my-vite-app/ npm run build"
```

### 2. Update `.github/workflows/deploy.yml`

In the workflow file, replace `REPO_NAME` in the Build step's environment variable:

```yaml
- name: Build
  run: npm run build:pages
  env:
    GITHUB_PAGES_BASE: /REPO_NAME/
```

For example, if your repository is named `my-vite-app`, it should be:

```yaml
- name: Build
  run: npm run build:pages
  env:
    GITHUB_PAGES_BASE: /my-vite-app/
```

## Enabling GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (in the repository navigation bar)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
5. Save the settings

## Deployment

Once configured:

1. Push your code to the `main` branch (or trigger the workflow manually)
2. The GitHub Actions workflow will automatically:
   - Build your project with the correct base path
   - Deploy the `dist/` folder to GitHub Pages
3. Your site will be available at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

## Manual Build

To test the build locally before deploying:

```bash
npm run build:pages
```

This will create a `dist/` folder with the production build using the configured base path.


