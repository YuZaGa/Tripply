/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "places.googleapis.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "images.trvl-media.com",
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
        ],
    },
    // Prevent firebase-admin (server-only) from being bundled into client
    serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
