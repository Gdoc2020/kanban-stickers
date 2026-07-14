const STORAGE_KEY = 'kanban-stickers-data-v1';
const SETTINGS_KEY = 'kanban-stickers-settings-v1';

const I18N = {
  ru: {
    redFlagCard: 'Красный флаг — критический приоритет', checklistTitle: 'Пункты карточки', checklistPlaceholder: 'Добавить пункт', addItem: '＋ Добавить',
    newBoard: '＋ Новая доска', archive: '⌁ Архив', settings: '⚙ Настройки', search: 'Поиск', addCard: '＋ Карточка',
    filterAll: 'Все', filterImportant: 'Важные', filterDue: 'Со сроком', addColumn: '＋ Добавить колонку', language: 'Язык интерфейса',
    startWithWindows: 'Запускать вместе с Windows', trayHint: 'Приложение будет доступно в системном трее', exportData: 'Экспорт данных', importData: 'Импорт данных', exportProject: 'Microsoft Project XML',
    localOnly: 'Все карточки автоматически сохраняются только на этом компьютере.', cards: 'карточек', completed: 'завершено', emptyColumn: 'Перетащите карточку сюда', titleLabel: 'Название', descriptionLabel: 'Описание', columnLabel: 'Статус задачи', priorityLabel: 'Приоритет', dueLabel: 'Срок', colorLabel: 'Цвет карточки', assigneeLabel: 'Исполнитель', unassigned: 'Не назначен', usersTitle: 'Пользователи', addUser: '＋ Добавить', newUser: 'Новый пользователь', userName: 'Имя пользователя', emailLabel: 'Email', userColor: 'Цвет пользователя', duplicateEmail: 'Пользователь с таким email уже существует', deleteUser: 'Удалить пользователя и снять его со всех задач?', cardTitlePlaceholder: 'Что нужно сделать?', descriptionPlaceholder: 'Заметки и детали', priorityNormal: 'Обычный', priorityHigh: 'Важный', priorityLow: 'Низкий', cancel: 'Отмена', save: 'Сохранить', create: 'Создать', settingsTitle: 'Настройки', archiveTitle: 'Архив карточек',
    note: 'Заметка', newCard: 'Новая карточка', editCard: 'Изменить карточку', newBoardTitle: 'Новая доска', boardName: 'Название доски',
    newColumnTitle: 'Новая колонка', columnName: 'Название колонки', atLeastOne: 'На доске должна остаться хотя бы одна колонка', moveCardsFirst: 'Сначала переместите карточки из этой колонки',
    deleteColumn: 'Удалить пустую колонку?', archivedToast: 'Карточка перемещена в архив', pinned: 'Окно закреплено поверх остальных', unpinned: 'Закрепление отключено',
    desktopOnly: 'Функция доступна в настольной версии', backupSaved: 'Резервная копия сохранена', imported: 'Данные импортированы', importFailed: 'Не удалось прочитать файл резервной копии', projectExported: 'Файл Microsoft Project сохранён',
    archiveEmpty: 'Архив пока пуст', restore: 'Восстановить', deleteForever: 'Удалить навсегда?', todo: 'Запланировано', doing: 'В работе', done: 'Готово'
  },
  en: {
    redFlagCard: 'Red flag — critical priority', checklistTitle: 'Card checklist', checklistPlaceholder: 'Add an item', addItem: '＋ Add',
    newBoard: '＋ New board', archive: '⌁ Archive', settings: '⚙ Settings', search: 'Search', addCard: '＋ Card',
    filterAll: 'All', filterImportant: 'Important', filterDue: 'With due date', addColumn: '＋ Add column', language: 'Interface language',
    startWithWindows: 'Start with Windows', trayHint: 'The app will remain available in the system tray', exportData: 'Export data', importData: 'Import data', exportProject: 'Microsoft Project XML',
    localOnly: 'All cards are saved automatically on this computer only.', cards: 'cards', completed: 'completed', emptyColumn: 'Drag a card here', titleLabel: 'Title', descriptionLabel: 'Description', columnLabel: 'Task status', priorityLabel: 'Priority', dueLabel: 'Due date', colorLabel: 'Card color', assigneeLabel: 'Assignee', unassigned: 'Unassigned', usersTitle: 'Users', addUser: '＋ Add', newUser: 'New user', userName: 'User name', emailLabel: 'Email', userColor: 'User color', duplicateEmail: 'A user with this email already exists', deleteUser: 'Delete this user and unassign all their tasks?', cardTitlePlaceholder: 'What needs to be done?', descriptionPlaceholder: 'Notes and details', priorityNormal: 'Normal', priorityHigh: 'Important', priorityLow: 'Low', cancel: 'Cancel', save: 'Save', create: 'Create', settingsTitle: 'Settings', archiveTitle: 'Card archive',
    note: 'Note', newCard: 'New card', editCard: 'Edit card', newBoardTitle: 'New board', boardName: 'Board name', newColumnTitle: 'New column', columnName: 'Column name',
    atLeastOne: 'At least one column must remain', moveCardsFirst: 'Move the cards out of this column first', deleteColumn: 'Delete this empty column?', archivedToast: 'Card moved to archive',
    pinned: 'Window pinned above others', unpinned: 'Always on top disabled', desktopOnly: 'This feature is available in the desktop app', backupSaved: 'Backup saved', imported: 'Data imported',
    importFailed: 'Could not read the backup file', projectExported: 'Microsoft Project file saved', archiveEmpty: 'The archive is empty', restore: 'Restore', deleteForever: 'Delete this card permanently?', todo: 'Planned', doing: 'In progress', done: 'Done'
  },
  tr: {
    redFlagCard: 'Kırmızı bayrak — kritik öncelik', checklistTitle: 'Kart kontrol listesi', checklistPlaceholder: 'Madde ekle', addItem: '＋ Ekle',
    newBoard: '＋ Yeni pano', archive: '⌁ Arşiv', settings: '⚙ Ayarlar', search: 'Ara', addCard: '＋ Kart',
    filterAll: 'Tümü', filterImportant: 'Önemli', filterDue: 'Tarihli', addColumn: '＋ Sütun ekle', language: 'Arayüz dili',
    startWithWindows: 'Windows ile başlat', trayHint: 'Uygulama sistem tepsisinde kullanılabilir olacak', exportData: 'Verileri dışa aktar', importData: 'Verileri içe aktar', exportProject: 'Microsoft Project XML',
    localOnly: 'Tüm kartlar otomatik olarak yalnızca bu bilgisayarda saklanır.', cards: 'kart', completed: 'tamamlandı', emptyColumn: 'Kartı buraya sürükleyin', titleLabel: 'Başlık', descriptionLabel: 'Açıklama', columnLabel: 'Görev durumu', priorityLabel: 'Öncelik', dueLabel: 'Bitiş tarihi', colorLabel: 'Kart rengi', assigneeLabel: 'Sorumlu', unassigned: 'Atanmamış', usersTitle: 'Kullanıcılar', addUser: '＋ Ekle', newUser: 'Yeni kullanıcı', userName: 'Kullanıcı adı', emailLabel: 'Email', userColor: 'Kullanıcı rengi', duplicateEmail: 'Bu email ile bir kullanıcı zaten var', deleteUser: 'Kullanıcı silinsin ve tüm görev atamaları kaldırılsın mı?', cardTitlePlaceholder: 'Ne yapılması gerekiyor?', descriptionPlaceholder: 'Notlar ve ayrıntılar', priorityNormal: 'Normal', priorityHigh: 'Önemli', priorityLow: 'Düşük', cancel: 'İptal', save: 'Kaydet', create: 'Oluştur', settingsTitle: 'Ayarlar', archiveTitle: 'Kart arşivi',
    note: 'Not', newCard: 'Yeni kart', editCard: 'Kartı düzenle', newBoardTitle: 'Yeni pano', boardName: 'Pano adı', newColumnTitle: 'Yeni sütun', columnName: 'Sütun adı',
    atLeastOne: 'En az bir sütun kalmalıdır', moveCardsFirst: 'Önce kartları bu sütundan taşıyın', deleteColumn: 'Bu boş sütun silinsin mi?', archivedToast: 'Kart arşive taşındı',
    pinned: 'Pencere üste sabitlendi', unpinned: 'Üstte tutma kapatıldı', desktopOnly: 'Bu özellik masaüstü uygulamasında kullanılabilir', backupSaved: 'Yedek kaydedildi', imported: 'Veriler içe aktarıldı',
    importFailed: 'Yedek dosyası okunamadı', projectExported: 'Microsoft Project dosyası kaydedildi', archiveEmpty: 'Arşiv boş', restore: 'Geri yükle', deleteForever: 'Bu kart kalıcı olarak silinsin mi?', todo: 'Planlandı', doing: 'Devam ediyor', done: 'Tamamlandı'
  }
};

