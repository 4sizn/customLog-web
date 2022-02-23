import _ from "lodash";
import { cssText } from "./sample";

export const customLog = {
	monkeyConsole: {
		...console,
	},
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
						}%c%s`,
						opts?.style,
					].concat(...arguments)
				);
			};
		};

		function setTimeStamp() {
			return `[${new Date().toLocaleString()}] `;
		}

		function setPrefixLog(prefix: string) {
			return prefix;
		}
	},

	init: (options: RootOption = { timestamp: false } as RootOption) => {
		customLog.options = options;

		for (let key of Object.keys(options)) {
			if (isMonkeyConsoleKey(key)) {
				Object.defineProperty(
					window.console,
					key,
					customLog.message(customLog.monkeyConsole[key])(
						options[key]
					)
				);
			}
		}

		if (options?.hello) {
			customLog.message(customLog.monkeyConsole.log)(options.hello)();
		}

		function isMonkeyConsoleKey(key: string): key is keyof Console {
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
	prefix: "RootPrefix",
	style: cssText["sample1"],
	timestamp: true,
	hello: {
		prefix: "[prefix-hello]",
		style: cssText["sample2"],
	},
	bye: {
		prefix: "[prefix-bye]",
		style: cssText["sample1"],
	},
	log: {
		prefix: "[prefix-log]",
		style: cssText["sample2"],
	},
	info: {
		prefix: "[prefix-info]",
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
