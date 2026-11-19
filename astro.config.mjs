import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kassaicserkesz.sk',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
