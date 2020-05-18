const { createServer, get: httpGet } = require('http')
let get;
try {  get  = require('https').get; } catch (err) { get = httpGet};
const { parse } = require('url')
const next = require('next')
const replacestream = require('replacestream');
const webpack = require('webpack');
const { resolve } = require('path');
const { createReadStream, ensure } = require('fs');
const { writeFile, readFile } = require('fs').promises;
const { fork } = require('child_process')
var passport = require('passport');
let OAuthStrategy = require('passport-oauth').OAuthStrategy;
let LocalStrategy = require('passport-local').Strategy;
var fsensure = require('fsensure');
let live = require('./live.js');
const { PassThrough } = require('stream');
/*passport.use('google', new OAuthStrategy({
    requestTokenURL: 'https://www.provider.com/oauth/request_token',
    accessTokenURL: 'https://www.provider.com/oauth/access_token',
    userAuthorizationURL: 'https://www.provider.com/oauth/authorize',
    consumerKey: '123-456-789',
    consumerSecret: 'shhh-its-a-secret'
    callbackURL: 'https://www.example.com/auth/provider/callback'
},
    function(token, tokenSecret, profile, done) {
        User.findOrCreate(..., function(err, user) {
            done(err, user);
        });
    }
));*/
passport.use('local',new LocalStrategy(
    async function(username, password, done) {
        let donem = false;
        while (!donem) {
            let passJS = `../data/users/${username}/passwordStrat/default.js`;
            try {
                require(passJS).auth(password, (...args) => {
                    done(...args);
                    donem = true;
                });
            } catch (err) {
                await new Promise((c, e) => {
                    fsensure.file.exists(passJS, function(err) {
                        if (err) { e(err); return; }
                        c();
                    });
                });
                await writeFile(passJS,`exports.auth = (pass,done) => pass === '${await readFile('../data/secrets/passSecret.txt')}' ? done(null,{}) : done(null,false,{message: 'Choose Change Password'})`)

            }
        }
    }
));

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
let passportH = (req,res) => new Promise((c,e) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return e(err); }
        if (!user) { return res.redirect(res.url); }
            if (err) { return e(err); }
            c(user);
    })(req, res, () => { });

});
let Myurl = 'localhost:3000';
let Extension = filename => filename.split('.').pop();
let loginRegexs = [];
app.prepare().then(() => {
    require('./chat/app.js');
    let s;
    let hebes;
    if (process.env.HEBES) {
        hebes = require(process.env.HEBES + '/server.js')
    };
    try{live.setup(async req => {
await passportH(req,new PassThrough());
return req
    })}catch(err){}
    (s = createServer(async (req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl;
        let user;
        if (loginRegexs.filter(r => r.match(req.url).length).length) {
            user = await passportH(req,res)

        }
        if (pathname.startsWith('/hebes/') && hebes) {
            req.url = req.url.replace('/hebes/', '');
            try {
                return hebes.server(req, res)
            } catch (err) {
                if(dev)console.log(err);

            }
        }
        if (pathname.startsWith('/proxy/')) {
            let nurl = pathname.replace('/proxy/', '');
            let v;
            do {
                try {
                    v = await new Promise(c => get(nurl, c));
                } catch (err) {
                    try {
                        v = await new Promise(c => httpGet(nurl, c));
                    } catch (err) {
                        let pnurl = parse(nurl, true);
                        if (nurl.startsWith('file://') && dev) v = Object.assign(createReadStream(pnurl.pathname, { encoding: 'utf-8' }), { headers: { 'Content-Type': `text/${Extension(pnurl.pathname)}; charset=utf-8`,}})

                    }
                }; if (v && v.headers && v.headers.location) nurl = v.headers.location;
            } while (v && v.headers && v.headers.location && v);
            res.writeHead(200, {
                "Content-Transfer-Encoding": "utf-8",
                'Content-Type': 'text/plain; charset=utf-8',
                ...v.headers,
            });
            v.pipe(replacestream('base', 'st-base')).pipe(replacestream('<head>', `<head><base href = "${Myurl + '/proxy/' + parse(nurl, true).hostname}"></base>`)).pipe(res);
            return;
        }
        handle(req, res, parsedUrl)
    }));
    const io = require('socket.io')(s);
    io.on('connection', client => {
        let servers = [];
        let id = Math.random();
        client.emit('setID', id);
        client.id = id;
        client.on('serve', data => {
            let server;
            io.on('connection', server = nc => {
                nc.on('connectID', _id => {
                    if (_id !== id) return;
                    nc.on('message', m => client.emit('message', { data: m, src: nc.id }))
                })
            })
            servers.push(server);
        });
        client.on('disconnect', () => {
            servers.forEach(s => {
                io.off('connection', s);
            })
        });
    })
    s.listen(3000, err => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    });
    let ex = webpack(require('./next.config.js')(null, { defaultConfig: {} }).webpack({
        entry: './CusbEx.js',
        output: {
            path: __dirname,
            filename: "index.ex.js"
        },
        plugins: [],
        module: {

            rules: [
                {
                    test: /\.jsx?$/,
                    // flags to apply these rules, even if they are overridden (advanced option)
                    loader: "babel-loader",
                    // the loader which should be applied, it'll be resolved relative to the context
                    options: {
                        presets: ["next/babel"]
                    },
                    // options for the loader
                },
            ]
        }
    }, {webpack}));
    ex.watch({
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => {

    });
})