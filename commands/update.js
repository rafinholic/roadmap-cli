const { readData, writeData } = require('../utils/fileHelper');
const chalk = require('chalk');

const validStatuses = ['planned', 'in-progress', 'done', 'blocked'];

function updateStatus(featureId, newStatus) {
  if (!validStatuses.includes(newStatus)) {
    console.log(chalk.red(`❌ Invalid status. Use: ${validStatuses.join(', ')}`));
    return;
  }

  const data = readData();
  let found = false;

  data.sprints.forEach(sprint => {
    sprint.features.forEach(feature => {
      if (feature.id === featureId) {
        feature.status = newStatus;
        found = true;
      }
    });
  });

  if (!found) {
    console.log(chalk.red(`❌ Feature ${featureId} not found.`));
    return;
  }

  writeData(data);
  console.log(chalk.green(`✅ Feature ${featureId} updated to "${newStatus}"`));
}

module.exports = { updateStatus };