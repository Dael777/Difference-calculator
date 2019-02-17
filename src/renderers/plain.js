import _ from 'lodash';

const renderPlain = (astData, parent = '') => {
  const buildValue = (value) => {
    if (typeof value === 'string') return `'${value}'`;
    if (_.isObject(value)) return '[complex value]';
    return value;
  };

  const filtered = astData.filter(elem => elem.type !== 'same');
  const result = filtered.map((elem) => {
    switch (elem.type) {
      case 'added': return `Property '${parent}${elem.name}' was added with value: ${buildValue(elem.newValue)}`;
      case 'updated': return `Property '${parent}${elem.name}' was updated. From ${buildValue(elem.oldValue)} to ${buildValue(elem.newValue)}`;
      case 'removed': return `Property '${parent}${elem.name}' was removed`;
      default: return renderPlain(elem.children, `${parent}${elem.name}.`);
    }
  });
  return _.flattenDeep(result).join('\n');
};

export default renderPlain;
