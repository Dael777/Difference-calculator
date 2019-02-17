import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import buildAst from './buildast';

const currentPath = process.cwd();

export default (pathToFile1, pathToFile2, outputType = 'normal') => {
  const fullPathToFile1 = path.resolve(currentPath, pathToFile1);
  const fullPathToFile2 = path.resolve(currentPath, pathToFile2);

  const file1Ext = path.extname(fullPathToFile1);
  const file2Ext = path.extname(fullPathToFile2);

  const file1Content = fs.readFileSync(fullPathToFile1, 'utf-8');
  const file2Content = fs.readFileSync(fullPathToFile2, 'utf-8');

  const parsedFile1 = parse(file1Content, file1Ext);
  const parsedFile2 = parse(file2Content, file2Ext);

  const ast = buildAst(parsedFile1, parsedFile2);

  const renderNormal = (astData, depth = 0) => {
    const buildModified = (value) => {
      switch (value) {
        case 'added': return '+ ';
        case 'removed': return '- ';
        default: return ' '.repeat(2);
      }
    };

    const buildValue = (value) => {
      if (value instanceof Object) {
        return `{\n${Object.keys(value).map(key => `${' '.repeat(depth + 8)}${key}: ${value[key]}`)}\n${' '.repeat(depth + 4)}}`;
      }
      return value;
    };

    const buildContent = (value, children) => {
      if (value.toString()) {
        return buildValue(value);
      }
      return `${renderNormal(children, depth + 4)}`;
    };

    const result = `{\n${astData.map((elem) => {
      const {
        name,
        value,
        modified,
        children,
      } = elem;

      if (value instanceof Array) {
        return `${' '.repeat(depth + 2)}- ${name}: ${buildValue(value[0])}\n${' '.repeat(depth + 2)}+ ${name}: ${buildValue(value[1])}`;
      }
      return `${' '.repeat(depth + 2)}${buildModified(modified)}${name}: ${buildContent(value, children)}`;
    }).join('\n')}\n${' '.repeat(depth)}}`;

    return result;
  };

  const renderPlain = (astData, parent = '') => {
    const outputValue = (value) => {
      if (typeof value === 'string') return `'${value}'`;
      if (value instanceof Object) return '[complex value]';
      return value;
    };

    const filtered = astData.filter(elem => elem.modified || elem.children.length > 0);
    const result = filtered.map((elem) => {
      if (elem.children.length > 0) {
        return renderPlain(elem.children, `${parent}${elem.name}.`);
      }
      switch (elem.modified) {
        case 'added': return `Property '${parent}${elem.name}' was added with value: ${outputValue(elem.value)}`;
        case 'removed': return `Property '${parent}${elem.name}' was removed`;
        case 'updated': return `Property '${parent}${elem.name}' was updated. From ${outputValue(elem.value[0])} to ${outputValue(elem.value[1])}`;
        default: return '';
      }
    });
    return _.flattenDeep(result).join('\n');
  };

  const outputChoose = {
    normal: renderNormal,
    plain: renderPlain,
  };

  return outputChoose[outputType](ast);
};
