import keysModel from './keys.js';
let isCaps = false;
let cursor = 0;

// language
let lang;

const getLangLocalStarage = () => {
  if (localStorage.getItem('lang', lang)) {
    lang = localStorage.getItem('lang', lang);
  } else {
    lang = 'en';
  }
};

const setLangLocalStarage = () => {
  localStorage.setItem('lang', lang);
};

// get cursor position
function getCarPos(item) {
  if (item.selectionStart) return item.selectionStart;
  if (document.selection) {
    let sel = document.selection.createRange();
    let clone = sel.duplicate();
    return clone.text.length;
  }
  return 0;
}

// set cursor position
function setCursor() {
  const TA = document.getElementById('textarea');
  cursor = getCarPos(TA);
}

// ShiftKey and Caps
function specialShift(t1, t2) {
  const keysChanged = [...document.querySelectorAll('.caps-shift-changed')];
  const keysNotChanged = [...document.querySelectorAll('.caps-shift-not-changed')];
  const keysSpecial = [...document.querySelectorAll('.caps-shift-special')];
  keysNotChanged.forEach(number => {
    let keyInModel = keysModel.find(item => item.id === number.id);
    let newKey = number;
    newKey.textContent = keyInModel[lang][t1];
  });
  keysChanged.forEach(number => {
    let keyInModel = keysModel.find(item => item.id === number.id);
    let newKey = number;
    newKey.textContent = keyInModel[lang][t2];
  });
  keysSpecial.forEach(number => {
    let keyInModel = keysModel.find(item => item.id === number.id);
    let newKey = number;
    newKey.textContent = lang === 'ru' ? keyInModel[lang][t1] : keyInModel[lang][t2];
  });
}

function regularShift(t) {
  const keys = [...document.querySelectorAll('.key')];
  keys.forEach(key => {
    let keyInModel = keysModel.find(item => item.id === key.id);
    let newKey = key;
    newKey.textContent = keyInModel[lang][t];
  });
}

function regularCaps() {
  const keys = [...document.querySelectorAll('.key')];
  const caps = document.getElementById('CapsLock');
  isCaps = !isCaps;
  if (isCaps) {
    caps.classList.add('active');
  } else {
    caps.classList.remove('active');
  }
  keys.forEach(key => {
    let keyInModel = keysModel.find(item => item.id === key.id);
    let newKey = key;
    newKey.textContent = isCaps ? keyInModel[lang].textCaps : keyInModel[lang].text;
  });
}

// clicking
function clickKey(inner, textarea, numberOfSimbols, content) {
  inner.splice(cursor, numberOfSimbols, content);
  let newInner = inner.join('');
  const TA = textarea;
  TA.innerHTML = newInner;
  cursor += 1;
}

function clickKeyboard(event) {
  if (!event.target.classList.contains('key')) {
    return;
  }

  const textarea = document.getElementById('textarea');
  let inner = textarea.innerHTML.split('');
  const allKeys = [...document.querySelectorAll('.key')];
  const keyPressed = allKeys.find(item => item.id === event.target.id);

  if (event.target.classList.contains('e-key')) {
    clickKey(inner, textarea, 0, keyPressed.textContent);
  } else if (event.target.classList.contains('e-code')) {
    if (keyPressed.id === 'Tab') {
      clickKey(inner, textarea, 0, '    ');
    }
    if (keyPressed.id === 'Backspace') {
      inner.splice(cursor - 1, 1);
      let newInner = inner.join('');
      textarea.innerHTML = newInner;
      cursor -= 1;
    }
    if (keyPressed.id === 'Delete') {
      inner.splice(cursor, 1);
      let newInner = inner.join('');
      textarea.innerHTML = newInner;
    }
    if (keyPressed.id === 'Enter') {
      clickKey(inner, textarea, 0, '\n');
    }
    if (keyPressed.id === 'CapsLock') {
      regularCaps();
      // const keys = [...document.querySelectorAll('.key')];
      // const caps = document.getElementById('CapsLock');
      // isCaps = !isCaps;
      // if (isCaps) {
      //   caps.classList.add('active');
      // } else {
      //   caps.classList.remove('active');
      // }
      // keys.forEach(key => {
      //   let keyInModel = keysModel.find(item => item.id === key.id);
      //   let newKey = key;
      //   newKey.textContent = isCaps ? keyInModel[lang].textCaps : keyInModel[lang].text;
      // });
    }
  }
}

function mouseDownShift(event) {
  if (event.target.id === 'ShiftRight' || event.target.id === 'ShiftLeft') {
    if (!isCaps) {
      regularShift('textShift');
    } else {
      specialShift('text', 'textShift');
    }
  }
}

function mouseUpShift(event) {
  if (event.target.id === 'ShiftRight' || event.target.id === 'ShiftLeft') {
    if (!isCaps) {
      regularShift('text');
    } else {
      specialShift('textShift', 'text');
    }
  }
}