const uid = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const now = () => new Date().toISOString();
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

const seedData = () => {
  const columns = [
    { id: uid(), title: 'Planned' },
    { id: uid(), title: 'In progress' },
    { id: uid(), title: 'Done' }
  ];
  return {
    activeBoardId: null,
    users: [],
    boards: [{
      id: uid(),
      title: 'My first board',
      createdAt: now(),
      columns,
      cards: [
        { id: uid(), columnId: columns[0].id, title: 'Welcome to Kanban Stickers', description: 'Drag cards between statuses and click a card to edit its details.', priority: 'high', color: 'yellow', due: '', archived: false, createdAt: now() },
        { id: uid(), columnId: columns[1].id, title: 'Keep the board above other windows', description: 'Use the pin button in the top bar to keep Kanban Stickers visible while you work.', priority: 'normal', color: 'lavender', due: '', archived: false, createdAt: now() }
      ]
    }]
  };
};

function loadData() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed?.boards?.length) { parsed.users ||= []; return parsed; }
  } catch (_) { /* use defaults */ }
  const fresh = seedData();
  fresh.activeBoardId = fresh.boards[0].id;
  return fresh;
}

const state = {
  data: loadData(),
  filter: 'all',
  search: '',
  settings: { theme: 'light', language: 'en', ...(JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')) },
  textDialogAction: null,
  checklistDraft: []
};
state.data.users ||= [];

const $ = (selector) => document.querySelector(selector);
const els = {
  boardList: $('#board-list'), kanban: $('#kanban'), boardTitle: $('#board-title'), boardStats: $('#board-stats'),
  cardDialog: $('#card-dialog'), cardForm: $('#card-form'), textDialog: $('#text-dialog'), textForm: $('#text-form'),
  settingsDialog: $('#settings-dialog'), archiveDialog: $('#archive-dialog'), archiveList: $('#archive-list'), userDialog: $('#user-dialog'), userForm: $('#user-form'), usersList: $('#users-list'), toast: $('#toast')
};

const activeBoard = () => state.data.boards.find((board) => board.id === state.data.activeBoardId) || state.data.boards[0];
const t = (key) => (I18N[state.settings.language] || I18N.en)[key] || I18N.en[key] || key;

function applyTranslations() {
  document.documentElement.lang = state.settings.language;
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-label]').forEach((element) => { if (element.firstChild?.nodeType === Node.TEXT_NODE) element.firstChild.nodeValue = t(element.dataset.i18nLabel); });
  $('#language-select').value = state.settings.language;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => els.toast.classList.remove('show'), 2200);
}

