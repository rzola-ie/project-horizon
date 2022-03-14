module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "./public/assets/styles/_variables.scss";
        `
      }
    }
  },
  devServer: {
    https: true,
  },

  chainWebpack: config => {
    config.module
      .rule('glslify')
      .test(/\.(glsl|vs|fs|vert|frag)$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
      .use('glslify-loader')
      .loader('glslify-loader')
      .end()
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['*.scss']
    }
  }
}
