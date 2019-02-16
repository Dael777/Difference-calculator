#!/usr/bin/env node
import program from 'commander';
import buildAst from '../buildast';
import gendiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(buildAst(firstConfig, secondConfig)));
  });

program.parse(process.argv);
