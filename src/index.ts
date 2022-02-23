import _ from "lodash";
import { cssText } from "./sample";

export const customLog = {
	monkeyConsole: {
		...console,
	},
	options: {
		time: false,
	} as RootOption,
	message: function (fn: Function) {
		return function (opts: Option) {
			return function () {
				fn.apply(
					console,
					[
						`${customLog.options?.time ? setTime() : ""}${
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

		function setTime() {
			return new Date().toLocaleString();
		}

		function setPrefixLog(prefix: string) {
			return prefix;
		}
	},

	init: (options: RootOption = { time: false } as RootOption) => {
		customLog.options = options;
		window.console = {
			...window.console,
			log: customLog.message(customLog.monkeyConsole.log)(options?.log),
			info: customLog.message(customLog.monkeyConsole.info)(
				options?.info
			),
			warn: customLog.message(customLog.monkeyConsole.warn)(
				options?.warn || {}
			),
		};

		customLog.message(customLog.monkeyConsole.log)(options?.hello)();
	},

	end: () => {
		customLog.message(customLog.monkeyConsole.log)(
			customLog.options?.bye
		)();
		window.console = customLog.monkeyConsole;
	},
};
const customLogOption: RootOption = {
	prefix: "RootPrefix",
	style: cssText["sample1"],
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
customLog.init();
console.log("안녕하세요", { a: "asdf" });
setTimeout(() => {
	console.log("delay 3초");
}, 3000);

console.log("로그입니다");
console.warn("wran입니다");
console.info("info입니다");
customLog.end();
