# 🚀 CareSpot Frontend - Vercel Deployment Guide

## Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Git** - [Download here](https://git-scm.com/)
3. **Vercel Account** - [Sign up here](https://vercel.com/signup)

## Method 1: Quick Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub
```bash
# If you haven't already, initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit - CareSpot Frontend"
git branch -M main
git remote add origin https://github.com/yourusername/carespot-frontend.git
git push -u origin main
```

### Step 2: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `Carespot-frontend` (if in a monorepo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
# Navigate to the frontend directory
cd Carespot-frontend

# Deploy (first time)
vercel

# Or use the automated script
# Windows:
deploy.bat

# Linux/Mac:
./deploy.sh
```

### Step 4: Production Deployment
```bash
vercel --prod
```

## Configuration Details

### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Environment Variables (Optional)
Currently, the app runs standalone. When you connect the backend later, add these in Vercel dashboard:

```
VITE_API_BASE_URL=https://your-backend-api.com
VITE_APP_ENV=production
```

## Vercel Configuration Features

Our `vercel.json` includes:

✅ **SPA Routing**: All routes redirect to `index.html`  
✅ **PWA Support**: Service worker and manifest properly served  
✅ **Caching**: Optimized cache headers for assets  
✅ **Performance**: Static asset optimization  

## Post-Deployment Checklist

After deployment, verify:

- [ ] **Homepage loads**: Check the main landing page
- [ ] **Navigation works**: Test all menu items and routes
- [ ] **Mobile responsive**: Test on different screen sizes
- [ ] **PWA features**: Install prompt and offline functionality
- [ ] **Performance**: Run Lighthouse audit
- [ ] **Search functionality**: Test the global search component

## Performance Optimization

The build includes:

- **Code Splitting**: Separate chunks for analytics, community, volunteer features
- **Asset Optimization**: Images and fonts properly compressed
- **Bundle Analysis**: Optimized chunk sizes
- **Service Worker**: Offline functionality and caching

## Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Routing Issues:**
- Ensure `vercel.json` is properly configured
- Check that all routes redirect to `index.html`

**PWA Not Working:**
- Verify service worker is accessible at `/sw.js`
- Check manifest.json is served correctly
- Ensure HTTPS is enabled (automatic on Vercel)

**Performance Issues:**
```bash
# Analyze bundle size
npm run build:analyze

# Run performance audit locally
npm run performance:audit
```

## Custom Domain Setup

1. In Vercel dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your custom domain
4. Configure DNS records as instructed by Vercel
5. SSL certificate will be automatically provisioned

## Monitoring and Analytics

Vercel provides built-in monitoring:
- **Real User Monitoring (RUM)**
- **Core Web Vitals tracking**
- **Function logs and errors**
- **Bandwidth and request analytics**

## Next Steps After Deployment

1. **Test thoroughly**: Go through all pages and features
2. **Set up monitoring**: Configure error tracking if needed
3. **Performance optimization**: Monitor Core Web Vitals
4. **SEO optimization**: Add meta tags and structured data
5. **Backend integration**: Connect to Django API when ready

## Deployment URLs

After deployment, you'll get:
- **Production URL**: `https://your-project.vercel.app`
- **Preview URLs**: For each branch/PR
- **Custom Domain**: When configured

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **React Docs**: [react.dev](https://react.dev)

---

🎉 **Your CareSpot frontend is now ready for the world!**