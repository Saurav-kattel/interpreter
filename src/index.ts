import enq from "enquirer";

import chalk from "chalk";
import { createTokens } from "./lexer/index.js";

(async () => {
	while (true) {
		const command: any = await enq.prompt({
			name: "command",
			type: "input",
			prefix: "",
			message: "<"
		})
		const tokens = createTokens({ cmd: command.command });
		console.log(`${chalk.gray('>')} ${tokens.map(t => t.toString()).join('; ')}`);

	}
})()