function xmlEscape(value = '') {
  return String(value).replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char]);
}

function projectDate(value, hour = '09:00:00') {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return `${new Date().toISOString().slice(0, 10)}T${hour}`;
  return `${date.toISOString().slice(0, 10)}T${hour}`;
}

function buildProjectXml(board) {
  let uidValue = 1;
  let idValue = 1;
  const today = projectDate(null);
  const priorityMap = { high: 800, normal: 500, low: 300 };
  const tasks = [];
  const assignments = [];
  const assignedUsers = state.data.users.filter((user) => board.cards.some((card) => !card.archived && card.assigneeId === user.id));
  const resourceUids = new Map(assignedUsers.map((user, index) => [user.id, index + 1]));
  board.columns.forEach((column, columnIndex) => {
    const cards = board.cards.filter((card) => !card.archived && card.columnId === column.id);
    const starts = cards.map((card) => projectDate(card.createdAt)).sort();
    const finishes = cards.map((card) => projectDate(card.due || card.createdAt, '17:00:00')).sort();
    const percent = columnIndex === board.columns.length - 1 ? 100 : 0;
    tasks.push(`<Task><UID>${uidValue++}</UID><ID>${idValue++}</ID><Name>${xmlEscape(column.title)}</Name><Type>1</Type><IsNull>0</IsNull><CreateDate>${today}</CreateDate><WBS>${columnIndex + 1}</WBS><OutlineNumber>${columnIndex + 1}</OutlineNumber><OutlineLevel>1</OutlineLevel><Priority>500</Priority><Start>${starts[0] || today}</Start><Finish>${finishes.at(-1) || projectDate(null, '17:00:00')}</Finish><Summary>1</Summary><PercentComplete>${percent}</PercentComplete><PercentWorkComplete>${percent}</PercentWorkComplete></Task>`);
    cards.forEach((card, cardIndex) => {
      let start = projectDate(card.createdAt);
      const finish = projectDate(card.due || card.createdAt, '17:00:00');
      if (start > finish) start = `${finish.slice(0, 10)}T09:00:00`;
      const checklist = card.checklist || [];
      const checklistNotes = checklist.map((item) => `${item.flagged ? '🚩 ' : ''}${item.done ? '☑' : '☐'} ${item.text}`).join('\n');
      const notes = `${column.title}${card.description ? `\n\n${card.description}` : ''}${checklistNotes ? `\n\n${checklistNotes}` : ''}`;
      const hasRedFlag = card.flagged || checklist.some((item) => item.flagged && !item.done);
      const cardPercent = percent === 100 ? 100 : (checklist.length ? Math.round((checklist.filter((item) => item.done).length / checklist.length) * 100) : 0);
      const cardTaskUid = uidValue++;
      tasks.push(`<Task><UID>${cardTaskUid}</UID><ID>${idValue++}</ID><Name>${xmlEscape(card.title)}</Name><Type>1</Type><IsNull>0</IsNull><CreateDate>${projectDate(card.createdAt)}</CreateDate><Notes>${xmlEscape(notes)}</Notes><WBS>${columnIndex + 1}.${cardIndex + 1}</WBS><OutlineNumber>${columnIndex + 1}.${cardIndex + 1}</OutlineNumber><OutlineLevel>2</OutlineLevel><Priority>${hasRedFlag ? 1000 : (priorityMap[card.priority] || 500)}</Priority><Start>${start}</Start><Finish>${finish}</Finish><Duration>PT8H0M0S</Duration><DurationFormat>7</DurationFormat><Work>PT8H0M0S</Work><Summary>0</Summary><PercentComplete>${cardPercent}</PercentComplete><PercentWorkComplete>${cardPercent}</PercentWorkComplete></Task>`);
      if (resourceUids.has(card.assigneeId)) assignments.push({ taskUid: cardTaskUid, resourceUid: resourceUids.get(card.assigneeId), percent: cardPercent });
    });
  });
  const resourcesXml = assignedUsers.map((user, index) => {
    const initials = user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
    return `<Resource><UID>${index + 1}</UID><ID>${index + 1}</ID><Name>${xmlEscape(user.name)}</Name><Type>1</Type><IsNull>0</IsNull><Initials>${xmlEscape(initials)}</Initials><EmailAddress>${xmlEscape(user.email)}</EmailAddress><MaxUnits>1</MaxUnits></Resource>`;
  }).join('');
  const assignmentsXml = assignments.map((assignment, index) => `<Assignment><UID>${index + 1}</UID><TaskUID>${assignment.taskUid}</TaskUID><ResourceUID>${assignment.resourceUid}</ResourceUID><PercentWorkComplete>${assignment.percent}</PercentWorkComplete><Units>1</Units><Work>PT8H0M0S</Work></Assignment>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<Project xmlns="http://schemas.microsoft.com/project"><SaveVersion>12</SaveVersion><Name>${xmlEscape(board.title)}.xml</Name><Title>${xmlEscape(board.title)}</Title><ScheduleFromStart>1</ScheduleFromStart><StartDate>${today}</StartDate><MinutesPerDay>480</MinutesPerDay><MinutesPerWeek>2400</MinutesPerWeek><DaysPerMonth>20</DaysPerMonth><DefaultStartTime>09:00:00</DefaultStartTime><DefaultFinishTime>17:00:00</DefaultFinishTime><Tasks>${tasks.join('')}</Tasks><Resources>${resourcesXml}</Resources><Assignments>${assignmentsXml}</Assignments></Project>`;
}

function render() {
  if (!state.data.boards.some((board) => board.id === state.data.activeBoardId)) state.data.activeBoardId = state.data.boards[0]?.id;
  document.body.classList.toggle('dark', state.settings.theme === 'dark');
  applyTranslations();
  renderBoards();
  renderKanban();
  renderUsers();
  save();
}

function renderBoards() {
  els.boardList.innerHTML = state.data.boards.map((board) => {
    const count = board.cards.filter((card) => !card.archived).length;
    return `<button class="board-item ${board.id === state.data.activeBoardId ? 'active' : ''}" data-board-id="${board.id}">
      <span class="board-dot"></span><span>${escapeHtml(board.title)}</span><span class="board-count">${count}</span>
    </button>`;
  }).join('');
}

function renderUsers() {
  els.usersList.innerHTML = state.data.users.length ? state.data.users.map((user) => {
    const initials = user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
    return `<div class="user-row" data-user-id="${user.id}"><span class="user-avatar" style="--user-color:${user.color}">${escapeHtml(initials)}</span><span class="user-identity"><strong>${escapeHtml(user.name)}</strong><small class="user-email">${escapeHtml(user.email)}</small></span><button type="button" class="user-delete" data-delete-user="${user.id}" title="${t('deleteUser')}">×</button></div>`;
  }).join('') : `<div class="empty-column">${t('unassigned')}</div>`;
}

function filteredCards(board, columnId) {
  const query = state.search.trim().toLocaleLowerCase('ru');
  return board.cards.filter((card) => {
    if (card.archived || card.columnId !== columnId) return false;
    if (state.filter === 'high' && card.priority !== 'high') return false;
    if (state.filter === 'due' && !card.due) return false;
    if (query && !`${card.title} ${card.description}`.toLocaleLowerCase('ru').includes(query)) return false;
    return true;
  });
}

function renderKanban() {
  const board = activeBoard();
  if (!board) return;
  els.boardTitle.value = board.title;
  const activeCount = board.cards.filter((card) => !card.archived).length;
  const doneColumn = board.columns.at(-1);
  const doneCount = board.cards.filter((card) => !card.archived && card.columnId === doneColumn?.id).length;
  els.boardStats.textContent = `${activeCount} ${t('cards')} · ${doneCount} ${t('completed')}`;
  els.kanban.innerHTML = board.columns.map((column) => {
    const cards = filteredCards(board, column.id);
    return `<section class="column" data-column-id="${column.id}">
      <header class="column-header">
        <input class="column-name" data-column-title="${column.id}" value="${escapeHtml(column.title)}" maxlength="40">
        <span class="column-count">${cards.length}</span>
        <button class="column-menu" data-delete-column="${column.id}" title="Удалить колонку">···</button>
      </header>
      <div class="card-list" data-card-list="${column.id}">
        ${cards.length ? cards.map(cardHtml).join('') : `<div class="empty-column">${t('emptyColumn')}</div>`}
      </div>
    </section>`;
  }).join('');
  bindDragAndDrop();
}

function cardHtml(card) {
  const due = card.due ? new Date(`${card.due}T00:00:00`) : null;
  const overdue = due && due < new Date(new Date().toDateString());
  const dateText = due ? due.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) : '';
  const legacyColors = { yellow: '#fff1a8', mint: '#c9f3dc', blue: '#cde8ff', pink: '#ffd6e2', lavender: '#e3d9ff' };
  const cardColor = /^#[0-9a-f]{6}$/i.test(card.color) ? card.color : (legacyColors[card.color] || '#fff1a8');
  const assignee = state.data.users.find((user) => user.id === card.assigneeId);
  const checklist = card.checklist || [];
  const doneItems = checklist.filter((item) => item.done).length;
  const flaggedItems = checklist.filter((item) => item.flagged && !item.done).length;
  const isFlagged = card.flagged || flaggedItems > 0;
  return `<article class="card ${isFlagged ? 'is-flagged' : ''}" draggable="true" data-card-id="${card.id}" style="--card-color:${cardColor}">
    <div class="card-top">${isFlagged ? '<span class="red-flag">🚩</span>' : ''}<span class="priority ${card.priority}"></span><h3 class="card-title">${escapeHtml(card.title)}</h3></div>
    ${card.description ? `<p class="card-description">${escapeHtml(card.description)}</p>` : ''}
    <div class="card-footer">
      ${dateText ? `<span class="due ${overdue ? 'overdue' : ''}">◷ ${dateText}</span>` : `<span>${t('note')}</span>`}
      ${assignee ? `<span class="assignee-chip" title="${escapeHtml(assignee.email)}"><i class="assignee-dot" style="--assignee-color:${assignee.color}"></i>${escapeHtml(assignee.name)} <span class="assignee-email">· ${escapeHtml(assignee.email)}</span></span>` : ''}
      ${checklist.length ? `<span class="checklist-summary">☑ ${doneItems}/${checklist.length}</span>` : ''}
      ${flaggedItems ? `<span class="flag-count">🚩 ${flaggedItems}</span>` : ''}
      <span class="card-actions"><button class="card-action" data-archive-card="${card.id}" title="В архив">⌁</button></span>
    </div>
  </article>`;
}

