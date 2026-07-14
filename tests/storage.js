const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { readProjectFile, writeProjectFile } = require('../electron/storage');

const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'kanban-stickers-storage-'));
const filePath = path.join(directory, 'kanban-stickers-autosave.json');

try {
  const initial = { activeBoardId: 'board-1', users: [], boards: [{ id: 'board-1', title: 'Persistent board', columns: [], cards: [] }] };
  writeProjectFile(filePath, JSON.stringify(initial));
  assert.deepStrictEqual(JSON.parse(readProjectFile(filePath)), initial, 'Saved project was not restored unchanged');

  initial.boards[0].cards.push({ id: 'card-1', title: 'Survives restart' });
  writeProjectFile(filePath, JSON.stringify(initial));
  assert.strictEqual(JSON.parse(readProjectFile(filePath)).boards[0].cards[0].title, 'Survives restart', 'Updated project was not persisted');
  assert.throws(() => writeProjectFile(filePath, '{"boards":[]}'), /Invalid Kanban Stickers project/, 'Invalid project data was accepted');

  console.log('PERSISTENCE_OK');
} finally {
  fs.rmSync(directory, { recursive: true, force: true });
}
