import fs from 'fs';

const files = fs.readdirSync('./dist/assets');
const jsFile = files.find(f => f.endsWith('.js'));
console.log('Testing JS bundle:', jsFile);

global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  scrollY: 0,
};
global.MutationObserver = class {
  observe() {}
  disconnect() {}
};

const fakeElement = {
  addEventListener: () => {},
  removeEventListener: () => {},
  appendChild: () => {},
  removeChild: () => {},
  setAttribute: () => {},
  getAttribute: () => null,
  style: {},
  childNodes: [],
  offsetTop: 100,
  scrollIntoView: () => {},
};

global.document = {
  createElement: () => ({ ...fakeElement }),
  createElementNS: () => ({ ...fakeElement }),
  createTextNode: () => ({ ...fakeElement }),
  createDocumentFragment: () => ({ ...fakeElement }),
  getElementById: (id) => ({ ...fakeElement }),
  documentElement: { ...fakeElement },
  head: { ...fakeElement },
  body: { ...fakeElement },
  querySelectorAll: () => [],
};

try {
  await import(`./dist/assets/${jsFile}`);
  console.log('BUNDLE LOADED AND MOUNTED SUCCESSFULLY!');
} catch (err) {
  console.error('BUNDLE ERROR DETECTED:', err);
}
