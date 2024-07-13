/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"]
  },
};

export default nextConfig;


/*
The webpack: (config) => { ... } block in your next.config.js is modifying the Webpack configuration for your Next.js project. Specifically, it enables the topLevelAwait experimental feature in Webpack.

What is topLevelAwait?
The topLevelAwait feature allows you to use the await keyword at the top level of a module. This means you can await promises outside of async functions, which can simplify code that deals with asynchronous operations.

Why Does It Cause Issues?
Enabling topLevelAwait can sometimes cause issues because it is an experimental feature and may not be fully supported or might have bugs. When you enable it, it can change how your modules are loaded and executed, which might lead to unexpected behavior, especially in complex setups involving middleware, database connections, and other asynchronous operations.
*/