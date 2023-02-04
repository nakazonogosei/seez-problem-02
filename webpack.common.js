const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlHarddiskPlugin = require("html-webpack-harddisk-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const globule = require("globule");

function generateHtmlPlugins(srcDir) {
  const srcFiles = globule.find(["**/*.ejs", "!**/_*.ejs"], { cwd: path.resolve(__dirname, srcDir) });
  return srcFiles.map(item => {
    const parts = item.split(".");
    const name = parts[0];

    return new HtmlPlugin({
      template: path.resolve(__dirname, `${srcDir}/${name}.ejs`),
      filename: `${name}.html`,
      inject: false,
      minify: false,
      alwaysWriteToDisk: true
    })
  })
}
const htmlPlugins = generateHtmlPlugins("src/ejs/");

module.exports = () => ({
  entry: [
    path.resolve(__dirname, "src/js/", "index.js"),
    path.resolve(__dirname, "src/scss/", "style.scss")
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "assets/js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  require("autoprefixer")({
                    grid: true
                  })
                ]
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sourceMap: true,
              sassOptions: {
                outputStyle: "expanded"
              }
            }
          }
        ]
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: false,
              minimize: false
            }
          },
          {
            loader: "ejs-plain-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/style.css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/json/", to: "" }
        // { from: "src/images/", to: "assets/images/" }
        // { from: "src/pdf/", to: "assets/pdf/" },
        // { from: "src/movies/", to: "assets/movies/" },
        // { from: "src/meta/", to: "" }
      ]
    }),
    new CleanWebpackPlugin(),
    new HtmlHarddiskPlugin()
  ].concat(htmlPlugins),
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
      watch: true
    },
    port: 8000,
    open: true,
    hot: true
  },
  target: "web"
});
