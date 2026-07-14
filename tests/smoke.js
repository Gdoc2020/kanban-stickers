const { app, BrowserWindow } = require('electron');
const path = require('path');
const os = require('os');

app.setPath('userData', path.join(os.tmpdir(), `kanban-stickers-test-${Date.now()}`));
app.commandLine.appendSwitch('disable-gpu');

async function run() {
  const window = new BrowserWindow({ show: false, webPreferences: { contextIsolation: true, nodeIntegration: false } });
  await window.loadFile(path.join(__dirname, '..', 'src', 'index.html'));
  const result = await window.webContents.executeJavaScript(`(async () => {
    const wait = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));
    const assert = (condition, message) => { if (!condition) throw new Error(message); };
    assert(document.querySelectorAll('.column').length === 3, 'Initial columns were not rendered');
    assert(document.querySelectorAll('.card').length === 2, 'Seed cards were not rendered');
    assert(document.documentElement.lang === 'en' && document.querySelector('#new-board').textContent.includes('New board'), 'English is not the default language');
    assert(document.querySelector('.card').textContent.includes('Welcome to Kanban Stickers'), 'Seed cards are not in English');

    const language = document.querySelector('#language-select');
    language.value = 'en'; language.dispatchEvent(new Event('change', { bubbles: true })); await wait();
    assert(document.querySelector('#new-board').textContent.includes('New board'), 'English translation failed');
    assert(document.querySelector('[data-i18n-label="columnLabel"]').firstChild.nodeValue === 'Task status', 'English form translation failed');
    language.value = 'tr'; language.dispatchEvent(new Event('change', { bubbles: true })); await wait();
    assert(document.querySelector('#new-board').textContent.includes('Yeni pano'), 'Turkish translation failed');
    language.value = 'ru'; language.dispatchEvent(new Event('change', { bubbles: true })); await wait();

    document.querySelector('#open-settings').click(); await wait();
    document.querySelector('#add-user').click();
    document.querySelector('#user-name').value = 'Alex Tester';
    document.querySelector('#user-email').value = 'alex@example.com';
    document.querySelector('#user-color').value = '#3366cc';
    document.querySelector('#user-form').requestSubmit(); await wait();
    assert(document.querySelector('#users-list').textContent.includes('alex@example.com'), 'User creation with email failed');
    document.querySelector('#settings-dialog').close();

    document.querySelector('#add-card').click();
    document.querySelector('#card-title').value = 'Тестовая карточка';
    document.querySelector('#card-description').value = 'Описание & проверка <XML>';
    document.querySelector('#card-priority').value = 'high';
    document.querySelector('#card-color').value = '#12ab89';
    document.querySelector('#card-assignee').value = state.data.users[0].id;
    document.querySelector('#card-flagged').checked = true;
    document.querySelector('#checklist-new').value = 'Критический пункт';
    document.querySelector('#checklist-add').click();
    document.querySelector('[data-check-flag]').click();
    document.querySelector('#card-form').requestSubmit(); await wait();
    assert(document.querySelectorAll('.card').length === 3, 'Card creation failed');
    const customCard = [...document.querySelectorAll('.card')].find((card) => card.textContent.includes('Тестовая карточка'));
    assert(customCard && customCard.getAttribute('style').includes('#12ab89'), 'Custom card color failed');
    assert(customCard.textContent.includes('alex@example.com'), 'Card assignment failed');
    assert(customCard.classList.contains('is-flagged') && customCard.textContent.includes('1'), 'Red flag or checklist summary failed');

    const sourceId = customCard.dataset.cardId;
    const target = document.querySelectorAll('.column')[1];
    const transfer = new DataTransfer(); transfer.setData('text/plain', sourceId);
    target.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: transfer })); await wait();
    assert(document.querySelectorAll('.column')[1].textContent.includes('Тестовая карточка'), 'Drag and drop failed');

    document.querySelector('#search').value = 'Тестовая';
    document.querySelector('#search').dispatchEvent(new Event('input', { bubbles: true })); await wait();
    assert(document.querySelectorAll('.card').length === 1, 'Search filter failed');
    document.querySelector('#search').value = '';
    document.querySelector('#search').dispatchEvent(new Event('input', { bubbles: true })); await wait();

    const xml = buildProjectXml(activeBoard());
    const parsed = new DOMParser().parseFromString(xml, 'application/xml');
    assert(!parsed.querySelector('parsererror'), 'Microsoft Project XML is malformed');
    assert(parsed.documentElement.namespaceURI === 'http://schemas.microsoft.com/project', 'Project XML namespace is wrong');
    assert(parsed.getElementsByTagNameNS('*', 'Task').length === 6, 'Project XML task hierarchy is incomplete');
    assert(parsed.getElementsByTagNameNS('*', 'Resource').length === 1, 'Project resource export failed');
    assert(parsed.getElementsByTagNameNS('*', 'Assignment').length === 1, 'Project assignment export failed');
    assert(xml.includes('alex@example.com'), 'Project resource email export failed');
    assert(xml.includes('<Priority>1000</Priority>') && xml.includes('Критический пункт'), 'Red flag checklist Project export failed');
    assert(xml.includes('&amp;') && xml.includes('&lt;XML&gt;'), 'Project XML text escaping failed');

    const beforeReload = JSON.parse(localStorage.getItem('kanban-stickers-data-v1'));
    assert(beforeReload.boards[0].cards.length === 3, 'Local persistence failed');
    return { columns: document.querySelectorAll('.column').length, cards: beforeReload.boards[0].cards.length, xmlTasks: parsed.getElementsByTagNameNS('*', 'Task').length };
  })()`);
  console.log(`SMOKE_OK ${JSON.stringify(result)}`);
  window.destroy();
  app.quit();
}

app.whenReady().then(run).catch((error) => {
  console.error(error.stack || error);
  app.exit(1);
});
