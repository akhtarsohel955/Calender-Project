# Deployment Guide

This guide explains how to deploy the Wall Calendar application to various hosting platforms.

## Vercel (Recommended)

Vercel is the easiest way to deploy this Vite + React application.

### Steps:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Configuration:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Netlify

### Steps:

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

## GitHub Pages

### Steps:

1. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Add base path in vite.config.ts:
   ```typescript
   export default defineConfig({
     base: '/Interactive-calendar/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in repository settings

## Docker

### Dockerfile:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run:

```bash
docker build -t wall-calendar .
docker run -p 8080:80 wall-calendar
```

## Environment Variables

This application doesn't require environment variables for basic functionality. All data is stored in localStorage.

## Performance Optimization

Before deploying:

1. Run build with production mode:
   ```bash
   npm run build
   ```

2. Check bundle size:
   ```bash
   npm run build -- --mode production
   ```

3. Test production build locally:
   ```bash
   npm run preview
   ```

## Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Verify responsive design on mobile devices
- [ ] Check browser console for errors
- [ ] Test localStorage functionality
- [ ] Verify all animations work smoothly
- [ ] Check SEO meta tags
- [ ] Test 404 page routing

## Troubleshooting

### Issue: Blank page after deployment
- Check browser console for errors
- Verify base path in vite.config.ts matches your deployment URL
- Ensure all assets are loading correctly

### Issue: Routing not working
- Configure your hosting platform for SPA routing
- For Netlify: Add `_redirects` file with `/* /index.html 200`
- For Vercel: Add `vercel.json` with rewrites configuration

### Issue: Build fails
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
