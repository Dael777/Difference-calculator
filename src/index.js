import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const currentPath = process.cwd();

const checkPath = filePath => ((filePath.includes(currentPath)) ? filePath : `${currentPath}${filePath}`);

const compareFiles = (firstFile, secondFile) => {
  const allKeys = _.union(Object.keys(firstFile), Object.keys(secondFile));
  const filesDifference = allKeys.map((elem) => {
    if (_.has(firstFile, elem)) {
      if (_.has(secondFile, elem)) {
        return (firstFile[elem] === secondFile[elem])
          ? `    ${elem}: ${firstFile[elem]}\n`
          : `  + ${elem}: ${secondFile[elem]}\n  - ${elem}: ${firstFile[elem]}\n`;
      }
      return `  - ${elem}: ${firstFile[elem]}\n`;
    }
    return `  + ${elem}: ${secondFile[elem]}\n`;
  });
  return `{\n${filesDifference.join('')}}`;
};

const getJsonContent = fullPath => JSON.parse(fs.readFileSync(fullPath));

export default (pathToFile1, pathToFile2) => {
  const fullPathToFile1 = checkPath(path.normalize(`/${pathToFile1}`));
  const fullPathToFile2 = checkPath(path.normalize(`/${pathToFile2}`));

  if (fs.statSync(fullPathToFile1).size === 0) {
    return compareFiles({}, getJsonContent(fullPathToFile2));
  }

  if (fs.statSync(fullPathToFile2).size === 0) {
    return compareFiles(getJsonContent(fullPathToFile1), {});
  }

  return compareFiles(getJsonContent(fullPathToFile1), getJsonContent(fullPathToFile2));
};
