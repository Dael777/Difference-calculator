import yaml from 'js-yaml';
import ini from 'ini';

const extensions = [
  {
    name: '.json',
    parse: data => JSON.parse(data),
  },
  {
    name: '.yml',
    parse: data => yaml.safeLoad(data),
  },
  {
    name: '.ini',
    parse: data => ini.parse(data),
  },
];

export default (fileData, ext) => {
  const obj = extensions.find(({ name }) => name === ext);
  return obj.parse(fileData);
};
