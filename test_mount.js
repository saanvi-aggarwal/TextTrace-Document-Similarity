import fs from 'fs';

const files = fs.readdirSync('./dist/assets');
const jsFile = files.find(f => f.endsWith('.js'));

global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  scrollY: 0,
};

global.MutationObserver = class {
  observe() {}
  disconnect() {}
};

class MockElement {
  constructor(tag = 'div') {
    this.tagName = tag.toUpperCase();
    this.nodeType = 1;
    this.style = {};
    this.childNodes = [];
    this.attributes = {};
  }
  addEventListener() {}
  removeEventListener() {}
  appendChild(child) {
    this.childNodes.push(child);
    return child;
  }
  removeChild(child) {
    const idx = this.childNodes.indexOf(child);
    if (idx !== -1) this.childNodes.splice(idx, 1);
    return child;
  }
  insertBefore(newChild, refChild) {
    this.childNodes.push(newChild);
    return newChild;
  }
  setAttribute(k, v) {
    this.attributes[k] = v;
  }
  getAttribute(k) {
    return this.attributes[k] || null;
  }
}

const rootDiv = new MockElement('div');
const head = new MockElement('head');
const body = new MockElement('body');

global.document = {
  createElement: (tag) => new MockElement(tag),
  createElementNS: (ns, tag) => new MockElement(tag),
  createTextNode: (text) => ({ nodeType: 3, nodeValue: text }),
  createDocumentFragment: () => new MockElement('fragment'),
  getElementById: (id) => (id === 'root' ? rootDiv : new MockElement('div')),
  documentElement: new MockElement('html'),
  head,
  body,
  querySelectorAll: () => [],
};

try {
  await import(`./dist/assets/${jsFile}`);
  console.log('>>> MOUNT SUCCESSFUL! Entire App rendered into root! <<<');
  console.log('Root children count:', rootDiv.childNodes.length);
} catch (err) {
  console.error('>>> MOUNT FAILED WITH ERROR:', err);
}

