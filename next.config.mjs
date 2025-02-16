import CopyPlugin from "copy-webpack-plugin";

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    // append the CopyPlugin to copy the file to your public dir
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/@interledger/open-payments/dist/openapi/specs",
            to: "server/vendor-chunks/specs",
          },
        ],
      }),
    );
    // Important: return the modified config
    return config;
  },
};

export default config;
