#!/usr/bin/env node
const { Command } = require('commander');
const { addFeature } = require('./commands/add');
const { listFeatures } = require('./commands/list');
const { updateStatus } = require('./commands/update');
const { exportRoadmap } = require('./commands/export');

const program = new Command();

program
  .name('roadmap')
  .description('CLI tool to manage your product roadmap')
  .version('1.0.0');

program
  .command('add <sprintId> <title>')
  .description('Add a feature to a sprint')
  .option('-p, --priority <priority>', 'Priority level', 'medium')
  .option('-o, --owner <owner>', 'Owning team', 'unassigned')
  .action((sprintId, title, options) => {
    addFeature(sprintId, title, options.priority, options.owner);
  });

program
  .command('list [sprintId]')
  .description('List features, optionally filter by sprint')
  .action((sprintId) => listFeatures(sprintId));

program
  .command('update <featureId> <status>')
  .description('Update the status of a feature')
  .action((featureId, status) => updateStatus(featureId, status));

program
  .command('export')
  .description('Export roadmap to ROADMAP.md')
  .action(() => exportRoadmap());

program.parse(process.argv);