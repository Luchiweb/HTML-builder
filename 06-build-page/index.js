const fs = require('fs');
const path = require('path');

const fsp = fs.promises;

const assetsPath = path.join(__dirname, 'assets');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');

const distIndexPath = path.join(distPath, 'index.html');
const distStylePath = path.join(distPath, 'style.css');
const distAssetsPath = path.join(distPath, 'assets');

async function buildPage() {
  await fsp.mkdir(distPath, { recursive: true });

  const template = await fsp.readFile(templatePath, 'utf-8');
  const components = await fsp.readdir(componentsPath);

  let result = template;
  for (const component of components) {
    const componentName = path.parse(component).name;
    const componentPath = path.join(componentsPath, component);
    const content = await fsp.readFile(componentPath, 'utf-8');

    result = result.replace(`{{${componentName}}}`, content);
  }

  await fsp.writeFile(distIndexPath, result);
  await copyDir(assetsPath, distAssetsPath);
  await mergeStyles(stylesPath, distStylePath);
}

async function copyDir(source, target) {
  await fsp.mkdir(target, { recursive: true });
  const files = await fsp.readdir(source);

  for (const file of files) {
    const filePath = path.join(source, file);
    const targetFilePath = path.join(target, file);
    const fileStat = await fsp.stat(filePath);

    if (fileStat.isDirectory()) {
      await copyDir(filePath, targetFilePath);
    } else {
      await fsp.copyFile(filePath, targetFilePath);
    }
  }

}

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

buildPage();