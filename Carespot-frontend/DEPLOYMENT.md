# CareSpot Frontend Deployment Guide

## Vercel Deployment

This project is configured for easy deployment on Vercel with optimized settings for performance and PWA functionality.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/carespot-frontend)

### Manual Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the frontend directory**:
   ```bash
   cd Carespot-frontend
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? Choose your account/team
   - Link to existing project? `N` (for first deployment)
   - What's your project's name? `carespot-frontend`
   - In which directory is your code located? `./`

### Environment Variables

Currently, the frontend runs without backend dependencies. When you're ready to connect the backend, you'll need to set these environment variables in Vercel:

```bash
# Future backend integration
VITE_API_BASE_URL=https://your-backend-api.com
VITE_APP_ENV=production
```

### Build Configuration

The project includes:
- **Optimized Vite build** with code splitting
- **PWA support** with service worker
- **Performance optimizations** with asset compression
- **SEO-friendly** routing configuration

### Performance Features

- ✅ Code splitting by feature (analytics, community, volunteer)
- ✅ Asset optimization (images, fonts)
- ✅ Service Worker for offline functionality
- ✅ Lazy loading for components
- ✅ Optimized bundle sizes

### Post-Deployment Checklist

After deployment, verify:
- [ ] All pages load correctly
- [ ] PWA install prompt works
- [ ] Service worker registers successfully
- [ ] Images and assets load properly
- [ ] Navigation works on all routes
- [ ] Mobile responsiveness
- [ ] Performance scores (Lighthouse)

### Custom Domain Setup

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Configure DNS records as instructed

### Monitoring

Vercel provides built-in analytics and monitoring:
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Error tracking
- Performance insights

### Troubleshooting

**Build Failures:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

**Routing Issues:**
- Verify vercel.json configuration
- Check that all routes redirect to index.html

**PWA Issues:**
- Ensure service worker is properly configured
- Check manifest.json is accessible
- Verify HTTPS is enabled

### Development vs Production

The app automatically detects the environment and adjusts:
- Development: Full error messages, dev tools
- Production: Optimized bundles, error boundaries

### Next Steps

1. **Custom Domain**: Set up your custom domain
2. **Analytics**: Configure web analytics (Google Analytics, etc.)
3. **Backend Integration**: Connect to your Django backend when ready
4. **Performance Monitoring**: Set up continuous performance monitoring