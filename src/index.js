const render = (astData, depth = 0) => {
  const buildModified = elem => ((elem.modified) ? `${elem.modified} ` : '  ');
  const buildContent = (elem) => {
    if (elem.value.toString()) {
      if (elem.value instanceof Object) {
        return `{\n${Object.keys(elem.value).map(key => `${' '.repeat(depth + 8)}${key}: ${elem.value[key]}`)}\n${' '.repeat(depth + 4)}}`;
      }
      return elem.value;
    }
    return `${render(elem.children, depth + 4)}`;
  };

  const result = `{\n${astData.map(elem => `${' '.repeat(depth + 2)}${buildModified(elem)}${elem.name}: ${buildContent(elem)}`).join('\n')}\n${' '.repeat(depth)}}`;

  return result;
};
export default render;
