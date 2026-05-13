import { authHandlers } from "./auth";
import { blogHandlers } from "./blog";
import { boardHandlers } from "./board";
import { coffeeHandlers } from "./coffee";
import { friendHandlers } from "./friend";
import { mediaHandlers } from "./media";
import { sectionHandlers } from "./section";
import { seoHandlers } from "./seo";
import { tagHandlers } from "./tag";
import { userHandlers } from "./user";

export const handlers = [
	...authHandlers,
	...userHandlers,
	...blogHandlers,
	...tagHandlers,
	...sectionHandlers,
	...seoHandlers,
	...mediaHandlers,
	...coffeeHandlers,
	...friendHandlers,
	...boardHandlers,
];