function bindDragAndDrop() {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('dragstart', (event) => {
      card.classList.add('dragging');
      event.dataTransfer.setData('text/plain', card.dataset.cardId);
      event.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
  });
  document.querySelectorAll('.column').forEach((column) => {
    column.addEventListener('dragover', (event) => { event.preventDefault(); column.classList.add('drag-over'); });
    column.addEventListener('dragleave', () => column.classList.remove('drag-over'));
    column.addEventListener('drop', (event) => {
      event.preventDefault();
      column.classList.remove('drag-over');
      const card = activeBoard().cards.find((item) => item.id === event.dataTransfer.getData('text/plain'));
      if (card) { card.columnId = column.dataset.columnId; render(); }
    });
  });
}

function openCardDialog(card = null) {
  const board = activeBoard();
  $('#card-dialog-title').textContent = card ? t('editCard') : t('newCard');
  $('#card-id').value = card?.id || '';
  $('#card-title').value = card?.title || '';
  $('#card-description').value = card?.description || '';
  $('#card-priority').value = card?.priority || 'normal';
  $('#card-due').value = card?.due || '';
  const legacyColors = { yellow: '#fff1a8', mint: '#c9f3dc', blue: '#cde8ff', pink: '#ffd6e2', lavender: '#e3d9ff' };
  $('#card-color').value = /^#[0-9a-f]{6}$/i.test(card?.color || '') ? card.color : (legacyColors[card?.color] || '#fff1a8');
  $('#card-flagged').checked = Boolean(card?.flagged);
  state.checklistDraft = (card?.checklist || []).map((item) => ({ ...item }));
  renderChecklistEditor();
  $('#card-column').innerHTML = board.columns.map((column) => `<option value="${column.id}">${escapeHtml(column.title)}</option>`).join('');
  $('#card-column').value = card?.columnId || board.columns[0].id;
  $('#card-assignee').innerHTML = `<option value="">${t('unassigned')}</option>${state.data.users.map((user) => `<option value="${user.id}">${escapeHtml(user.name)} — ${escapeHtml(user.email)}</option>`).join('')}`;
  $('#card-assignee').value = card?.assigneeId || '';
  els.cardDialog.showModal();
  setTimeout(() => $('#card-title').focus(), 0);
}

