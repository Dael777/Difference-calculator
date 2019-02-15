import yaml from 'js-yaml';
import ini from 'ini';

const extensions = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (data, ext) => extensions[ext](data);
