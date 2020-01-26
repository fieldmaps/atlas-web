const fs = require('fs');
const path = require('path');
const { csvParse } = require('d3-dsv');

const itemPath = path.resolve(path.join(__dirname, 'data.csv'));
const itemContents = fs.readFileSync(itemPath, 'utf8');
const items = csvParse(itemContents);

exports.createPages = async ({ actions }) => {
  items.forEach(item => {
    actions.createPage({
      path: 'maps/' + item.iso_3,
      component: require.resolve(`./src/templates/index.tsx`),
      context: {
        slug: item.iso_3,
        bounds: item.bounds_map.split(',').map(Number),
      },
    });
  });
};