function renderChecklistEditor() {
  $('#checklist-progress').textContent = `${state.checklistDraft.filter((item) => item.done).length}/${state.checklistDraft.length}`;
  $('#checklist-items').innerHTML = state.checklistDraft.map((item) => `<div class="checklist-row" data-checklist-id="${item.id}"><input type="checkbox" data-check-done="${item.id}" ${item.done ? 'checked' : ''}><input type="text" data-check-text="${item.id}" maxlength="180" value="${escapeHtml(item.text)}"><button type="button" class="item-flag ${item.flagged ? 'active' : ''}" data-check-flag="${item.id}" title="Red flag">🚩</button><button type="button" class="item-delete" data-check-delete="${item.id}">×</button></div>`).join('');
}

function openTextDialog({ title, label, value = '', action }) {
  $('#text-dialog-title').textContent = title;
  $('#text-dialog-label').childNodes[0].nodeValue = label;
  $('#text-dialog-input').value = value;
  state.textDialogAction = action;
  els.textDialog.showModal();
  setTimeout(() => $('#text-dialog-input').focus(), 0);
}

function archiveCard(cardId) {
  const card = activeBoard().cards.find((item) => item.id === cardId);
  if (card) { card.archived = true; card.archivedAt = now(); render(); toast('Карточка перемещена в архив'); }
}

