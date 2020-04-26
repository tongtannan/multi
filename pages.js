const glob = require('glob');
const pages = {};
module.exports.pages = function() {
  glob.sync('./src/pages/*/main.js').forEach(filepath => {
    const fileList = filepath.split('/'); // [ '.', 'src', 'pages', 'first', 'main.js' ]
    const fileName = fileList[fileList.length - 2]; // first
    pages[fileName] = {
      entry: `src/pages/${fileName}/main.js`,
      template: 'public/index.html',
      filename: 'index.html',
      title: `${fileName} Page`,
      chunks: ['chunk-vendors', 'chunk-common', fileName]
    };
  });
  return pages;
};
// const pages = {
//   first: {
//     entry: 'src/pages/first/main.js',
//     template: 'public/index.html',
//     filename: 'index.html',
//     title: 'First Page',
//     chunks: ['chunk-vendors', 'chunk-common', 'first']
//   },
//   second: {
//     entry: 'src/pages/second/main.js',
//     template: 'public/index.html',
//     filename: 'index.html',
//     title: 'Second Page',
//     chunks: ['chunk-vendors', 'chunk-common', 'second']
//   }
// };
