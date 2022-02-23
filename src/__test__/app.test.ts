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

describe("end custom log", () => {
	customLog.init();
});

describe("restore console.log()", () => {
	it(`console.log the text "hello"`, () => {
		const consoleSpy = jest.spyOn(console, "log");
		console.log("hello");

		expect(consoleSpy).toHaveBeenCalledWith("hello");
	});
});

/*
console.log("custom Log 동작 전");
// customLog.init();
// customLog.init({
// 	prefix: "root",
// 	timestamp: true,
// });

// console.log("custom Log 동작 후");
console.log("안녕하세요", { a: "asdf" });
console.log("로그입니다");
console.warn("wran입니다");
console.info("info입니다");
console.error("error입니다");
customLog.end();
console.warn("wran입니다");
console.info("info입니다");
*/
