const { readData } = require('../utils/fileHelper');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function exportRoadmap() {
  const data = readData();
  let md = `# 📦 Product Roadmap\n\n`;

  data.sprints.forEach(sprint => {
    md += `## ${sprint.name}\n\n`;
    md += `| Feature | Status | Priority | Owner |\n`;
    md += `|---------|--------|----------|-------|\n`;

    sprint.features.forEach(f => {
      md += `| ${f.title} | ${f.status} | ${f.priority} | ${f.owner} |\n`;
    });

    md += `\n`;
  });

  const outputPath = path.join(process.cwd(), 'ROADMAP.md');
  fs.writeFileSync(outputPath, md);
  console.log(chalk.green(`✅ Roadmap exported to ROADMAP.md`));
}

module.exports = { exportRoadmap };