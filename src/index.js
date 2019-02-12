import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const currentPath = process.cwd();

const checkPath = filePath => ((filePath.includes(currentPath)) ? filePath : `${currentPath}${filePath}`);

export default (pathToFile1, pathToFile2) => {
  if (!pathToFile1 || !pathToFile2) return false;

  const fullPathToFile1 = checkPath(path.normalize(`/${pathToFile1}`));
  const fullPathToFile2 = checkPath(path.normalize(`/${pathToFile2}`));

  const compareFiles = (firstFile, secondFile) => {
    const firstFileCheck = Object.keys(firstFile).reduce((acc, elem) => {
      if (_.has(secondFile, elem)) {
        return (firstFile[elem] === secondFile[elem])
          ? `${acc}    ${elem}: ${firstFile[elem]}\n`
          : `${acc}  + ${elem}: ${secondFile[elem]}\n  - ${elem}: ${firstFile[elem]}\n`;
      }
      return `${acc}  - ${elem}: ${firstFile[elem]}\n`;
    }, '');

    const secondFileCheck = Object.keys(secondFile).reduce((acc, elem) => ((!_.has(firstFile, elem)) ? `${acc}  + ${elem}: ${secondFile[elem]}\n` : acc), firstFileCheck);

    return secondFileCheck;
  };

  if (fs.statSync(fullPathToFile1).size === 0) {
    return `{\n${compareFiles({}, JSON.parse(fs.readFileSync(fullPathToFile2)))}}`;
  }

  if (fs.statSync(fullPathToFile2).size === 0) {
    return `{\n${compareFiles(JSON.parse(fs.readFileSync(fullPathToFile1)), {})}}`;
  }

  return `{\n${compareFiles(JSON.parse(fs.readFileSync(fullPathToFile1)), JSON.parse(fs.readFileSync(fullPathToFile2)))}}`;
};