// creating
function createKey(i) {
  const div = document.createElement('DIV');
  div.id = keysModel[i].id;
  div.textContent = keysModel[i][lang].text;
  keysModel[i].classes.forEach(item => div.classList.add(item));
  return div;
}

function create() {
  const wrapper = document.createElement('DIV');
  wrapper.classList.add('wrapper');

  const content = document.createElement('DIV');
  content.classList.add('content');

  const h1 = document.createElement('H1');
  h1.classList.add('title');
  h1.textContent = 'Virtual Keyboard';

  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  textarea.setAttribute('id', 'textarea');
  textarea.setAttribute('name', 'textarea');
  textarea.setAttribute('cols', '50');
  textarea.setAttribute('rows', '5');

  const main = document.createElement('MAIN');
  main.classList.add('keyboard');
  main.id = 'keyboard';

  let row;
  for (let i = 0; i < keysModel.length; i += 1) {
    if (i === 0) {
      row = document.createElement('DIV');
      row.classList.add('keyboard-row');
    }

    if (i !== 0 && keysModel[i].row !== keysModel[i - 1].row) {
      main.append(row);
      row = null;
      row = document.createElement('DIV');
      row.classList.add('keyboard-row');
    }

    let key = createKey(i);
    row.append(key);

    if (i === keysModel.length - 1) {
      main.append(row);
    }
  }

  const footer = document.createElement('FOOTER');
  footer.classList.add('footer');

  const p1 = document.createElement('P');
  p1.classList.add('text');
  p1.textContent = 'Клавиатура создана в операционной системе Windows';

  const p2 = document.createElement('P');
  p2.classList.add('text');
  p2.textContent = 'Для переключения языка нажмите: левыe shift + alt';

  content.append(h1);
  content.append(textarea);
  content.append(main);
  content.append(footer);
  footer.append(p1);
  footer.append(p2);
  wrapper.append(content);
  document.body.prepend(wrapper);

  main.addEventListener('click', clickKeyboard);
  main.addEventListener('mousedown', mouseDownShift);
  main.addEventListener('mouseup', mouseUpShift);
  textarea.addEventListener('blur', setCursor);
}

function loader() {
  getLangLocalStarage();
  create();
}

window.addEventListener('beforeunload', setLangLocalStarage);
window.addEventListener('load', loader);

// keypress
function pressKeyboard(event) {
  const key = document.getElementById(event.code);
  key.classList.add('active');
  const textarea = document.getElementById('textarea');

  if (event.altKey && event.shiftKey) {
    lang = lang === 'en' ? 'ru' : 'en';
    const key1 = document.getElementById('AltLeft');
    key1.classList.add('active');
    const key2 = document.getElementById('ShiftLeft');
    key2.classList.add('active');
    return;
  }

  if (event.code === 'CapsLock') {
    regularCaps();
    // const allKeys = [...document.querySelectorAll('.key')];
    // isCaps = !isCaps;
    // if (isCaps) {
    //   key.classList.add('active');
    // } else {
    //   key.classList.remove('active');
    // }
    // allKeys.forEach(number => {
    //   let keyInModel = keysModel.find(item => item.id === number.id);
    //   let newKey = number;
    //   newKey.textContent = isCaps ? keyInModel[lang].textCaps : keyInModel[lang].text;
    // });
    return;
  }

  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && !event.altKey) {
    if (!isCaps) {
      regularShift('textShift');
    } else {
      specialShift('text', 'textShift');
    }
    return;
  }

  setCursor();

  if (event.code === 'Enter') {
    textarea.innerHTML += '\n';
    return;
  }

  if (event.code === 'Backspace') {
    let inner = textarea.innerHTML.split('');
    inner.pop();
    let newInner = inner.join('');
    textarea.innerHTML = newInner;
    return;
  }

  if (event.code === 'Tab') {
    textarea.innerHTML += '    ';
    return;
  }

  if (event.code === 'Delete' || event.ctrlKey || (event.altKey && !event.shiftKey)) {
    return;
  }

  const keyInModel = keysModel.find(item => item.id === event.code);
  if (keyInModel) {
    if (event.shiftKey) {
      textarea.innerHTML += keyInModel[lang].textShift;
    } else {
      textarea.innerHTML += isCaps ? keyInModel[lang].textCaps : keyInModel[lang].text;
    }
  }
}

function deleteClass(event) {
  if (event.code === 'CapsLock') {
    return;
  }
  const key = document.getElementById(event.code);
  key.classList.remove('active');

  if (event.altKey && event.shiftKey) {
    const key1 = document.getElementById('AltLeft');
    key1.classList.remove('active');
    const key2 = document.getElementById('ShiftLeft');
    key2.classList.remove('active');
    const wrapper = document.getElementById('wrapper');
    wrapper.remove();
    create();
    return;
  }

  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
    if (!isCaps) {
      regularShift('text');
    } else {
      specialShift('textShift', 'text');
    }
  }
}

document.body.addEventListener('keydown', pressKeyboard);
document.body.addEventListener('keyup', deleteClass);
