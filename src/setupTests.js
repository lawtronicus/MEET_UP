// src/setupTests.js

import "@testing-library/jest-dom";

// Here, add portions of the warning messages you want to intentionally prevent from appearing
const MESSAGES_TO_IGNORE = [
  "When testing, code that causes React state updates should be wrapped into act(...):",
  "Error:",
  "The above error occurred",
];
// eslint-disable-next-line no-console
const originalError = console.error.bind(console.error);

// eslint-disable-next-line no-console
console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find((message) =>
    args.toString().includes(message),
  );
  if (!ignoreMessage) {
    originalError(...args);
  }
};

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