function renderArchive() {
  const cards = activeBoard().cards.filter((card) => card.archived);
  els.archiveList.innerHTML = cards.length ? cards.map((card) => `<div class="archive-item"><span>${escapeHtml(card.title)}</span><button class="secondary-button" data-restore-card="${card.id}">${t('restore')}</button><button class="close-button" data-delete-card="${card.id}" title="${t('deleteForever')}">×</button></div>`).join('') : `<div class="empty-column">${t('archiveEmpty')}</div>`;
}

$('#new-board').addEventListener('click', () => openTextDialog({ title: t('newBoardTitle'), label: t('boardName'), action: (title) => {
  const columns = [{ id: uid(), title: t('todo') }, { id: uid(), title: t('doing') }, { id: uid(), title: t('done') }];
  const board = { id: uid(), title, createdAt: now(), columns, cards: [] };
  state.data.boards.push(board); state.data.activeBoardId = board.id; render();
} }));

$('#add-column').addEventListener('click', () => openTextDialog({ title: t('newColumnTitle'), label: t('columnName'), action: (title) => { activeBoard().columns.push({ id: uid(), title }); render(); } }));
$('#add-card').addEventListener('click', () => openCardDialog());

els.cardDialog.addEventListener('click', (event) => {
  if (!event.target.closest('[data-close-dialog]')) return;
  els.cardDialog.close('cancel');
});

