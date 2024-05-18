import path from 'path';
import utils from 'util';
import fs from 'fs';

const readFile = utils.promisify(fs.readFile);

async function getTemplateHtml(fullPath) {
  try {
    const invoicePath = path.resolve(fullPath);

    return await readFile(invoicePath, 'utf8');
  } catch (err) {
    return Promise.reject('Could not load html template');
  }
}

const convertImageToBase64URL = (filename, imageType = 'png') => {
  try {
    const buffer = fs.readFileSync(filename);
    const base64String = Buffer.from(buffer).toString('base64');
    return `data:image/${imageType};base64,${base64String}`;
  } catch (error) {
    throw new Error(`file ${filename} no exist ❌`);
  }
};

const getFile = {
  getTemplateHtml,
  convertImageToBase64URL
};

export default getFile;
