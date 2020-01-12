const fs = require('fs');

const destPath = 'static/data/';

const getFilesizeInBytes = name =>
  fs.statSync(destPath + name + '.geojson').size;
const sumNumbers = (acc, cur) => acc + cur;

const fileSizes = [
  getFilesizeInBytes('admin0'),
  getFilesizeInBytes('admin1'),
  getFilesizeInBytes('admin2'),
  getFilesizeInBytes('admin3'),
  getFilesizeInBytes('admin4'),
  getFilesizeInBytes('airports'),
  getFilesizeInBytes('education-facilities'),
  getFilesizeInBytes('financial-services'),
  getFilesizeInBytes('health-facilities'),
  getFilesizeInBytes('lakes'),
  getFilesizeInBytes('protected-areas'),
  getFilesizeInBytes('railways'),
  getFilesizeInBytes('rivers'),
  getFilesizeInBytes('roads'),
  getFilesizeInBytes('sea-ports'),
  getFilesizeInBytes('settlements'),
  getFilesizeInBytes('undetermined-areas'),
];

const totalSize = fileSizes.reduce(sumNumbers, 0);

fs.writeFileSync('data-total-json.ts', `export default ${totalSize};\n`);
