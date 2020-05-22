module.exports = {
    runtimeCompiler: true, 
    // options...
    publicPath: '/',
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
        }
    },
    configureWebpack: {
        output: {
          filename: '[name].js',
          chunkFilename: '[name].js'
        }
      }
}