import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const extensions = [
  {
    name: '.json',
    parse: filePath => JSON.parse(fs.readFileSync(filePath)),
  },
  {
    name: '.yml',
    parse: filePath => yaml.safeLoad(fs.readFileSync(filePath)),
  },
];

export default (fullPath) => {
  const ext = path.extname(fullPath);
  const obj = extensions.find(({ name }) => name === ext);
  return obj.parse(fullPath);
};
