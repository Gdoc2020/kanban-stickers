const fs = require('fs');
const path = require('path');

function validateProjectJson(json) {
  const parsed = JSON.parse(json);
  if (!Array.isArray(parsed.boards) || !parsed.boards.length) throw new Error('Invalid Kanban Stickers project');
  return parsed;
}

function writeProjectFile(filePath, json) {
  validateProjectJson(json);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, json, 'utf8');
  return filePath;
}

function readProjectFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const json = fs.readFileSync(filePath, 'utf8');
  validateProjectJson(json);
  return json;
}

module.exports = { readProjectFile, validateProjectJson, writeProjectFile };
