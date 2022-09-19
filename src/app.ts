import { customLog } from "./index";
import { cssText } from "./sample";

console.log("custom Log 동작 전");

customLog.init({
	prefix: "root입니다",
	style: cssText["sample6"],
	timestamp: true,
	hello: {
		style: cssText.sample6,
		prefix: "hello",
	},

	log: {
		style: cssText.sample6,
		prefix: "hello",
	},

	error: {
		style: cssText.sample4,
		prefix: "error입니다",
	},
});

// customLog.init(customLogOption);

// console.log("custom Log 동작 후");
console.log("안녕하세요", { a: "asdf" });
// console.log(JSON.stringify({ a: "asdf" }));
console.log("로그입니다", "asdf");
console.warn("wran입니다");
console.info("info입니다");
console.error("error입니다");
customLog.end();
console.warn("wran입니다");
console.info("info입니다");
