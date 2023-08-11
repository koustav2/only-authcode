/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['firebasestorage.googleapis.com', 'rb.gy'],// <== Domain name
    }
}

module.exports = nextConfig


// domains: ['firebasestorage.googleapis.com','rb.gy'],