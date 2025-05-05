/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  experimental: {
    serverComponentsExternalPackages: ['pg'],
  },
  // Map existing environment variables for use in Next.js
  env: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.VITE_RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
  // Configure Content Security Policy for ReCAPTCHA
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com;
              style-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com;
              img-src 'self' data: https://www.google.com https://www.gstatic.com;
              connect-src 'self' https://www.google.com;
              frame-src 'self' https://www.google.com;
              font-src 'self' data:;
            `.replace(/\s+/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;