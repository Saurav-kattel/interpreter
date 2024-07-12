

export class Token {
	type: string;
	value: string;
	constructor({ _type, value }: { _type: string, value: string }) {
		this.type = _type;
		this.value = value;
	}

	toString(): string {
		return `<${this.type}:${this.value}>`
	}

}
