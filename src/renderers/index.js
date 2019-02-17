import renderDefault from './default';
import renderPlain from './plain';
import renderJson from './json';

const outputChoose = {
  default: renderDefault,
  plain: renderPlain,
  json: renderJson,
};

export default outputChoose;
