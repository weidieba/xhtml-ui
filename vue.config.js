// vue.config.js
const path = require('path');
module.exports = {
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
        // 增加 保存自动进行eslintfix
        config.module
            .rule('eslint')
            .use('eslint-loader')
            .loader('eslint-loader')
            .tap(options => {
                options.fix = true;
                return options;
            });
    },
    css: {
        // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。
        // extract: false,
        sourceMap: false,
        requireModuleExtension: true
    },
    configureWebpack: {
        resolve: {
            alias: {
            // 键必须以斜线开始和结束
                '/@/': path.resolve(__dirname, './src')
            }
        }
    }

};
