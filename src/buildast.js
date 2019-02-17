import _ from 'lodash';

const buildAst = (data1 = {}, data2 = {}) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const dataDiff = allKeys.reduce((acc, elem) => {
    if (!_.has(data1, elem)) {
      return [...acc, {
        name: elem,
        oldValue: null,
        newValue: data2[elem],
        type: 'added',
      }];
    }
    if (!_.has(data2, elem)) {
      return [...acc, {
        name: elem,
        oldValue: data1[elem],
        newValue: null,
        type: 'removed',
      }];
    }
    if (data1[elem] instanceof Object && data2[elem] instanceof Object) {
      return [...acc, {
        name: elem,
        oldValue: null,
        newValue: null,
        type: 'nested',
        children: buildAst(data1[elem], data2[elem]),
      }];
    }
    if (data1[elem] === data2[elem]) {
      return [...acc, {
        name: elem,
        oldValue: data1[elem],
        newValue: data1[elem],
        type: 'same',
      }];
    }
    return [...acc, {
      name: elem,
      oldValue: data1[elem],
      newValue: data2[elem],
      type: 'updated',
    }];
  }, []);
  return dataDiff;
};

export default buildAst;
