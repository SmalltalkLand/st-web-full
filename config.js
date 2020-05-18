let ModuleFederationPlugin;
try{ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");}catch(err){};
module.exports = (phase, { defaultConfig }) => {
  let browser;
  try{
    window;
    browser = true;
  }catch(err){
    browser = false;
  }
    return {
        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            // Note: we provide webpack above so you should not `require` it
            // Perform customizations to webpack config
            // Important: return the modified config
            let b;
            let devExMode = dev && browser && window.devEx;
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
            b = {
              loader: "babel-loader",
              options: {
                  presets: ["next/babel"]

              }
            };
            config.module.rules.push({
                test: /\.svg$/,
                use: [b,
                  {
                    loader: "react-svg-loader",
                    options: {
                      jsx: true // true outputs JSX tags
                    }
                  }
                ]
              });
              let mfo;
            if(!devExMode && ModuleFederationPlugin)config.plugins.push(Object.assign(new ModuleFederationPlugin(mfo = {
              name: 'base',
              library: { type: 'var', name: 'st__base__exposes'},
              filename: 'remoteEntry.js',
              shared: ['react', 'react-dom','ramda','rxjs','rxjs/operators'],
              exposes: {
                API: './apih.js',
                capture: './capture.js'
              }
          }),{options: mfo}));
          config.module.rules.push({
            test: /\.coffee$/,
            use: [{loader: 'coffee-loader'},b]

          });
          config.externals = (config.externals || []).concat([/*require('webpack-require-http')*/]);
          /*config.module.rules.push({
            test: /\.(js|ts|svg|coffee)$/,
          exclude: /*{and: [*///*(node_modules|(\.next))//*,{not: /(@use-it)/}]}*/ /*,
          /*  enforce: 'post',
            use: { loader: 'obfuscator-loader', options: {
              domainLock: ['localhost:3000','.st.co'],
              target: 'browser-no-eval',
              selfDefending: true,
              sourceMap: true,
            } }
          })*/
            return config
        },
        webpackDevMiddleware: config => {
            // Perform customizations to webpack dev middleware config
            // Important: return the modified config
            return config
        },
    }
}