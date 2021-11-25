module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://laportes.com.br/:path*',
      },
    ]
  },
}
