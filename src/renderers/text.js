import _ from 'lodash';

const buildValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  return `{\n${Object.keys(value).map(key => `${' '.repeat(depth + 8)}${key}: ${value[key]}`)}\n${' '.repeat(depth + 4)}}`;
};

const renderText = (astData, depth = 0) => {
  const buildDiff = astData.map((elem) => {
    const indent = ' '.repeat(depth + 2);
    switch (elem.type) {
      case 'added': return `${indent}+ ${elem.name}: ${buildValue(elem.newValue, depth)}`;
      case 'updated': return [[`${indent}- ${elem.name}: ${buildValue(elem.oldValue, depth)}`], [`${indent}+ ${elem.name}: ${buildValue(elem.newValue, depth)}`]];
      case 'removed': return `${indent}- ${elem.name}: ${buildValue(elem.oldValue, depth)}`;
      case 'same': return `${indent}  ${elem.name}: ${buildValue(elem.newValue, depth)}`;
      case 'nested': return `${indent}  ${elem.name}: ${renderText(elem.children, depth + 4)}`;
      default: throw new Error('Undefined type');
    }
  });
  return _.concat(['{'], _.flatten(buildDiff).join('\n'), [`${' '.repeat(depth)}}`]).join('\n');
};

export default renderText;
