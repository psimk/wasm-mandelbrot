use std::ops::Add;

#[derive(Clone, Copy, Debug)]
pub struct Complex {
  pub re: f64,
  pub im: f64,
}

impl Complex {
  pub fn square(self) -> Complex {
    let re = self.square_real() - self.square_imaginary();
    let im = 2.0 * self.re * self.im;
    Complex { re, im }
  }

  fn square_real(self) -> f64 {
    self.re * self.re
  }

  fn square_imaginary(self) -> f64 {
    self.im * self.im
  }

  pub fn norm(self) -> f64 {
    self.square_real() + self.square_imaginary()
  }
}

impl Add<Complex> for Complex {
  type Output = Complex;
  fn add(self, rhs: Complex) -> Complex {
    Complex {
      re: self.re + rhs.re,
      im: self.im + rhs.im,
    }
  }
}
