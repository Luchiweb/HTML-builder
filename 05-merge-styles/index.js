const fsp = require('fs').promises;
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');
const bundlePath = path.join(distPath, 'bundle.css');

async function mergeStyles(stylesPath, bundlePath) {
  const files = await fsp.readdir(stylesPath);
  const cssFiles = files.filter((file) => path.extname(file) === '.css');

  const styles = [];

  for (const file of cssFiles) {
    const filePath = path.join(stylesPath, file);
    const css = await fsp.readFile(filePath, 'utf-8');

    styles.push(css);
  }

  await fsp.writeFile(bundlePath, styles.join('\n'));
}

mergeStyles(stylesPath, bundlePath);