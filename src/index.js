import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';

const currentPath = process.cwd();

const genFilesDiff = (firstFile = {}, secondFile = {}) => {
  const allKeys = _.union(Object.keys(firstFile), Object.keys(secondFile));
  const filesDifference = allKeys.map((elem) => {
    if (_.has(firstFile, elem)) {
      if (_.has(secondFile, elem)) {
        if (firstFile[elem] === secondFile[elem]) {
          return `    ${elem}: ${firstFile[elem]}`;
        }
        return _.concat([`  + ${elem}: ${secondFile[elem]}`], [`  - ${elem}: ${firstFile[elem]}`]).join('\n');
      }
      return `  - ${elem}: ${firstFile[elem]}`;
    }
    return `  + ${elem}: ${secondFile[elem]}`;
  });
  return _.concat('{', filesDifference, '}').join('\n');
};

export default (pathToFile1, pathToFile2) => {
  const fullPathToFile1 = path.resolve(currentPath, pathToFile1);
  const fullPathToFile2 = path.resolve(currentPath, pathToFile2);

  const file1Ext = path.extname(fullPathToFile1);
  const file2Ext = path.extname(fullPathToFile2);

  const file1Content = fs.readFileSync(fullPathToFile1, 'utf-8');
  const file2Content = fs.readFileSync(fullPathToFile2, 'utf-8');

  const parsedFile1 = parse(file1Content, file1Ext);
  const parsedFile2 = parse(file2Content, file2Ext);

  return genFilesDiff(parsedFile1, parsedFile2);
};
