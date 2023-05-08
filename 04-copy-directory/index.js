const fsp = require('fs').promises;
const path = require('path');

const sourcePath = path.join(__dirname, 'files');
const targetPath = path.join(__dirname, 'files-copy');

async function copyDir(source, target) {
  const isDirExist = await isDirectoryExist();
  if (isDirExist) await fsp.rm(target, { recursive: true });

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

async function isDirectoryExist(target) {
  try {
    await fsp.access(target);
    return true;
  } catch (err) {
    return false;
  }
}

copyDir(sourcePath, targetPath);

