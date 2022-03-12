import { customLog } from "./index";
import { cssText, customLogOption } from "./sample";

console.log("custom Log 동작 전");
// customLog.init();
customLog.init({
	prefix: "root",
	timestamp: true,
	hello: {
		style: cssText.sample2,
	},
});

// customLog.init(customLogOption);

// console.log("custom Log 동작 후");
console.log("안녕하세요", { a: "asdf" });
console.log("로그입니다");
console.warn("wran입니다");
console.info("info입니다");
console.error("error입니다");
customLog.end();
console.warn("wran입니다");
console.info("info입니다");
