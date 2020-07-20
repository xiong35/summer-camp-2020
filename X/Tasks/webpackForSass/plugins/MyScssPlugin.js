class MyScssPlugin {
  apply(compiler) {
    compiler.plugin("emit", (compilation, callback) => {
      const asset = compilation.assets;
      console.log(asset["css/main.css"].source());
      callback();
    });
  }
}

module.exports = MyScssPlugin;
