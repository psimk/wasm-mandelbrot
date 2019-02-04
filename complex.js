export default class Complex {
	constructor(re, im) {
		this.re = re;
		this.im = im;
	}

	square() {
		return new Complex(this.square_real() - this.square_imaginary(), 2.0 * this.re * this.im);
	}

	square_real() {
		return this.re * this.re;
	}

	square_imaginary() {
		return this.im * this.im;
	}

	norm() {
		return this.square_real() + this.square_imaginary();
	}

	add(rhs) {
		return new Complex(this.re + rhs.re, this.im + rhs.im);
	}
}
