const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const path = require("path");

const folders = [
    "components",
    "config",
    "helpers",
    "pages",
    "store",
    "validation",
    "API"
];

module.exports = withCss(withSass({
    webpack: (config) => {
        config.node = {
          fs: "empty"
        };
        folders.forEach(folder => {
            config.resolve.alias[folder] = path.join(__dirname ,"/src/",  folder);
        });
        return config;
    }
}));
