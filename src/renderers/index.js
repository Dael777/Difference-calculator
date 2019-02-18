import renderText from './text';
import renderPlain from './plain';
import renderJson from './json';

const outputChoose = {
  default: renderText,
  plain: renderPlain,
  json: renderJson,
};

export default outputChoose;
