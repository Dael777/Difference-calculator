import _ from 'lodash';

const renderDefault = (astData, depth = 0) => {
  const buildValue = (value) => {
    if (_.isObject(value)) {
      return `{\n${Object.keys(value).map(key => `${' '.repeat(depth + 8)}${key}: ${value[key]}`)}\n${' '.repeat(depth + 4)}}`;
    }
    return value;
  };
  const result = `{\n${astData.map((elem) => {
    const indent = ' '.repeat(depth + 2);
    switch (elem.type) {
      case 'added': return `${indent}+ ${elem.name}: ${buildValue(elem.newValue)}`;
      case 'updated': return `${indent}- ${elem.name}: ${buildValue(elem.oldValue)}\n${indent}+ ${elem.name}: ${buildValue(elem.newValue)}`;
      case 'removed': return `${indent}- ${elem.name}: ${buildValue(elem.oldValue)}`;
      case 'same': return `${indent}  ${elem.name}: ${buildValue(elem.newValue)}`;
      default: return `${indent}  ${elem.name}: ${renderDefault(elem.children, depth + 4)}`;
    }
  }).join('\n')}\n${' '.repeat(depth)}}`;
  return result;
};

export default renderDefault;
