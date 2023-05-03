const fs = require('fs');
const { readdir } = fs.promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function getFiles() {
  try {
    const files = await readdir(folderPath);
    for (const fileName of files) {
      const filePath = path.join(folderPath, fileName);

      fs.stat(filePath, (err, file) => {
        if (err) throw err;

        if (file.isFile()) {
          const fileSize = file.size;
          const fileSizeInKB = fileSize / 1024;
          const fileExtension = path.extname(fileName);
          const fileNameWithoutExt = path.basename(fileName, fileExtension);

          console.log(
            `${fileNameWithoutExt} - ${fileExtension.slice(
              1
            )} - ${fileSizeInKB} kb`
          );
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}
getFiles();