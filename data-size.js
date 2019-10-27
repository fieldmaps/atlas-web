const fs = require('fs');

const destPath = 'static/data/';

const getFilesizeInBytes = name => fs.statSync(destPath + name + '.json').size;
const sumNumbers = (acc, cur) => acc + cur;

const fileSizes = [
  getFilesizeInBytes('admin0'),
  getFilesizeInBytes('admin1'),
  getFilesizeInBytes('admin2'),
  getFilesizeInBytes('camps'),
  getFilesizeInBytes('lakes'),
  getFilesizeInBytes('marshlands'),
  getFilesizeInBytes('parks'),
  getFilesizeInBytes('rivers'),
  getFilesizeInBytes('roads'),
  getFilesizeInBytes('settlements'),
  getFilesizeInBytes('undArea'),
];

const totalSize = fileSizes.reduce(sumNumbers, 0);

fs.writeFileSync('data-total-json.ts', `export default ${totalSize};\n`);
