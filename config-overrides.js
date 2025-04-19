const webpack = require("webpack");

module.exports = function override(config, env) {
    // Add fallback for Node.js core modules
    config.resolve.fallback = {
        ...config.resolve.fallback, // Preserve existing fallbacks
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        process: require.resolve("process/browser"),
    };

    // Add plugins to provide global variables
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        })
    );

    return config;
};