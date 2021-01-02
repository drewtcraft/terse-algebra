const Algebra = require('./index');
const { expect } = require('chai');

describe('terse algebra', function () {
	it('should do it right!', function () {
		let al = new Algebra({ width: 500, height: 600 });
		expect(al.parse('t + h / 2', { height: 100 })).to.equal(350);

		al = new Algebra({ width: 1000, height: 2000 });
		expect(al.parse('r + 20 + w / 2', { width: 200 })).to.equal(620);
	});
});