els.boardList.addEventListener('click', (event) => {
  const item = event.target.closest('[data-board-id]');
  if (item) { state.data.activeBoardId = item.dataset.boardId; $('#sidebar').classList.remove('open'); render(); }
});

els.kanban.addEventListener('click', (event) => {
  const archive = event.target.closest('[data-archive-card]');
  if (archive) { event.stopPropagation(); archiveCard(archive.dataset.archiveCard); return; }
  const menu = event.target.closest('[data-delete-column]');
  if (menu) {
    const board = activeBoard();
    if (board.columns.length <= 1) return toast(t('atLeastOne'));
    const id = menu.dataset.deleteColumn;
    if (board.cards.some((card) => !card.archived && card.columnId === id)) return toast(t('moveCardsFirst'));
    if (confirm(t('deleteColumn'))) { board.columns = board.columns.filter((column) => column.id !== id); render(); }
    return;
  }
  const cardElement = event.target.closest('[data-card-id]');
  if (cardElement) openCardDialog(activeBoard().cards.find((card) => card.id === cardElement.dataset.cardId));
});

els.kanban.addEventListener('change', (event) => {
  const input = event.target.closest('[data-column-title]');
  if (input) { const column = activeBoard().columns.find((item) => item.id === input.dataset.columnTitle); if (column && input.value.trim()) { column.title = input.value.trim(); render(); } }
});

els.cardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const board = activeBoard();
  const id = $('#card-id').value;
  const values = { title: $('#card-title').value.trim(), description: $('#card-description').value.trim(), columnId: $('#card-column').value, priority: $('#card-priority').value, due: $('#card-due').value, color: $('#card-color').value, assigneeId: $('#card-assignee').value || null, flagged: $('#card-flagged').checked, checklist: state.checklistDraft.filter((item) => item.text.trim()).map((item) => ({ ...item, text: item.text.trim() })) };
  if (!values.title) return;
  const existing = board.cards.find((card) => card.id === id);
  if (existing) Object.assign(existing, values, { updatedAt: now() });
  else board.cards.push({ id: uid(), ...values, archived: false, createdAt: now() });
  els.cardDialog.close(); render();
});

$('#checklist-add').addEventListener('click', () => {
  const input = $('#checklist-new');
  const text = input.value.trim();
  if (!text) return;
  state.checklistDraft.push({ id: uid(), text, done: false, flagged: false });
  input.value = '';
  renderChecklistEditor();
  input.focus();
});

$('#checklist-new').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') { event.preventDefault(); $('#checklist-add').click(); }
});

$('#checklist-items').addEventListener('input', (event) => {
  const textInput = event.target.closest('[data-check-text]');
  if (textInput) { const item = state.checklistDraft.find((entry) => entry.id === textInput.dataset.checkText); if (item) item.text = textInput.value; }
});

$('#checklist-items').addEventListener('change', (event) => {
  const checkbox = event.target.closest('[data-check-done]');
  if (checkbox) { const item = state.checklistDraft.find((entry) => entry.id === checkbox.dataset.checkDone); if (item) item.done = checkbox.checked; renderChecklistEditor(); }
});

$('#checklist-items').addEventListener('click', (event) => {
  const flag = event.target.closest('[data-check-flag]');
  const remove = event.target.closest('[data-check-delete]');
  if (flag) { const item = state.checklistDraft.find((entry) => entry.id === flag.dataset.checkFlag); if (item) item.flagged = !item.flagged; renderChecklistEditor(); }
  if (remove) { state.checklistDraft = state.checklistDraft.filter((entry) => entry.id !== remove.dataset.checkDelete); renderChecklistEditor(); }
});

els.textForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = $('#text-dialog-input').value.trim();
  if (value && state.textDialogAction) state.textDialogAction(value);
  els.textDialog.close();
});

