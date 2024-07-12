

export class Pos {

	idx: number;
	ln: number;
	col: number;
	code: string;
	constructor({ col, idx, ln, code }: { col: number; idx: number; ln: number; code: string }) {
		this.col = col;
		this.idx = idx;
		this.ln = ln;
		this.code = code;
	}

	advance({ n }: { n: number }) {

		for (let i = 0; i < (n || 1); i++) {
			this.idx++
			this.col++
			if (this.code[this.idx] === '\n') {
				this.col = 0;
				this.ln++;
			}
		}

	}

	clone(): Pos {
		return new Pos({ col: this.col, code: this.code, idx: this.idx, ln: this.ln })
	}
}
