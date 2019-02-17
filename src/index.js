import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getRenderer from './renderers';
import buildAst from './buildast';

const currentPath = process.cwd();

export default (pathToFile1, pathToFile2, renderType = 'default') => {
  const fullPathToFile1 = path.resolve(currentPath, pathToFile1);
  const fullPathToFile2 = path.resolve(currentPath, pathToFile2);

  const file1Ext = path.extname(fullPathToFile1);
  const file2Ext = path.extname(fullPathToFile2);

  const file1Content = fs.readFileSync(fullPathToFile1, 'utf-8');
  const file2Content = fs.readFileSync(fullPathToFile2, 'utf-8');

  const parsedFile1 = parse(file1Content, file1Ext);
  const parsedFile2 = parse(file2Content, file2Ext);

  const ast = buildAst(parsedFile1, parsedFile2);

  const renderer = getRenderer[renderType];
  return renderer(ast);
};
