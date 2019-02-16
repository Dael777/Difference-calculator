class RenderNormal {
  render(astData, depth = 0) {
    const buildModified = elem => ((elem.modified) ? `${elem.modified} ` : '  ');
    const buildContent = (elem) => {
      if (elem.value.toString()) {
        if (elem.value instanceof Object) {
          return `{\n${Object.keys(elem.value).map(key => `${' '.repeat(depth + 8)}${key}: ${elem.value[key]}`)}\n${' '.repeat(depth + 4)}}`;
        }
        return elem.value;
      }
      return `${this.render(elem.children, depth + 4)}`;
    };

    const result = `{\n${astData.map(elem => `${' '.repeat(depth + 2)}${buildModified(elem)}${elem.name}: ${buildContent(elem)}`).join('\n')}\n${' '.repeat(depth)}}`;

    return result;
  }
}

class RenderPlain {
  static render(astData) {
    console.log(astData);
  }
}

class Render {
  constructor(astData) {
    this.astData = astData;
    this.normal = new RenderNormal();
    this.plain = new RenderPlain();
  }

  renderNormal() {
    return this.normal.render(this.astData);
  }

  renderPlain() {
    return this.plain.render(this.astData);
  }
}

export default Render;
