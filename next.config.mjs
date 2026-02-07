/** @type {import('next').NextConfig} */

const repoName = 'document-reader-platform'

const nextConfig = {
  output: 'export', // WAJIB untuk static export

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
}

export default nextConfig