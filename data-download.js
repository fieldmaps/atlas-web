require('dotenv').config();

const https = require('https');
const fs = require('fs');

const id = process.env.S3_FOLDER;

const srcPath = `https://data.fieldmaps.io/atlas-2/${id}/`;
const destPath = 'static/data/';

const downloadFile = name => {
  const file = fs.createWriteStream(destPath + name + '.geojson');
  https.get(srcPath + name + '.geojson', response => response.pipe(file));
};

if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
downloadFile('admin0');
downloadFile('admin1');
downloadFile('admin2');
downloadFile('admin3');
downloadFile('admin4');
downloadFile('airports');
downloadFile('education-facilities');
downloadFile('financial-services');
downloadFile('health-facilities');
downloadFile('lakes');
downloadFile('protected-areas');
downloadFile('railways');
downloadFile('rivers');
downloadFile('roads');
downloadFile('sea-ports');
downloadFile('settlements');
downloadFile('undetermined-areas');
