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

    const boardScroller = document.querySelector('#kanban');
    assert(getComputedStyle(boardScroller).overflowX === 'scroll', 'Horizontal board scrollbar is not permanently available');
    assert(getComputedStyle(boardScroller).overflowY === 'scroll', 'Vertical board scrollbar is not permanently available');
    assert(boardScroller.scrollWidth > boardScroller.clientWidth, 'Board columns do not create a horizontally scrollable workspace');
    const tallMarker = document.createElement('div');
    tallMarker.style.height = '1200px';
    document.querySelector('.card-list').appendChild(tallMarker); await wait();
    assert(boardScroller.scrollHeight > boardScroller.clientHeight, 'Tall board content does not create vertical scrolling');
    boardScroller.scrollTop = 120;
    assert(boardScroller.scrollTop > 0, 'Board cannot scroll vertically');
    boardScroller.scrollTop = 0;
    boardScroller.scrollLeft = 0;
    const verticalWheel = new WheelEvent('wheel', { deltaY: 160, bubbles: true, cancelable: true });
    boardScroller.dispatchEvent(verticalWheel); await wait();
    assert(!verticalWheel.defaultPrevented && boardScroller.scrollLeft === 0, 'Normal mouse wheel was incorrectly redirected from vertical to horizontal scrolling');
    boardScroller.dispatchEvent(new WheelEvent('wheel', { deltaY: 160, shiftKey: true, bubbles: true, cancelable: true })); await wait();
    assert(boardScroller.scrollLeft > 0, 'Shift + mouse wheel did not scroll the board horizontally');
    tallMarker.remove();
    document.querySelector('#zoom-out').click(); await wait();
    assert(state.settings.boardZoom === 0.9 && document.querySelector('#zoom-reset').textContent === '90%', 'Board zoom out failed');
    document.querySelector('#zoom-reset').click(); await wait();
    assert(state.settings.boardZoom === 1 && document.querySelector('#zoom-reset').textContent === '100%', 'Board zoom reset failed');

    const columnsBeforeCancel = activeBoard().columns.length;
    document.querySelector('#add-column').click(); await wait();
    assert(document.querySelector('#text-dialog').open, 'New column dialog did not open');
    document.querySelector('#text-dialog .close-button').click(); await wait();
    assert(!document.querySelector('#text-dialog').open, 'New column dialog close button failed with an empty required name');
    assert(activeBoard().columns.length === columnsBeforeCancel, 'Closing the new column dialog changed the board');
    document.querySelector('#add-column').click(); await wait();
    document.querySelector('#text-dialog .modal-actions [data-close-dialog]').click(); await wait();
    assert(!document.querySelector('#text-dialog').open, 'New column dialog Cancel button failed with an empty required name');
    assert(activeBoard().columns.length === columnsBeforeCancel, 'Cancelling a new column changed the board');

    boardScroller.scrollLeft = 0;
    document.querySelector('#add-column').click();
    document.querySelector('#text-dialog-input').value = 'Temporary scroll test';
    document.querySelector('#text-form').requestSubmit(); await wait(400);
    assert(document.querySelectorAll('.column').length === 4, 'Add column failed');
    assert(boardScroller.scrollLeft > 0, 'The board did not reveal the newly added rightmost column');
    const temporaryColumn = activeBoard().columns.at(-1);
    const temporaryColumnInput = document.querySelector('[data-column-title="' + temporaryColumn.id + '"]');
    temporaryColumnInput.value = 'Renamed test column';
    temporaryColumnInput.dispatchEvent(new Event('input', { bubbles: true }));
    temporaryColumnInput.dispatchEvent(new Event('change', { bubbles: true })); await wait();
    assert(temporaryColumn.title === 'Renamed test column', 'Editing a column name did not update the board');
    const savedAfterRename = JSON.parse(localStorage.getItem('kanban-stickers-data-v1'));
    const savedBoardAfterRename = savedAfterRename.boards.find((board) => board.id === state.data.activeBoardId);
    assert(savedBoardAfterRename.columns.find((column) => column.id === temporaryColumn.id)?.title === 'Renamed test column', 'Edited column name was not persisted');
    render(); await wait();
    const persistedColumnInput = document.querySelector('[data-column-title="' + temporaryColumn.id + '"]');
    assert(persistedColumnInput.value === 'Renamed test column', 'Edited column name was lost after rendering');
    persistedColumnInput.focus();
    persistedColumnInput.value = 'Cancelled rename';
    persistedColumnInput.dispatchEvent(new Event('input', { bubbles: true }));
    persistedColumnInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })); await wait();
    assert(temporaryColumn.title === 'Renamed test column' && persistedColumnInput.value === 'Renamed test column', 'Escape did not cancel a column rename: title=' + temporaryColumn.title + ', value=' + persistedColumnInput.value + ', original=' + persistedColumnInput.dataset.originalTitle);
    activeBoard().columns.pop(); render(); await wait();

    const cardsBeforeCancel = document.querySelectorAll('.card').length;
    document.querySelector('#add-card').click(); await wait();
    assert(document.querySelector('#card-dialog').open, 'New card dialog did not open');
    document.querySelector('#card-dialog .close-button').click(); await wait();
    assert(!document.querySelector('#card-dialog').open, 'New card dialog close button failed with an empty required title');
    document.querySelector('#add-card').click(); await wait();
    document.querySelector('#card-dialog .modal-actions [data-close-dialog]').click(); await wait();
    assert(!document.querySelector('#card-dialog').open, 'New card dialog Cancel button failed with an empty required title');
    assert(document.querySelectorAll('.card').length === cardsBeforeCancel, 'Cancelling a new card changed the board');

    language.value = 'tr'; language.dispatchEvent(new Event('change', { bubbles: true })); await wait();
    assert(document.querySelector('#new-board').textContent.includes('Yeni pano'), 'Turkish translation failed');
    language.value = 'ru'; language.dispatchEvent(new Event('change', { bubbles: true })); await wait();

    const usersBeforeCancel = state.data.users.length;
    document.querySelector('#open-settings').click(); await wait();
    assert(document.querySelector('#settings-dialog').open, 'Settings dialog did not open');
    document.querySelector('#add-user').click(); await wait();
    assert(document.querySelector('#user-dialog').open, 'New user dialog did not open');
    document.querySelector('#user-dialog .close-button').click(); await wait();
    assert(!document.querySelector('#user-dialog').open, 'New user dialog close button failed with empty required fields');
    assert(state.data.users.length === usersBeforeCancel, 'Closing the new user dialog created a user');
    document.querySelector('#add-user').click(); await wait();
    document.querySelector('#user-dialog .modal-actions [data-close-dialog]').click(); await wait();
    assert(!document.querySelector('#user-dialog').open, 'New user dialog Cancel button failed with empty required fields');
    assert(state.data.users.length === usersBeforeCancel, 'Cancelling a new user created a user');
    document.querySelector('#add-user').click(); await wait();
    document.querySelector('#user-name').value = 'Alex Tester';
    document.querySelector('#user-email').value = 'alex@example.com';
    document.querySelector('#user-color').value = '#3366cc';
    document.querySelector('#user-form').requestSubmit(); await wait();
    assert(document.querySelector('#users-list').textContent.includes('alex@example.com'), 'User creation with email failed');
    document.querySelector('#settings-dialog .close-button').click(); await wait();
    assert(!document.querySelector('#settings-dialog').open, 'Settings dialog close button failed');

    document.querySelector('#show-archive').click(); await wait();
    assert(document.querySelector('#archive-dialog').open, 'Archive dialog did not open');
    document.querySelector('#archive-dialog .close-button').click(); await wait();
    assert(!document.querySelector('#archive-dialog').open, 'Archive dialog close button failed');

    document.querySelector('#add-card').click();
    document.querySelector('#card-title').value = 'Тестовая карточка';
    document.querySelector('#card-description').value = 'Описание & проверка <XML>';
    document.querySelector('#card-priority').value = 'high';
    document.querySelector('#card-color').value = '#12ab89';
    document.querySelector('#card-assignee').value = state.data.users[0].id;
    document.querySelector('#card-progress').value = '65';
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
    assert(customCard.textContent.includes('65%'), 'Explicit task completion percentage is missing from the card');
    assert(customCard.querySelector('.card-progress span')?.style.width === '65%', 'Task progress bar does not display 65%');
    customCard.click(); await wait();
    assert(document.querySelector('#card-progress').value === '65', 'Saved task completion percentage was not restored for editing');
    document.querySelector('#card-dialog .close-button').click(); await wait();

    const sourceId = customCard.dataset.cardId;
    const normalCard = activeBoard().cards.find((card) => card.priority === 'normal');
    normalCard.checklist = [{ id: crypto.randomUUID(), text: 'Flagged normal-priority item', done: false, flagged: true }];
    render();
    document.querySelector('[data-filter="high"]').click(); await wait();
    assert([...document.querySelectorAll('.card')].some((card) => card.textContent.includes('Keep the board above other windows')), 'Important filter omitted a normal-priority card with an active red-flag checklist item');
    assert(document.querySelectorAll('.card').length === 3, 'Important filter did not return all priority and red-flag cards');
    document.querySelector('[data-filter="all"]').click(); await wait();

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
    assert(parsed.getElementsByTagNameNS('*', 'Summary').length === 6 && [...parsed.getElementsByTagNameNS('*', 'Summary')].filter((item) => item.textContent === '1').length === 3, 'Project summary-task hierarchy is incomplete');
    assert([...parsed.getElementsByTagNameNS('*', 'OutlineLevel')].map((item) => item.textContent).join(',') === '1,2,1,2,2,1', 'Project outline hierarchy would not display as status groups and card subtasks');
    assert(xml.includes('alex@example.com'), 'Project resource email export failed');
    const exportedCardTitle = activeBoard().cards.find((card) => card.id === sourceId).title;
    const exportedCardTask = [...parsed.getElementsByTagNameNS('*', 'Task')].find((task) => task.getElementsByTagNameNS('*', 'Name')[0]?.textContent === exportedCardTitle);
    assert(exportedCardTask, 'Custom card is missing from the Microsoft Project export');
    assert(exportedCardTask.getElementsByTagNameNS('*', 'PercentComplete')[0]?.textContent === '65', 'Microsoft Project PercentComplete did not export 65%');
    assert(exportedCardTask.getElementsByTagNameNS('*', 'PercentWorkComplete')[0]?.textContent === '65', 'Microsoft Project PercentWorkComplete did not export 65%');
    const taskUids = new Set([...parsed.getElementsByTagNameNS('*', 'Task')].map((task) => task.getElementsByTagNameNS('*', 'UID')[0].textContent));
    const resourceUids = new Set([...parsed.getElementsByTagNameNS('*', 'Resource')].map((resource) => resource.getElementsByTagNameNS('*', 'UID')[0].textContent));
    assert([...parsed.getElementsByTagNameNS('*', 'Assignment')].every((assignment) => taskUids.has(assignment.getElementsByTagNameNS('*', 'TaskUID')[0].textContent) && resourceUids.has(assignment.getElementsByTagNameNS('*', 'ResourceUID')[0].textContent)), 'Project assignments reference missing tasks or resources');
    assert([...parsed.getElementsByTagNameNS('*', 'Assignment')].some((assignment) => assignment.getElementsByTagNameNS('*', 'TaskUID')[0]?.textContent === exportedCardTask.getElementsByTagNameNS('*', 'UID')[0]?.textContent && assignment.getElementsByTagNameNS('*', 'PercentWorkComplete')[0]?.textContent === '65'), 'Microsoft Project assignment did not export 65%');
    assert(xml.includes('<Priority>1000</Priority>') && xml.includes('Критический пункт'), 'Red flag checklist Project export failed');
    assert(xml.includes('&amp;') && xml.includes('&lt;XML&gt;'), 'Project XML text escaping failed');
    assert(xml.includes('<CurrencyCode>USD</CurrencyCode>'), 'Project XML is missing the schema-required currency code');
    assert(xml.indexOf('<CurrencyCode>') < xml.indexOf('<DefaultStartTime>'), 'Project currency code is not in Microsoft schema order');
    assert(xml.indexOf('<DefaultStartTime>') < xml.indexOf('<MinutesPerDay>'), 'Project-level elements are not in Microsoft schema order');
    assert(xml.indexOf('<PercentWorkComplete>') < xml.indexOf('<Notes>'), 'Task notes are not in Microsoft schema order');
    const unassignedBoard = { ...activeBoard(), cards: activeBoard().cards.map((card) => ({ ...card, assigneeId: null })) };
    const unassignedXml = buildProjectXml(unassignedBoard);
    assert(!unassignedXml.includes('<Resources>') && !unassignedXml.includes('<Assignments>'), 'Empty Project resource or assignment collections must be omitted');

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
