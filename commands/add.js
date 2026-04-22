const { readData, writeData } = require('../utils/fileHelper');
const chalk = require('chalk');

function addFeature(sprintId, title, priority, owner) {
  const data = readData();
  const sprint = data.sprints.find(s => s.id === sprintId);

  if (!sprint) {
    console.log(chalk.red(`❌ Sprint ${sprintId} not found.`));
    return;
  }

  const newFeature = {
    id: `F${Date.now()}`,
    title,
    status: 'planned',
    priority: priority || 'medium',
    owner: owner || 'unassigned'
  };

  sprint.features.push(newFeature);
  writeData(data);
  console.log(chalk.green(`✅ Feature "${title}" added to ${sprint.name}`));
}

module.exports = { addFeature };