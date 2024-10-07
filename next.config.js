/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        loader: 'custom',
        loaderFile: "./src/utils/imageLoader.js",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/',
            },
        ],
    },
}
