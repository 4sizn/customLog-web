import _ from "lodash";
import { cssText } from "./sample";

export const customLog = {
	monkeyConsole: {} as Console,
	options: {
		timestamp: false,
	} as RootOption,
	message: function (fn: Function) {
		return function (opts: Option) {
			return function () {
				fn.apply(
					console,
					[
						`${customLog.options?.timestamp ? setTimeStamp() : ""}${
							customLog.options?.prefix
								? setPrefixLog(String(customLog.options.prefix))
								: ""
						}${
							opts?.prefix
								? setPrefixLog(String(opts.prefix))
								: ""
						}${arguments.length > 0 ? "%c%s" : "%c "}`,
						opts?.style,
					].concat(...arguments)
				);
			};
		};

		function setTimeStamp() {
			return `[${new Date().toLocaleString()}] `;
		}

		function setPrefixLog(prefix: string) {
			return `[${prefix}]`;
		}
	},

	init: (options: RootOption = { timestamp: false } as RootOption) => {
		customLog.monkeyConsole = {
			...console,
		};
		customLog.options = options;

		for (let key of Object.keys(options)) {
			if (isConsoleProperty(key)) {
				window.console[key] = customLog.message(
					customLog.monkeyConsole[key]
				)(options[key]!);
			}
		}

		if (options?.hello) {
			customLog.message(customLog.monkeyConsole.log)(options.hello)();
		}

		function isConsoleProperty(key: string): key is keyof Console {
			return customLog.monkeyConsole.hasOwnProperty(`${key}`);
		}
	},

	end: () => {
		if (customLog.options?.bye) {
			customLog.message(customLog.monkeyConsole.log)(
				customLog.options?.bye
			)();
		}
		window.console = customLog.monkeyConsole;
	},
};

const customLogOption: RootOption = {
	prefix: "root",
	style: cssText["sample1"],
	timestamp: true,
	hello: {
		prefix: "hello",
		style: cssText["sample2"],
	},
	bye: {
		prefix: "bye",
		style: cssText["sample3"],
	},
	log: {
		prefix: "log",
		style: cssText["sample1"],
	},
	info: {
		prefix: "info",
		style: cssText["sample1"],
	},
};
console.log("custom Log 동작 전");
customLog.init(customLogOption);
console.log("custom Log 동작 후");
console.log("안녕하세요", { a: "asdf" });
setTimeout(() => {
	console.log("delay 3초");
}, 3000);

console.log("로그입니다");
console.warn("wran입니다");
console.info("info입니다");
customLog.end();
