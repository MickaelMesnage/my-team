/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public', // les assets du service worker seront dans le dossier public
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  // autres configurations de next.js
});

module.exports = nextConfig