els.boardTitle.addEventListener('change', () => { if (els.boardTitle.value.trim()) { activeBoard().title = els.boardTitle.value.trim(); render(); } });
$('#search').addEventListener('input', (event) => { state.search = event.target.value; renderKanban(); });
document.querySelectorAll('.filter-chip').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter-chip').forEach((item) => item.classList.toggle('active', item === button));
  state.filter = button.dataset.filter; renderKanban();
}));

$('#theme-toggle').addEventListener('click', () => { state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark'; render(); });
$('#toggle-sidebar').addEventListener('click', () => $('#sidebar').classList.toggle('open'));

$('#pin-toggle').addEventListener('click', async () => {
  if (!window.desktop) return toast('Функция доступна в настольной версии');
  const enabled = await window.desktop.setAlwaysOnTop(!$('#pin-toggle').classList.contains('active'));
  $('#pin-toggle').classList.toggle('active', enabled);
  toast(enabled ? t('pinned') : t('unpinned'));
});

$('#open-settings').addEventListener('click', async () => {
  if (window.desktop) $('#startup-toggle').checked = await window.desktop.getLoginItem();
  renderUsers();
  els.settingsDialog.showModal();
});
$('#startup-toggle').addEventListener('change', async (event) => { if (window.desktop) event.target.checked = await window.desktop.setLoginItem(event.target.checked); });

$('#add-user').addEventListener('click', () => {
  $('#user-name').value = '';
  $('#user-email').value = '';
  $('#user-color').value = ['#6c5ce7', '#e05667', '#2a9d8f', '#e09f3e', '#457b9d'][state.data.users.length % 5];
  els.userDialog.showModal();
  setTimeout(() => $('#user-name').focus(), 0);
});

els.userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = $('#user-name').value.trim();
  const email = $('#user-email').value.trim().toLocaleLowerCase();
  if (!name || !email || !$('#user-email').checkValidity()) return;
  if (state.data.users.some((user) => user.email.toLocaleLowerCase() === email)) return toast(t('duplicateEmail'));
  state.data.users.push({ id: uid(), name, email, color: $('#user-color').value, createdAt: now() });
  els.userDialog.close();
  render();
});

els.usersList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-delete-user]');
  if (!button || !confirm(t('deleteUser'))) return;
  const userId = button.dataset.deleteUser;
  state.data.users = state.data.users.filter((user) => user.id !== userId);
  state.data.boards.forEach((board) => board.cards.forEach((card) => { if (card.assigneeId === userId) card.assigneeId = null; }));
  render();
});

$('#export-data').addEventListener('click', async () => {
  const ok = window.desktop ? await window.desktop.exportData(JSON.stringify(state.data, null, 2)) : false;
  if (ok) toast(t('backupSaved'));
});
$('#import-data').addEventListener('click', async () => {
  if (!window.desktop) return;
  try {
    const raw = await window.desktop.importData();
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!Array.isArray(data.boards) || !data.boards.length) throw new Error('invalid');
    state.data = data; els.settingsDialog.close(); render(); toast(t('imported'));
  } catch (_) { toast(t('importFailed')); }
});

$('#export-project').addEventListener('click', async () => {
  if (!window.desktop) return toast(t('desktopOnly'));
  const board = activeBoard();
  const ok = await window.desktop.exportProject(buildProjectXml(board), board.title);
  if (ok) toast(t('projectExported'));
});

$('#show-archive').addEventListener('click', () => { renderArchive(); els.archiveDialog.showModal(); });
$('#close-archive').addEventListener('click', () => els.archiveDialog.close());
els.archiveList.addEventListener('click', (event) => {
  const restore = event.target.closest('[data-restore-card]');
  const remove = event.target.closest('[data-delete-card]');
  if (restore) { const card = activeBoard().cards.find((item) => item.id === restore.dataset.restoreCard); card.archived = false; renderArchive(); render(); }
  if (remove && confirm(t('deleteForever'))) { activeBoard().cards = activeBoard().cards.filter((item) => item.id !== remove.dataset.deleteCard); renderArchive(); render(); }
});

$('#language-select').addEventListener('change', (event) => { state.settings.language = event.target.value; render(); renderArchive(); });

window.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'n') { event.preventDefault(); openCardDialog(); }
  if (event.key === 'Escape') $('#sidebar').classList.remove('open');
});

(async function init() {
  render();
  if (window.desktop) $('#pin-toggle').classList.toggle('active', await window.desktop.getAlwaysOnTop());
})();
