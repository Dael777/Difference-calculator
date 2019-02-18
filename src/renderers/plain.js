import _ from 'lodash';

const buildValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';
  return value;
};

const renderPlain = (astData, parent = '') => {
  const filtered = astData.filter(elem => elem.type !== 'same');
  const result = filtered.map((elem) => {
    switch (elem.type) {
      case 'added': return `Property '${parent}${elem.name}' was added with value: ${buildValue(elem.newValue)}`;
      case 'updated': return `Property '${parent}${elem.name}' was updated. From ${buildValue(elem.oldValue)} to ${buildValue(elem.newValue)}`;
      case 'removed': return `Property '${parent}${elem.name}' was removed`;
      case 'nested': return renderPlain(elem.children, `${parent}${elem.name}.`);
      default: throw new Error('Undefined type');
    }
  });
  return _.flattenDeep(result).join('\n');
};

export default renderPlain;
