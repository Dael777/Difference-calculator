import _ from 'lodash';

const renderJson = (astData) => {
  const iter = (data, parent) => {
    const filtered = data.filter(elem => elem.type !== 'same');
    const result = filtered.map((elem) => {
      switch (elem.type) {
        case 'added': return { [`${parent}${elem.name}`]: 'added', value: elem.newValue };
        case 'removed': return { [`${parent}${elem.name}`]: 'removed' };
        case 'updated': return { [`${parent}${elem.name}`]: 'updated', oldValue: elem.oldValue, value: elem.newValue };
        default: return iter(elem.children, `${parent}${elem.name}.`);
      }
    });
    return result;
  };
  return JSON.stringify(_.flattenDeep(iter(astData, '')));
};

export default renderJson;
