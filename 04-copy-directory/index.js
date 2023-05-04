const fs = require('fs').promises;
const path = require('path');

const sourcePath = path.join(__dirname, 'files');
const targetPath = path.join(__dirname, 'files-copy');

async function copyDir(source, target) {
  await fs.mkdir(target, { recursive: true });

  const files = await fs.readdir(source);

  for (const file of files) {
    const filePath = path.join(source, file);
    const targetFilePath = path.join(target, file);
    const fileStat = await fs.stat(filePath);

    if (fileStat.isDirectory()) {
      await copyDir(filePath, targetFilePath);
    } else {
      await fs.copyFile(filePath, targetFilePath);
    }
  }

}

copyDir(sourcePath, targetPath);

