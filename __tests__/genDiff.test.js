import fs from 'fs';
import path from 'path';
import genDiff from '../src';
import buildAst from '../src/buildast';

describe('Files difference', () => {
  const filesPath = '__tests__/__fixtures__/';
  const emptyJson = path.join(filesPath, 'empty.json');
  const firstJson = path.join(filesPath, 'before.json');
  const secondJson = path.join(filesPath, 'after.json');
  const data1 = fs.readFileSync(path.resolve(filesPath, '1.txt'), 'utf-8');
  const data2 = fs.readFileSync(path.resolve(filesPath, '2.txt'), 'utf-8');
  const data3 = fs.readFileSync(path.resolve(filesPath, '3.txt'), 'utf-8');

  test.each([
    [emptyJson, secondJson, data1],
    [firstJson, emptyJson, data2],
    [firstJson, secondJson, data3],
  ])(
    'JSON genDiff(%s, %s)',
    (a, b, expected) => {
      expect(genDiff(buildAst(a, b))).toBe(expected);
    },
  );

  const emptyYaml = path.join(filesPath, 'empty.yml');
  const firstYaml = path.join(filesPath, 'before.yml');
  const secondYaml = path.join(filesPath, 'after.yml');

  test.each([
    [emptyYaml, secondYaml, data1],
    [firstYaml, emptyYaml, data2],
    [firstYaml, secondYaml, data3],
    [firstYaml, secondJson, data3],
  ])(
    'YAML genDiff(%s, %s)',
    (a, b, expected) => {
      expect(genDiff(buildAst(a, b))).toBe(expected);
    },
  );

  const emptyIni = path.join(filesPath, 'empty.ini');
  const firstIni = path.join(filesPath, 'before.ini');
  const secondIni = path.join(filesPath, 'after.ini');

  test.each([
    [emptyIni, secondIni, data1],
    [firstIni, emptyIni, data2],
    [firstIni, secondIni, data3],
    [firstIni, secondYaml, data3],
  ])(
    'YAML genDiff(%s, %s)',
    (a, b, expected) => {
      expect(genDiff(buildAst(a, b))).toBe(expected);
    },
  );

  const firstNestedJson = path.join(filesPath, 'before_nested.json');
  const secondNestedJson = path.join(filesPath, 'after_nested.json');
  const expectedNested = fs.readFileSync(path.resolve(filesPath, 'expected_nested.txt'), 'utf-8');

  test.each([
    [firstNestedJson, secondNestedJson, expectedNested],
  ])(
    'JSON nested genDiff(%s, %s)',
    (a, b, expected) => {
      expect(genDiff(buildAst(a, b))).toBe(expected);
    },
  );

  const firstNestedYaml = path.join(filesPath, 'before_nested.yml');
  const secondNestedYaml = path.join(filesPath, 'after_nested.yml');

  test.each([
    [firstNestedYaml, secondNestedYaml, expectedNested],
  ])(
    'YAML nested genDiff(%s, %s)',
    (a, b, expected) => {
      expect(genDiff(buildAst(a, b))).toBe(expected);
    },
  );

  const firstNestedIni = path.join(filesPath, 'before_nested.ini');
  const secondNestedIni = path.join(filesPath, 'after_nested.ini');

  test.each([
    [firstNestedIni, secondNestedIni, expectedNested],
  ])(
    'INI nested genDiff(%s, %s)',
    (a, b, expected) => {
      expect(genDiff(buildAst(a, b))).toBe(expected);
    },
  );

  test.each([
    [firstNestedIni, secondNestedYaml, expectedNested],
  ])(
    'Different files nested genDiff(%s, %s)',
    (a, b, expected) => {
      expect(genDiff(buildAst(a, b))).toBe(expected);
    },
  );
});
