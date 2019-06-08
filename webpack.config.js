const path = require("path");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    filename: "./src/client/game.bundle.js",
    path: path.resolve()
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options:{
          presets: ["react", "es2015", "stage-0"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};