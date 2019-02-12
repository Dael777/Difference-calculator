import fs from 'fs';
import gendiff from '../src';

test('no args', () => {
  expect(gendiff('/__tests__/__fixtures__/empty.json')).toBeFalsy();
});

const data2 = fs.readFileSync('./__tests__/__fixtures__/2.txt', 'utf-8');
test('empty first file', () => {
  expect(gendiff('/__tests__/__fixtures__/empty.json', '/home/dael777/Public/Lessons/js/gendiff/__tests__/__fixtures__/after.json')).toBe(data2);
});

const data3 = fs.readFileSync('./__tests__/__fixtures__/3.txt', 'utf-8');
test('empty second file', () => {
  expect(gendiff('/home/dael777/Public/Lessons/js/gendiff/__tests__/__fixtures__/before.json', '/__tests__/__fixtures__/empty.json')).toBe(data3);
});

const data4 = fs.readFileSync('./__tests__/__fixtures__/4.txt', 'utf-8');
test('absolute paths', () => {
  expect(gendiff('/home/dael777/Public/Lessons/js/gendiff/__tests__/__fixtures__/before.json', '/home/dael777/Public/Lessons/js/gendiff/__tests__/__fixtures__/after.json')).toBe(data4);
});

const data5 = fs.readFileSync('./__tests__/__fixtures__/5.txt', 'utf-8');
test('relative paths', () => {
  expect(gendiff('/__tests__/__fixtures__/before.json', '/__tests__/__fixtures__/after.json')).toBe(data5);
});

test('relative paths without slash', () => {
  expect(gendiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(data5);
});
