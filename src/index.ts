import { Option, RootOption } from "./types";

export const customLog = {
	run: false,
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

		for (let key of Object.keys(customLog.monkeyConsole)) {
			if (isConsoleProperty(key)) {
				window.console[key] = customLog.message(
					customLog.monkeyConsole[key]
				)(options[key]!);
			}
		}

		for (let key of Object.keys(options)) {
			if (isConsoleProperty(key)) {
				window.console[key] = customLog.message(
					customLog.monkeyConsole[key]
				)(options[key]!);
			}
		}

		customLog.run = true;

		if (options?.hello) {
			customLog.message(customLog.monkeyConsole.log)(options.hello)();
		}

		function isConsoleProperty(key: string): key is keyof Console {
			return customLog.monkeyConsole.hasOwnProperty(`${key}`);
		}
	},

	end: () => {
		if (!customLog.run) {
			throw Error("run int() first...");
		}
		if (customLog.options?.bye) {
			customLog.message(customLog.monkeyConsole.log)(
				customLog.options?.bye
			)();
		}
		window.console = customLog.monkeyConsole;
	},
};
