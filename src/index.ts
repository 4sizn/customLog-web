import { Option, RootOption } from "./types";

export const customLog = {
	run: false,
	monkeyConsole: {} as Console,
	options: {
		timestamp: false,
	} as RootOption,
	message: function (fn: Function) {
		let que: string[] = [];
		let styleQue: string[] = [];

		customLog.options?.timestamp && que.push(setTimeStamp());
		customLog.options?.prefix &&
			que.push(
				setPrefixLog(
					String(customLog.options.prefix),
					(style) => styleQue.push(style),
					customLog.options.style
				)
			);

		return function (opts: Option) {
			opts?.prefix &&
				que.push(
					setPrefixLog(
						String(opts.prefix),
						(style) => styleQue.push(style),
						opts.style
					)
				);

			return function () {
				fn.apply(
					console,
					[
						`${que.join(" ")}` +
							`${arguments.length > 0 ? "%c%s" : "%c "}`,
						opts?.style,
					].concat(...arguments)
				);
			};
		};

		function setTimeStamp() {
			return `[${new Date().toLocaleString()}] `;
		}

		function setPrefixLog(
			prefix: string,
			cb: (style: string) => {},
			style?: string
		) {
			if (style) {
				cb(style);
				return `[${prefix}]`;
			} else {
				return `[${prefix}]`;
			}
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
