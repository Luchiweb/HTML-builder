const fs = require('fs').promises;
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');
const bundlePath = path.join(distPath, 'bundle.css');

async function mergeStyles(stylesPath, bundlePath, distPath) {
  await fs.mkdir(distPath, { recursive: true });

  const files = await fs.readdir(stylesPath);
  const cssFiles = files.filter((file) => path.extname(file) === '.css');

  const styles = [];

  for (const file of cssFiles) {
    const filePath = path.join(stylesPath, file);
    const css = await fs.readFile(filePath, 'utf-8');

    styles.push(css);
  }

  await fs.writeFile(bundlePath, styles.join('\n'));
}

mergeStyles(stylesPath, bundlePath, distPath);