#!/usr/bin/env node

const program = require('commander');

const pushCategoryCommand = require('./commands/push-category.js');

program.version( '0.1.0' );

pushCategoryCommand(program);
program.parse( process.argv );

if ( !process.argv.slice( 2 ).length ) {
  program.outputHelp();
}
