const OPERATORS = [ '+', '-', '*', '/', '.' ];
const SYMBOLS = [
	//  directions refer to frame
	't', 'r', 'b', 'l', 'c',

	// w and h are for our assets
	'w', 'h',
];

function isOperator (c) {
	for (let i = 0; i < OPERATORS.length; i++) {
		if (c === OPERATORS[i]) return true;
		if (c.toLowerCase() === OPERATORS[i]) return true;
	}
	return false;
}

function isSymbol (c) {
	if (!c) return false;
	for (let i = 0; i < SYMBOLS.length; i++) {
		if (c === SYMBOLS[i]) return true;
		if (c.toLowerCase() === SYMBOLS[i]) return true;
	}
	return false;
}

function isNumber (c) {
	const cc = Number(c);
	return typeof cc === 'number' && !isNaN(cc);
}

function isParenthesis (c) {
	return c === '(' || c === ')';
}

function clean (str = '') {
	let cleaned = '';
	for (let i = 0; i < str.length; i++){
		const s = str[i];
		if (isOperator(s)) cleaned += s;
		else if (isSymbol(s)) cleaned += s;
		else if (isNumber(s)) cleaned += s;
		else if (isParenthesis(s)) cleaned += s;
		else if (s === ' ') cleaned += s;
	}
	return cleaned.toLowerCase();
}

function validateParenthesis (str) {
	let counter = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === '(') counter++;
		else if (str[i] === ')') counter--;

		if (counter < 0) return false;
	}

	return counter === 0;
}

function validateCharacters (str) {
	for (let i = 0; i < str.length; i++) {
	const c = str[i];
		const invalid = !isOperator(c)
			&& !isSymbol(c)
			&& !isParenthesis(c)
			&& !isNumber(c);

		if (invalid) return false;
	}
	return true;
}

module.exports = class PositionalAlgebra {
	constructor (frame) {
		this.frame = frame;
	}

	static clean (str) {
		return clean(str);
	}

	static validate (str) {
		return validateParenthesis(str) 
			&& validateCharacters(str);
	}

	// memoize this fucker, this is gonna be a little expensive
	parse (algebra, asset) {
		if (!asset) throw new Error('no asset in poarser');
		// if it's just a number, skip all the rest
		const asNumber = Number(algebra);
		if (!isNaN(asNumber)) {
			return asNumber;
		}

		const cleaned = clean(algebra);

		const exec = cleaned.split('')
			.reduce((acc, c, i) => {
				acc[i] = isSymbol(c) ? this.translate(c, asset) : c;
				return acc;
			}, [])
			.reduce((acc, c, i) => {
				acc[i] = isSymbol(c) ? this.translate(c, asset) : c;
				return acc;
			}, [])
			.reduce((acc, c, i) => {
				acc[i] = isSymbol(c) ? this.translate(c, asset) : c;
				return acc;
			}, [])
			.reduce((acc, c, i) => {
				acc[i] = isSymbol(c) ? this.translate(c, asset) : c;
				return acc;
			}, [])
			.join('');

		if (!exec) {
			return console.warn('no exec in parser');
		}

	 	return Function('"use strict";return (' + exec + ')')();
	}

	translate (letter, asset) {
		switch (letter) {
			case 't': 
				return this.frame.height / 2;
			case 'l':
				return this.frame.width / 2 * -1;
			case 'r':
				return this.frame.width / 2;
			case 'b':
				return this.frame.height / 2 * -1;
			case 'c':
				return 0;
			case 'h':
				return asset.height;
			case 'w':
				return asset.width;
		}
	}
}
