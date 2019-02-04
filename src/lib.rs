use crate::complex::Complex;
use wasm_bindgen::prelude::*;

mod complex;

#[wasm_bindgen]
pub fn mandelbrot(re: JsValue, im: JsValue, height: JsValue, width: JsValue) -> Vec<u8> {
  let resolution = (
    width.as_f64().unwrap() as u32,
    height.as_f64().unwrap() as u32,
  );

  let mut data: Vec<u8> = vec![0; 10_240_000];

  let scale_factor = 1.2;
  let resolution_scale_factor = scale_factor * 2.0;
  let scale = (
    resolution_scale_factor / resolution.0 as f64,
    resolution_scale_factor / resolution.1 as f64,
  );

  let re = re.as_f64().unwrap();
  let im = im.as_f64().unwrap();

  let mut iter: usize = 0;
  for x in 0..resolution.0 {
    for y in 0..resolution.1 {
      let cx = y as f64 * scale.0 - scale_factor;
      let cy = x as f64 * scale.1 - scale_factor;

      let c = Complex { re, im };
      let mut z = Complex { re: cx, im: cy };

      let mut i = 0;
      while i < 255 && z.norm() <= 2.0 {
        z = z.square() + c;
        i += 1;
      }

      if i >= 51 {
        data[iter as usize] = i as u8;
        data[(iter + 1) as usize] = (i * 30 / 100) as u8;
        data[(iter + 2) as usize] = (i * 30 / 100) as u8;
      } else {
        data[iter] = 51;
        data[(iter + 1) as usize] = 51;
        data[(iter + 2) as usize] = 51;
      }

      data[(iter + 3) as usize] = 255;
      iter += 4;
    }
  }
  data
}
