import { routes, type VercelConfig } from '@vercel/config/v1';

/**
 * This is a Vite single-page app. Rewrites are evaluated after the filesystem
 * check, so real build assets (JS/CSS/images) are served directly and every
 * other path falls back to index.html — letting react-router handle deep links
 * such as /add and /edit/:id on a full page load or refresh.
 */
export const config: VercelConfig = {
  framework: 'vite',
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
  rewrites: [routes.rewrite('/(.*)', '/index.html')],
};
