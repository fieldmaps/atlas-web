require('dotenv').config();

const https = require('https');
const fs = require('fs');

const id = process.env.S3_FOLDER;
const bucket = 'fieldmaps-data';
const region = 'eu-central-1';

const srcPath = `https://s3-${region}.amazonaws.com/${bucket}/atlas/${id}/`;
const destPath = 'static/data/';

const downloadFile = name => {
  const file = fs.createWriteStream(destPath + name + '.json');
  https.get(srcPath + name + '.json', response => response.pipe(file));
};

if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
downloadFile('admin0');
downloadFile('admin1');
downloadFile('admin2');
downloadFile('camps');
downloadFile('lakes');
downloadFile('marshlands');
downloadFile('parks');
downloadFile('rivers');
downloadFile('roads');
downloadFile('settlements');
downloadFile('undArea');
