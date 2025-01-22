const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // Use development mode
  entry: {
    index: "./src/index.ts",
    client: "./src/client.ts"
  }, // Main TypeScript entry point
  output: {
    filename: "[name].bundle.js", // Bundled JavaScript output
    path: path.resolve(__dirname, "dist"), // Output directory
    clean: true, // Clean the dist folder before each build
  },
  devtool: "inline-source-map", // Enable source maps for debugging
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Serve files from the dist directory
    },
    hot: true, // Enable hot module replacement
    open: true, // Automatically open the browser
    port: 3000, // Set the dev server port
    watchFiles: ["src/**/*", "public/**/*"], // Watch TypeScript, HTML, and CSS files for changes
    liveReload: true, // Enable live reloading
  },
  resolve: {
    extensions: [".ts", ".js"], // Automatically resolve these file extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Handle TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Use the provided HTML template
      filename: "index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      template: './public/client.html',
      filename: 'client.html',  // Output filename for this HTML
      chunks: ['client'],  // Inject the main bundle
    }),
  ],
};
