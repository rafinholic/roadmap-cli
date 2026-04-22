const { readData } = require('../utils/fileHelper');
const chalk = require('chalk');

const statusColor = {
  'planned':     chalk.gray,
  'in-progress': chalk.yellow,
  'done':        chalk.green,
  'blocked':     chalk.red
};

function listFeatures(sprintId) {
  const data = readData();
  const sprints = sprintId
    ? data.sprints.filter(s => s.id === sprintId)
    : data.sprints;

  sprints.forEach(sprint => {
    console.log(chalk.bold.blue(`\n📦 ${sprint.name} (${sprint.id})`));
    sprint.features.forEach(f => {
      const color = statusColor[f.status] || chalk.white;
      console.log(color(`  [${f.status.toUpperCase()}] ${f.title} — ${f.priority} | ${f.owner}`));
    });
  });
}

module.exports = { listFeatures }; 