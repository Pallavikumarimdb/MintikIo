/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/mint/:path*',
        destination: '/blink/redirect/:path*',
        permanent: false,
      },
      {
        source: '/blinks.solana.com/mint/:path*',
        destination: '/blink/redirect/:path*',
        permanent: false,
      },
      {
        source: '/:path*/github',
        destination: 'https://github.com/:path*',
        permanent: true,
      },
      {
        source: '/twitter/:username',
        destination: 'https://twitter.com/:username',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/your-discord-invite', // Replace with your Discord invite link
        permanent: true,
      },
      {
        source: '/telegram',
        destination: 'https://t.me/your-telegram-channel', // Replace with your Telegram channel link
        permanent: true,
      },
      {
        source: '/linkedin/:username',
        destination: 'https://linkedin.com/in/:username',
        permanent: true,
      },
      {
        source: '/opensea/:collectionSlug',
        destination: 'https://opensea.io/collection/:collectionSlug',
        permanent: true,
      },
      {
        source: '/solscan/tx/:txHash',
        destination: 'https://solscan.io/tx/:txHash',
        permanent: true,
      },
      {
        source: '/solscan/account/:account',
        destination: 'https://solscan.io/account/:account',
        permanent: true,
      },
      {
        source: '/donate',
        destination: '/support', // Or your actual donation page
        permanent: false,
      },
      // Add more redirects as needed for social links, external resources, etc.
    ];
  },
};


export default nextConfig
