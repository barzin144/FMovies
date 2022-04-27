module.exports = {
  entry: {
    main: "./src/index.tsx",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".png", ".jpg", ".svg"],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts",
            },
          },
        ],
      },
      {
        test: /\.(tsx$|ts$)/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
