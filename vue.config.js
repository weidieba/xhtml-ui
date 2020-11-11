// vue.config.js
const path = require('path')
module.exports = {
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
    },
    css: {
        // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。
        // extract: false,
        sourceMap: false,
        requireModuleExtension: true
    }
}