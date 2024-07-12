import { Pos } from "../pos.js";
import { Token } from "./token.js";


const token_types = {
	number: /[0-9]+(?:\.[0-9]+)?/,
	plus: /\+/,
	minus: /\-/,
	times: /\*/,
	divide: /\//,
	lparen: /\(/,
	rparen: /\)/,
	eq: /\=/,
	gt: /\>/,
	lt: /\</,
};

export const createTokens = ({ cmd }: { cmd: string }) => {
	console.log(cmd)
	let lexer = new Lexer({ type: token_types, code: cmd })
	return lexer.createToken();

}

class Lexer {
	slice: string;
	pos: Pos;
	code: string;
	type: Record<string, RegExp>;

	constructor({ code, type }: { code: string; type: Record<string, RegExp> }) {
		this.code = code;
		this.type = type;
		this.pos = new Pos({ col: 0, idx: 0, ln: 0, code });
		this.slice = code;
	}

	advance({ n }: { n: number }) {
		this.pos.advance({ n });
		this.slice = this.code.slice(this.pos.idx)
		while ([" ", "\t", "\n"].includes(this.slice[0])) {
			this.advance({ n: 1 })
		}
	}

	createToken() {
		const tokens: Token[] = [];
		while (this.slice) {
			let token: any = null;

			for (let type in this.type) {

				let e: any = this.type[type];
				let regex = new RegExp(e)
				let valid = regex.exec(this.slice)

				if (valid == null) continue;
				if (valid.index !== 0) continue;
				token = new Token({ _type: type, value: valid[0] });
				break;
			}
			if (token == null) {
				return ["ERROR"];
			}



			tokens.push(token);
			this.advance({ n: token.value.length });
		}
		return tokens;
	}

}
