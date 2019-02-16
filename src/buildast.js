import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';

const currentPath = process.cwd();

const buildAst = (data1 = {}, data2 = {}) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const dataDiff = allKeys.reduce((acc, elem) => {
    const astElem = {
      name: '',
      value: '',
      modified: '',
      children: [],
    };
    astElem.name = elem;
    if (!_.has(data1, elem)) {
      astElem.value = data2[elem];
      astElem.modified = '+';
    } else if (!_.has(data2, elem)) {
      astElem.value = data1[elem];
      astElem.modified = '-';
    } else if (data1[elem] instanceof Object && data2[elem] instanceof Object) {
      astElem.children = buildAst(data1[elem], data2[elem]);
    } else if (data1[elem] === data2[elem]) {
      astElem.value = data1[elem];
    } else {
      astElem.value = data1[elem];
      astElem.modified = '-';
      const newAstElem = Object.assign({}, astElem);
      newAstElem.value = data2[elem];
      newAstElem.modified = '+';
      const diffBlock = [astElem, newAstElem];
      return [...acc, ...diffBlock];
    }
    return [...acc, astElem];
  }, []);
  return dataDiff;
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

  return buildAst(parsedFile1, parsedFile2);
};
