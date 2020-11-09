const buildDirectory = './dist/browser/';

var fs = require('fs');
var files = fs.readdirSync(buildDirectory);
let katexPattern = /\bKaTeX.+(.ttf|.woff|woff2)/;
let fontPattern = /(Main-Regular|Math-Italic|Size1-Regular|Size2-Regular)/;
for(let i = 0 ; i < files.length ; i++){
  if(files[i].match(katexPattern)) {
    if(!files[i].match(fontPattern)){
      fs.unlinkSync(buildDirectory + files[i]);
      console.log('deleting unused font file : ' + files[i]);
    }
  }
}

fs.renameSync(buildDirectory + 'CHANGELOG.md', buildDirectory + 'CHANGELOG_3.2.0.md');
