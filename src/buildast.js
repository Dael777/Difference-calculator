import _ from 'lodash';

const buildAst = (data1 = {}, data2 = {}) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const dataDiff = allKeys.reduce((acc, elem) => {
    if (!_.has(data1, elem)) {
      return [...acc, {
        name: elem,
        value: data2[elem],
        modified: 'added',
        children: [],
      }];
    }
    if (!_.has(data2, elem)) {
      return [...acc, {
        name: elem,
        value: data1[elem],
        modified: 'removed',
        children: [],
      }];
    }
    if (data1[elem] instanceof Object && data2[elem] instanceof Object) {
      return [...acc, {
        name: elem,
        value: '',
        modified: '',
        children: buildAst(data1[elem], data2[elem]),
      }];
    }
    if (data1[elem] === data2[elem]) {
      return [...acc, {
        name: elem,
        value: data1[elem],
        modified: '',
        children: [],
      }];
    }
    return [...acc, {
      name: elem,
      value: [data1[elem], data2[elem]],
      modified: 'updated',
      children: [],
    }];
  }, []);
  return dataDiff;
};

export default buildAst;
