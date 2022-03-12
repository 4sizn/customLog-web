import { Option, RootOption } from "./types";
export declare const customLog: {
	run: boolean;
	monkeyConsole: Console;
	options: RootOption;
	message: (fn: Function) => (opts: Option) => () => void;
	init: (options?: RootOption) => void;
	end: () => void;
};
