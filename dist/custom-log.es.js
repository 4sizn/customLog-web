var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const customLog = {
  run: false,
  monkeyConsole: {},
  options: {
    timestamp: false
  },
  message: function(fn) {
    var _a, _b;
    let que = [];
    let styleQue = [];
    ((_a = customLog.options) == null ? void 0 : _a.timestamp) && que.push(setTimeStamp());
    ((_b = customLog.options) == null ? void 0 : _b.prefix) && que.push(setPrefixLog(String(customLog.options.prefix), (style) => styleQue.push(style), customLog.options.style));
    return function(opts) {
      (opts == null ? void 0 : opts.prefix) && que.push(setPrefixLog(String(opts.prefix), (style) => styleQue.push(style), opts.style));
      return function() {
        fn.apply(console, [`${que.join("")}`, ...styleQue].concat(...arguments));
      };
    };
    function setTimeStamp() {
      return `[${new Date().toLocaleString()}] `;
    }
    function setPrefixLog(prefix, cb, style) {
      if (style) {
        cb(style);
        return `%c${prefix}`;
      } else {
        return `[${prefix}]`;
      }
    }
  },
  init: (options = { timestamp: false }) => {
    customLog.monkeyConsole = __spreadValues({}, console);
    customLog.options = options;
    for (let key of Object.keys(customLog.monkeyConsole)) {
      if (isConsoleProperty(key)) {
        window.console[key] = customLog.message(customLog.monkeyConsole[key])(options[key]);
      }
    }
    for (let key of Object.keys(options)) {
      if (isConsoleProperty(key)) {
        window.console[key] = customLog.message(customLog.monkeyConsole[key])(options[key]);
      }
    }
    customLog.run = true;
    if (options == null ? void 0 : options.hello) {
      customLog.message(customLog.monkeyConsole.log)(options.hello)();
    }
    function isConsoleProperty(key) {
      return customLog.monkeyConsole.hasOwnProperty(`${key}`);
    }
  },
  end: () => {
    var _a, _b;
    if (!customLog.run) {
      throw Error("run int() first...");
    }
    if ((_a = customLog.options) == null ? void 0 : _a.bye) {
      customLog.message(customLog.monkeyConsole.log)((_b = customLog.options) == null ? void 0 : _b.bye)();
    }
    window.console = customLog.monkeyConsole;
  }
};
export { customLog };
