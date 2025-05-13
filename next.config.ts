// import type { NextConfig } from 'next';
// import path from 'path';

// const nextConfig: NextConfig = {
//   webpack: (config, { isServer }) => {
//     // Resolve path aliases
//     config.resolve = config.resolve || {};
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       '@': path.resolve(__dirname, 'src'),
//     };

//     // Add SVG support
//     config.module = config.module || {};
//     config.module.rules = config.module.rules || [];
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     });

//     return config; // Return the modified config
//   },
// };

// export default nextConfig;
