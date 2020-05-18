module.exports = (phase, { defaultConfig }) => {
    return {
        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            // Note: we provide webpack above so you should not `require` it
            // Perform customizations to webpack config
            // Important: return the modified config
            config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
            /*defaultLoaders.babel.options.presets = [[
                "next/babel",
                {
                    "preset-env": {},
                    "transform-runtime": {},
                    "styled-jsx": {},
                    "class-properties": {},
                    "preset-react": { "pragma": "nativeEvents" },
                }
            ]];*/
            config.module.rules.push({
                test: /\.svg$/,
                use: [
                  {
                    loader: "babel-loader",
                    options: {
                        presets: ["next/babel"]

                    }
                  },
                  {
                    loader: "react-svg-loader",
                    options: {
                      jsx: true // true outputs JSX tags
                    }
                  }
                ]
              });
            return config
        },
        webpackDevMiddleware: config => {
            // Perform customizations to webpack dev middleware config
            // Important: return the modified config
            return config
        },
    }
}