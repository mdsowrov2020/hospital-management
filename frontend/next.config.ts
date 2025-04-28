/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
    "@rc-component/util",
  ],
  experimental: {
    missingSuspenseWithCSRBailout: false,
    esmExternals: "loose", // Allow ESM dependencies
  },
  output: "standalone",
};

export default nextConfig;
