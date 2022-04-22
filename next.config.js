/**
 * @type { import('next').NextConfig }
 */
const config = {
	reactStrictMode: process.env.NODE_ENV === 'development',
	swcMinify: true,
}

module.exports = config
