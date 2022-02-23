import { customLog } from "../index";

describe("before activate custom log", () => {
	it(`console.log the text "hello"`, () => {
		const consoleSpy = jest.spyOn(console, "log");
		console.log("hello");

		expect(consoleSpy).toHaveBeenCalledWith("hello");
	});
});

describe("initialize  custom log", () => {
	customLog.init();
});

describe("after custom log", () => {
	const consoleSpy = jest.spyOn(console, "log");
	console.log("hello");

	expect(consoleSpy).toHaveBeenCalledWith("hello");
});
