const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");

const pkg = require("../package.json");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  style: path.join(__dirname, "../src/assets/style"),
  assets: "assets"
};

module.exports = {
  externals: {
    paths: PATHS,
    version: pkg.version
  },
  entry: {
    bundle: PATHS.src
  },
  output: {
    filename: `[name]-[hash].js`,
    path: PATHS.dist,
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: "/node-modules/"
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true, config: { path: "postcss.config.js" } }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: `[name].[ext]`
        }
      }
    ]
  },
  plugins: [
    new RemovePlugin({
      before: {
        include: ["dist"]
      }
    }),
    new MiniCssExtractPlugin({
      filename: `./css/[name]-[hash].css`
    }),
  ],
  resolve: {
    alias: {
      assets: `${PATHS.src}/assets`,
      components: `${PATHS.src}/components`,
      layout: `${PATHS.src}/layout`,
      views: `${PATHS.src}/views`,
      constants: `${PATHS.src}/constants`,
      shared: `${PATHS.src}/shared`,
      icons: `${PATHS.src}/shared/icons`,
      modules: `${PATHS.src}/shared/modules`,
      services: `${PATHS.src}/services`,
      utils: `${PATHS.src}/utils`,
      src: PATHS.src
    },
    plugins: [],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"]
  }
};
