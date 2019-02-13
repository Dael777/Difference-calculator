import fs from 'fs';
import gendiff from '../src';

describe('JSON files', () => {
  const filesPath = '/__tests__/__fixtures__/';
  const filesPathWithoutSlash = filesPath.substr(1);
  const emptyJson = `${filesPath}empty.json`;
  const firstJson = `${filesPath}before.json`;
  const firstJsonWithoutSlash = `${filesPathWithoutSlash}before.json`;
  const secondJson = `${filesPath}after.json`;
  const secondJsonWithoutSlash = `${filesPathWithoutSlash}after.json`;

  const data2 = fs.readFileSync(`.${filesPath}1.txt`, 'utf-8');
  it('JSON empty first file', () => {
    expect(gendiff(emptyJson, secondJson)).toBe(data2);
  });

  const data3 = fs.readFileSync(`.${filesPath}2.txt`, 'utf-8');
  it('JSON empty second file', () => {
    expect(gendiff(firstJson, emptyJson)).toBe(data3);
  });

  const data4 = fs.readFileSync(`.${filesPath}3.txt`, 'utf-8');
  it('JSON relative paths', () => {
    expect(gendiff(firstJson, secondJson)).toBe(data4);
  });

  it('JSON relative paths without slash', () => {
    expect(gendiff(firstJsonWithoutSlash, secondJsonWithoutSlash)).toBe(data4);
  });

  const emptyYaml = `${filesPath}empty.yml`;
  const firstYaml = `${filesPath}before.yml`;
  const secondYaml = `${filesPath}after.yml`;

  it('YAML empty first file', () => {
    expect(gendiff(emptyYaml, secondYaml)).toBe(data2);
  });

  it('YAML empty second file', () => {
    expect(gendiff(firstYaml, emptyYaml)).toBe(data3);
  });

  it('YAML relative paths', () => {
    expect(gendiff(firstYaml, secondYaml)).toBe(data4);
  });

  it('Different files extensions', () => {
    expect(gendiff(firstYaml, secondJson)).toBe(data4);
  });
});
