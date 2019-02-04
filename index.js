import Complex from './complex';

let wasm;
let jsTimes = [];
let wasmTimes = [];

const onClickWASM = () => {
	const time = performance.now();

	const re = -0.4;
	const im = 0.6;

	const data = wasm.mandelbrot(re, im, 800, 800);
	displayImageData(data);
	const endTime = Math.floor(performance.now() - time);

	wasmTimes.push(endTime);
	console.log('WASM - ', getAvg(wasmTimes));
};

const onClickJS = () => {
	const time = performance.now();

	const re = -0.4;
	const im = 0.6;

	const resolution = { width: 800, height: 800 };

	let data = [];

	const scale_factor = 1.2;
	const resolution_scale_factor = scale_factor * 2;
	const scale = {
		width: resolution_scale_factor / resolution.width,
		height: resolution_scale_factor / resolution.height
	};
	for (let x = 0; x < resolution.width; x++) {
		for (let y = 0; y < resolution.width; y++) {
			let cx = y * scale.width - scale_factor;
			let cy = x * scale.height - scale_factor;

			let c = new Complex(re, im);
			let z = new Complex(cx, cy);
			let i = 0;

			while (i < 255 && z.norm() <= 2) {
				z = z.square().add(c);
				i += 1;
			}

			if (i >= 51) {
				data.push(i);
				data.push(i * 30 / 100);
				data.push(i * 30 / 100);
			} else {
				data.push(51);
				data.push(51);
				data.push(51);
			}

			data.push(255);
		}
	}

	displayImageData(data);

	const endTime = Math.floor(performance.now() - time);

	jsTimes.push(endTime);
	console.log('JS - ', getAvg(jsTimes));
};

const displayImageData = data => {
	const c2 = document.getElementById('canvas');
	const ctx2 = c2.getContext('2d');

	const c1 = document.createElement('canvas');
	c1.width = 800;
	c1.height = 800;
	const ctx1 = c1.getContext('2d');

	const imgData = ctx1.createImageData(800, 800);

	for (let i = 0; i < data.length; i++) {
		imgData.data[i] = data[i];
	}

	ctx1.putImageData(imgData, 0, 0);

	c2.width = 800;
	c2.height = 800;

	ctx2.imageSmoothingEnabled = false;
	ctx2.drawImage(c1, 0, 0, 800, 800);
};

const getAvg = array => {
	let sum = 0;
	array.forEach(ele => {
		sum += ele;
	});
	return Math.floor(sum / array.length);
};

const onClickImport = async () => {
	if (!wasm) {
		wasm = await import('./pkg/canvas').catch(console.error);
		console.log('Imported.');
	} else console.log('Already imported');
};

const onClickGuard = fn => (!wasm ? console.log("Press 'Import' First") : fn());
document.getElementById('button-wasm').addEventListener('click', () => onClickGuard(onClickWASM));
document.getElementById('button-js').addEventListener('click', onClickJS);
document.getElementById('button-import').addEventListener('click', onClickImport);
