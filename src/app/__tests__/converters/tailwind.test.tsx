// Import the function to be tested
import { toTailwind } from "@/converters/tailwind"; // Replace with the actual module path
import { Unit } from "@/units";

describe("from bootstrap", () => {
  it("should map input within the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Bootstrap, 0)).toBe(0);
    expect(toTailwind.convert(Unit.Bootstrap, 1)).toBe(1);
    expect(toTailwind.convert(Unit.Bootstrap, 2)).toBe(2);
    expect(toTailwind.convert(Unit.Bootstrap, 3)).toBe(4);
    expect(toTailwind.convert(Unit.Bootstrap, 4)).toBe(6);
    expect(toTailwind.convert(Unit.Bootstrap, 5)).toBe(12);
  });
  it("should handle input outside the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Bootstrap, 6)).toBe(-1);
  });
});

describe("from pixels", () => {
  it("should map input within the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Pixels, 0)).toBe(0);
    expect(toTailwind.convert(Unit.Pixels, 1)).toBe(0.25);
    expect(toTailwind.convert(Unit.Pixels, 2)).toBe(0.5);
    expect(toTailwind.convert(Unit.Pixels, 4)).toBe(1);
    expect(toTailwind.convert(Unit.Pixels, 6)).toBe(1.5);
    expect(toTailwind.convert(Unit.Pixels, 8)).toBe(2);
    expect(toTailwind.convert(Unit.Pixels, 10)).toBe(2.5);
    expect(toTailwind.convert(Unit.Pixels, 12)).toBe(3);
    expect(toTailwind.convert(Unit.Pixels, 14)).toBe(3.5);
    expect(toTailwind.convert(Unit.Pixels, 16)).toBe(4);
    expect(toTailwind.convert(Unit.Pixels, 20)).toBe(5);
    expect(toTailwind.convert(Unit.Pixels, 24)).toBe(6);
    expect(toTailwind.convert(Unit.Pixels, 28)).toBe(7);
    expect(toTailwind.convert(Unit.Pixels, 32)).toBe(8);
    expect(toTailwind.convert(Unit.Pixels, 36)).toBe(9);
    expect(toTailwind.convert(Unit.Pixels, 40)).toBe(10);
    expect(toTailwind.convert(Unit.Pixels, 44)).toBe(11);
    expect(toTailwind.convert(Unit.Pixels, 48)).toBe(12);
    expect(toTailwind.convert(Unit.Pixels, 56)).toBe(14);
    expect(toTailwind.convert(Unit.Pixels, 64)).toBe(16);
    expect(toTailwind.convert(Unit.Pixels, 80)).toBe(20);
    expect(toTailwind.convert(Unit.Pixels, 96)).toBe(24);
    expect(toTailwind.convert(Unit.Pixels, 112)).toBe(28);
    expect(toTailwind.convert(Unit.Pixels, 128)).toBe(32);
    expect(toTailwind.convert(Unit.Pixels, 144)).toBe(36);
    expect(toTailwind.convert(Unit.Pixels, 160)).toBe(40);
    expect(toTailwind.convert(Unit.Pixels, 176)).toBe(44);
    expect(toTailwind.convert(Unit.Pixels, 192)).toBe(48);
    expect(toTailwind.convert(Unit.Pixels, 208)).toBe(52);
    expect(toTailwind.convert(Unit.Pixels, 224)).toBe(56);
    expect(toTailwind.convert(Unit.Pixels, 240)).toBe(60);
    expect(toTailwind.convert(Unit.Pixels, 256)).toBe(64);
    expect(toTailwind.convert(Unit.Pixels, 288)).toBe(72);
    expect(toTailwind.convert(Unit.Pixels, 320)).toBe(80);
    expect(toTailwind.convert(Unit.Pixels, 384)).toBe(96);
  });

  it("should handle input outside the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Pixels, 3)).toBe(-1);
    expect(toTailwind.convert(Unit.Pixels, 385)).toBe(-1);
  });
});

describe("from ems and rems", () => {
  it("should map input within the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Ems, 0)).toBe(0);
    expect(toTailwind.convert(Unit.Ems, 0.063)).toBe(0.25);
    expect(toTailwind.convert(Unit.Ems, 0.125)).toBe(0.5);
    expect(toTailwind.convert(Unit.Ems, 0.25)).toBe(1);
    expect(toTailwind.convert(Unit.Ems, 0.375)).toBe(1.5);
    expect(toTailwind.convert(Unit.Ems, 0.5)).toBe(2);
    expect(toTailwind.convert(Unit.Ems, 0.625)).toBe(2.5);
    expect(toTailwind.convert(Unit.Ems, 0.75)).toBe(3);
    expect(toTailwind.convert(Unit.Ems, 0.875)).toBe(3.5);
    expect(toTailwind.convert(Unit.Ems, 1)).toBe(4);
    expect(toTailwind.convert(Unit.Ems, 1.25)).toBe(5);
    expect(toTailwind.convert(Unit.Ems, 1.5)).toBe(6);
    expect(toTailwind.convert(Unit.Ems, 1.75)).toBe(7);
    expect(toTailwind.convert(Unit.Ems, 2)).toBe(8);
    expect(toTailwind.convert(Unit.Ems, 2.25)).toBe(9);
    expect(toTailwind.convert(Unit.Ems, 2.5)).toBe(10);
    expect(toTailwind.convert(Unit.Ems, 2.75)).toBe(11);
    expect(toTailwind.convert(Unit.Ems, 3)).toBe(12);
    expect(toTailwind.convert(Unit.Ems, 3.5)).toBe(14);
    expect(toTailwind.convert(Unit.Ems, 4)).toBe(16);
    expect(toTailwind.convert(Unit.Ems, 5)).toBe(20);
    expect(toTailwind.convert(Unit.Ems, 6)).toBe(24);
    expect(toTailwind.convert(Unit.Ems, 7)).toBe(28);
    expect(toTailwind.convert(Unit.Ems, 8)).toBe(32);
    expect(toTailwind.convert(Unit.Ems, 9)).toBe(36);
    expect(toTailwind.convert(Unit.Ems, 10)).toBe(40);
    expect(toTailwind.convert(Unit.Ems, 11)).toBe(44);
    expect(toTailwind.convert(Unit.Ems, 12)).toBe(48);
    expect(toTailwind.convert(Unit.Ems, 13)).toBe(52);
    expect(toTailwind.convert(Unit.Ems, 14)).toBe(56);
    expect(toTailwind.convert(Unit.Ems, 15)).toBe(60);
    expect(toTailwind.convert(Unit.Ems, 16)).toBe(64);
    expect(toTailwind.convert(Unit.Ems, 18)).toBe(72);
    expect(toTailwind.convert(Unit.Ems, 20)).toBe(80);
    expect(toTailwind.convert(Unit.Ems, 24)).toBe(96);
  });

  it("should handle input outside the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Ems, 0.1)).toBe(-1);
    expect(toTailwind.convert(Unit.Ems, 8.1)).toBe(-1);
    expect(toTailwind.convert(Unit.Ems, 25)).toBe(-1);
  });
});

describe("from millimeters", () => {
  it("should map input within the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Millimetres, 0)).toBe(0);
    expect(toTailwind.convert(Unit.Millimetres, 0.2645833)).toBe(0.25);
    expect(toTailwind.convert(Unit.Millimetres, 0.5291666)).toBe(0.5);
    expect(toTailwind.convert(Unit.Millimetres, 1.0583332)).toBe(1);
    expect(toTailwind.convert(Unit.Millimetres, 1.5874998)).toBe(1.5);
    expect(toTailwind.convert(Unit.Millimetres, 2.1166664)).toBe(2);
    expect(toTailwind.convert(Unit.Millimetres, 2.645833)).toBe(2.5);
    expect(toTailwind.convert(Unit.Millimetres, 3.1749996)).toBe(3);
    expect(toTailwind.convert(Unit.Millimetres, 3.7041662)).toBe(3.5);
    expect(toTailwind.convert(Unit.Millimetres, 4.2333328)).toBe(4);
    expect(toTailwind.convert(Unit.Millimetres, 5.291666)).toBe(5);
    expect(toTailwind.convert(Unit.Millimetres, 6.3499992)).toBe(6);
    expect(toTailwind.convert(Unit.Millimetres, 7.4083324)).toBe(7);
    expect(toTailwind.convert(Unit.Millimetres, 8.4666656)).toBe(8);
    expect(toTailwind.convert(Unit.Millimetres, 9.5249988)).toBe(9);
    expect(toTailwind.convert(Unit.Millimetres, 10.583332)).toBe(10);
    expect(toTailwind.convert(Unit.Millimetres, 11.6416652)).toBe(11);
    expect(toTailwind.convert(Unit.Millimetres, 12.6999984)).toBe(12);
    expect(toTailwind.convert(Unit.Millimetres, 14.8166648)).toBe(14);
    expect(toTailwind.convert(Unit.Millimetres, 16.9333312)).toBe(16);
    expect(toTailwind.convert(Unit.Millimetres, 21.166664)).toBe(20);
    expect(toTailwind.convert(Unit.Millimetres, 25.3999968)).toBe(24);
    expect(toTailwind.convert(Unit.Millimetres, 29.6333296)).toBe(28);
    expect(toTailwind.convert(Unit.Millimetres, 33.8666624)).toBe(32);
    expect(toTailwind.convert(Unit.Millimetres, 38.0999952)).toBe(36);
    expect(toTailwind.convert(Unit.Millimetres, 42.333328)).toBe(40);
    expect(toTailwind.convert(Unit.Millimetres, 46.5666608)).toBe(44);
    expect(toTailwind.convert(Unit.Millimetres, 50.7999936)).toBe(48);
    expect(toTailwind.convert(Unit.Millimetres, 55.0333264)).toBe(52);
    expect(toTailwind.convert(Unit.Millimetres, 59.2666592)).toBe(56);
    expect(toTailwind.convert(Unit.Millimetres, 63.499992)).toBe(60);
    expect(toTailwind.convert(Unit.Millimetres, 67.7333248)).toBe(64);
    expect(toTailwind.convert(Unit.Millimetres, 76.1999904)).toBe(72);
    expect(toTailwind.convert(Unit.Millimetres, 84.666656)).toBe(80);
    expect(toTailwind.convert(Unit.Millimetres, 101.5999872)).toBe(96);
  });

  it("should handle input outside the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Millimetres, 0.7937499)).toBe(-1);
    expect(toTailwind.convert(Unit.Millimetres, 101.8645705)).toBe(-1);
  });
});

describe("from inches", () => {
  it("should map input within the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Inches, 0)).toBe(0);
    expect(toTailwind.convert(Unit.Inches, 0.010416665354331)).toBe(0.25);
    expect(toTailwind.convert(Unit.Inches, 0.020833330708661)).toBe(0.5);
    expect(toTailwind.convert(Unit.Inches, 0.041666661417323)).toBe(1);
    expect(toTailwind.convert(Unit.Inches, 0.062499992125984)).toBe(1.5);
    expect(toTailwind.convert(Unit.Inches, 0.083333322834646)).toBe(2);
    expect(toTailwind.convert(Unit.Inches, 0.10416665354331)).toBe(2.5);
    expect(toTailwind.convert(Unit.Inches, 0.12499998425197)).toBe(3);
    expect(toTailwind.convert(Unit.Inches, 0.14583331496063)).toBe(3.5);
    expect(toTailwind.convert(Unit.Inches, 0.16666664566929)).toBe(4);
    expect(toTailwind.convert(Unit.Inches, 0.20833330708661)).toBe(5);
    expect(toTailwind.convert(Unit.Inches, 0.24999996850394)).toBe(6);
    expect(toTailwind.convert(Unit.Inches, 0.29166662992126)).toBe(7);
    expect(toTailwind.convert(Unit.Inches, 0.33333329133858)).toBe(8);
    expect(toTailwind.convert(Unit.Inches, 0.37499995275591)).toBe(9);
    expect(toTailwind.convert(Unit.Inches, 0.41666661417323)).toBe(10);
    expect(toTailwind.convert(Unit.Inches, 0.45833327559055)).toBe(11);
    expect(toTailwind.convert(Unit.Inches, 0.49999993700787)).toBe(12);
    expect(toTailwind.convert(Unit.Inches, 0.58333325984252)).toBe(14);
    expect(toTailwind.convert(Unit.Inches, 0.66666658267717)).toBe(16);
    expect(toTailwind.convert(Unit.Inches, 0.83333322834646)).toBe(20);
    expect(toTailwind.convert(Unit.Inches, 0.99999987401575)).toBe(24);
    expect(toTailwind.convert(Unit.Inches, 1.166666519685)).toBe(28);
    expect(toTailwind.convert(Unit.Inches, 1.3333331653543)).toBe(32);
    expect(toTailwind.convert(Unit.Inches, 1.4999998110236)).toBe(36);
    expect(toTailwind.convert(Unit.Inches, 1.6666664566929)).toBe(40);
    expect(toTailwind.convert(Unit.Inches, 1.8333331023622)).toBe(44);
    expect(toTailwind.convert(Unit.Inches, 1.9999997480315)).toBe(48);
    expect(toTailwind.convert(Unit.Inches, 2.1666663937008)).toBe(52);
    expect(toTailwind.convert(Unit.Inches, 2.3333330393701)).toBe(56);
    expect(toTailwind.convert(Unit.Inches, 2.4999996850394)).toBe(60);
    expect(toTailwind.convert(Unit.Inches, 2.6666663307087)).toBe(64);
    expect(toTailwind.convert(Unit.Inches, 2.9999996220472)).toBe(72);
    expect(toTailwind.convert(Unit.Inches, 3.3333329133858)).toBe(80);
    expect(toTailwind.convert(Unit.Inches, 3.999999496063)).toBe(96);
  });

  it("should handle input outside the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Inches, 0.031249996062992)).toBe(-1);
    expect(toTailwind.convert(Unit.Inches, 4.0104161614173)).toBe(-1);
  });
});

describe("from points", () => {
  it("should map input within the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Points, 0)).toBe(0);
    expect(toTailwind.convert(Unit.Points, 0.74999943307122)).toBe(0.25);
    expect(toTailwind.convert(Unit.Points, 1.4999988661424)).toBe(0.5);
    expect(toTailwind.convert(Unit.Points, 2.9999977322849)).toBe(1);
    expect(toTailwind.convert(Unit.Points, 4.4999965984273)).toBe(1.5);
    expect(toTailwind.convert(Unit.Points, 5.9999954645698)).toBe(2);
    expect(toTailwind.convert(Unit.Points, 7.4999943307122)).toBe(2.5);
    expect(toTailwind.convert(Unit.Points, 8.9999931968547)).toBe(3);
    expect(toTailwind.convert(Unit.Points, 10.499992062997)).toBe(3.5);
    expect(toTailwind.convert(Unit.Points, 11.99999092914)).toBe(4);
    expect(toTailwind.convert(Unit.Points, 14.999988661424)).toBe(5);
    expect(toTailwind.convert(Unit.Points, 17.999986393709)).toBe(6);
    expect(toTailwind.convert(Unit.Points, 20.999984125994)).toBe(7);
    expect(toTailwind.convert(Unit.Points, 23.999981858279)).toBe(8);
    expect(toTailwind.convert(Unit.Points, 26.999979590564)).toBe(9);
    expect(toTailwind.convert(Unit.Points, 29.999977322849)).toBe(10);
    expect(toTailwind.convert(Unit.Points, 32.999975055134)).toBe(11);
    expect(toTailwind.convert(Unit.Points, 35.999972787419)).toBe(12);
    expect(toTailwind.convert(Unit.Points, 41.999968251988)).toBe(14);
    expect(toTailwind.convert(Unit.Points, 47.999963716558)).toBe(16);
    expect(toTailwind.convert(Unit.Points, 59.999954645698)).toBe(20);
    expect(toTailwind.convert(Unit.Points, 71.999945574837)).toBe(24);
    expect(toTailwind.convert(Unit.Points, 83.999936503977)).toBe(28);
    expect(toTailwind.convert(Unit.Points, 95.999927433117)).toBe(32);
    expect(toTailwind.convert(Unit.Points, 107.99991836226)).toBe(36);
    expect(toTailwind.convert(Unit.Points, 119.9999092914)).toBe(40);
    expect(toTailwind.convert(Unit.Points, 131.99990022054)).toBe(44);
    expect(toTailwind.convert(Unit.Points, 143.99989114967)).toBe(48);
    expect(toTailwind.convert(Unit.Points, 155.99988207881)).toBe(52);
    expect(toTailwind.convert(Unit.Points, 167.99987300795)).toBe(56);
    expect(toTailwind.convert(Unit.Points, 179.99986393709)).toBe(60);
    expect(toTailwind.convert(Unit.Points, 191.99985486623)).toBe(64);
    expect(toTailwind.convert(Unit.Points, 215.99983672451)).toBe(72);
    expect(toTailwind.convert(Unit.Points, 239.99981858279)).toBe(80);
    expect(toTailwind.convert(Unit.Points, 287.99978229935)).toBe(96);
  });

  it("should handle input outside the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Points, 2.2499982992137)).toBe(-1);
    expect(toTailwind.convert(Unit.Points, 4.0104161614173)).toBe(-1);
  });
});

describe("from centimetres", () => {
  it("should map input within the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Centimetres, 0)).toBe(0);
    expect(toTailwind.convert(Unit.Centimetres, 0.02645833)).toBe(0.25);
    expect(toTailwind.convert(Unit.Centimetres, 0.05291666)).toBe(0.5);
    expect(toTailwind.convert(Unit.Centimetres, 0.10583332)).toBe(1);
    expect(toTailwind.convert(Unit.Centimetres, 0.15874998)).toBe(1.5);
    expect(toTailwind.convert(Unit.Centimetres, 0.21166664)).toBe(2);
    expect(toTailwind.convert(Unit.Centimetres, 0.2645833)).toBe(2.5);
    expect(toTailwind.convert(Unit.Centimetres, 0.31749996)).toBe(3);
    expect(toTailwind.convert(Unit.Centimetres, 0.37041662)).toBe(3.5);
    expect(toTailwind.convert(Unit.Centimetres, 0.42333328)).toBe(4);
    expect(toTailwind.convert(Unit.Centimetres, 0.5291666)).toBe(5);
    expect(toTailwind.convert(Unit.Centimetres, 0.63499992)).toBe(6);
    expect(toTailwind.convert(Unit.Centimetres, 0.74083324)).toBe(7);
    expect(toTailwind.convert(Unit.Centimetres, 0.84666656)).toBe(8);
    expect(toTailwind.convert(Unit.Centimetres, 0.95249988)).toBe(9);
    expect(toTailwind.convert(Unit.Centimetres, 1.0583332)).toBe(10);
    expect(toTailwind.convert(Unit.Centimetres, 1.16416652)).toBe(11);
    expect(toTailwind.convert(Unit.Centimetres, 1.26999984)).toBe(12);
    expect(toTailwind.convert(Unit.Centimetres, 1.48166648)).toBe(14);
    expect(toTailwind.convert(Unit.Centimetres, 1.69333312)).toBe(16);
    expect(toTailwind.convert(Unit.Centimetres, 2.1166664)).toBe(20);
    expect(toTailwind.convert(Unit.Centimetres, 2.53999968)).toBe(24);
    expect(toTailwind.convert(Unit.Centimetres, 2.96333296)).toBe(28);
    expect(toTailwind.convert(Unit.Centimetres, 3.38666624)).toBe(32);
    expect(toTailwind.convert(Unit.Centimetres, 3.80999952)).toBe(36);
    expect(toTailwind.convert(Unit.Centimetres, 4.2333328)).toBe(40);
    expect(toTailwind.convert(Unit.Centimetres, 4.65666608)).toBe(44);
    expect(toTailwind.convert(Unit.Centimetres, 5.07999936)).toBe(48);
    expect(toTailwind.convert(Unit.Centimetres, 5.50333264)).toBe(52);
    expect(toTailwind.convert(Unit.Centimetres, 5.92666592)).toBe(56);
    expect(toTailwind.convert(Unit.Centimetres, 6.3499992)).toBe(60);
    expect(toTailwind.convert(Unit.Centimetres, 6.77333248)).toBe(64);
    expect(toTailwind.convert(Unit.Centimetres, 7.61999904)).toBe(72);
    expect(toTailwind.convert(Unit.Centimetres, 8.4666656)).toBe(80);
    expect(toTailwind.convert(Unit.Centimetres, 10.15999872)).toBe(96);
  });

  it("should handle input outside the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Centimetres, 0.07937499)).toBe(-1);
    expect(toTailwind.convert(Unit.Centimetres, 10.18645705)).toBe(-1);
  });
});

describe("from Feet", () => {
  it("should map input within the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Feet, 0)).toBe(0);
    expect(toTailwind.convert(Unit.Feet, 0.00086805544619423)).toBe(0.25);
    expect(toTailwind.convert(Unit.Feet, 0.0017361108923885)).toBe(0.5);
    expect(toTailwind.convert(Unit.Feet, 0.0034722217847769)).toBe(1);
    expect(toTailwind.convert(Unit.Feet, 0.0052083326771654)).toBe(1.5);
    expect(toTailwind.convert(Unit.Feet, 0.0069444435695538)).toBe(2);
    expect(toTailwind.convert(Unit.Feet, 0.0086805544619423)).toBe(2.5);
    expect(toTailwind.convert(Unit.Feet, 0.010416665354331)).toBe(3);
    expect(toTailwind.convert(Unit.Feet, 0.012152776246719)).toBe(3.5);
    expect(toTailwind.convert(Unit.Feet, 0.013888887139108)).toBe(4);
    expect(toTailwind.convert(Unit.Feet, 0.017361108923885)).toBe(5);
    expect(toTailwind.convert(Unit.Feet, 0.020833330708661)).toBe(6);
    expect(toTailwind.convert(Unit.Feet, 0.024305552493438)).toBe(7);
    expect(toTailwind.convert(Unit.Feet, 0.027777774278215)).toBe(8);
    expect(toTailwind.convert(Unit.Feet, 0.031249996062992)).toBe(9);
    expect(toTailwind.convert(Unit.Feet, 0.034722217847769)).toBe(10);
    expect(toTailwind.convert(Unit.Feet, 0.038194439632546)).toBe(11);
    expect(toTailwind.convert(Unit.Feet, 0.041666661417323)).toBe(12);
    expect(toTailwind.convert(Unit.Feet, 0.048611104986877)).toBe(14);
    expect(toTailwind.convert(Unit.Feet, 0.05555554855643)).toBe(16);
    expect(toTailwind.convert(Unit.Feet, 0.069444435695538)).toBe(20);
    expect(toTailwind.convert(Unit.Feet, 0.083333322834646)).toBe(24);
    expect(toTailwind.convert(Unit.Feet, 0.097222209973753)).toBe(28);
    expect(toTailwind.convert(Unit.Feet, 0.11111109711286)).toBe(32);
    expect(toTailwind.convert(Unit.Feet, 0.12499998425197)).toBe(36);
    expect(toTailwind.convert(Unit.Feet, 0.13888887139108)).toBe(40);
    expect(toTailwind.convert(Unit.Feet, 0.15277775853018)).toBe(44);
    expect(toTailwind.convert(Unit.Feet, 0.16666664566929)).toBe(48);
    expect(toTailwind.convert(Unit.Feet, 0.1805555328084)).toBe(52);
    expect(toTailwind.convert(Unit.Feet, 0.19444441994751)).toBe(56);
    expect(toTailwind.convert(Unit.Feet, 0.20833330708661)).toBe(60);
    expect(toTailwind.convert(Unit.Feet, 0.22222219422572)).toBe(64);
    expect(toTailwind.convert(Unit.Feet, 0.24999996850394)).toBe(72);
    expect(toTailwind.convert(Unit.Feet, 0.27777774278215)).toBe(80);
    expect(toTailwind.convert(Unit.Feet, 0.33333329133858)).toBe(96);
  });

  it("should handle input outside the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Feet, 0.0026041663385827)).toBe(-1);
    expect(toTailwind.convert(Unit.Feet, 0.33420134678478)).toBe(-1);
  });
})

describe("from picas", () => {
  it("should map input within the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Picas, 0)).toBe(0);
    expect(toTailwind.convert(Unit.Picas, 0.062499992175197)).toBe(0.25);
    expect(toTailwind.convert(Unit.Picas, 0.12499998435039)).toBe(0.5);
    expect(toTailwind.convert(Unit.Picas, 0.24999996870079)).toBe(1);
    expect(toTailwind.convert(Unit.Picas, 0.37499995305118)).toBe(1.5);
    expect(toTailwind.convert(Unit.Picas, 0.49999993740157)).toBe(2);
    expect(toTailwind.convert(Unit.Picas, 0.62499992175197)).toBe(2.5);
    expect(toTailwind.convert(Unit.Picas, 0.74999990610236)).toBe(3);
    expect(toTailwind.convert(Unit.Picas, 0.87499989045276)).toBe(3.5);
    expect(toTailwind.convert(Unit.Picas, 0.99999987480315)).toBe(4);
    expect(toTailwind.convert(Unit.Picas, 1.2499998435039)).toBe(5);
    expect(toTailwind.convert(Unit.Picas, 1.4999998122047)).toBe(6);
    expect(toTailwind.convert(Unit.Picas, 1.7499997809055)).toBe(7);
    expect(toTailwind.convert(Unit.Picas, 1.9999997496063)).toBe(8);
    expect(toTailwind.convert(Unit.Picas, 2.2499997183071)).toBe(9);
    expect(toTailwind.convert(Unit.Picas, 2.4999996870079)).toBe(10);
    expect(toTailwind.convert(Unit.Picas, 2.7499996557087)).toBe(11);
    expect(toTailwind.convert(Unit.Picas, 2.9999996244094)).toBe(12);
    expect(toTailwind.convert(Unit.Picas, 3.499999561811)).toBe(14);
    expect(toTailwind.convert(Unit.Picas, 3.9999994992126)).toBe(16);
    expect(toTailwind.convert(Unit.Picas, 4.9999993740157)).toBe(20);
    expect(toTailwind.convert(Unit.Picas, 5.9999992488189)).toBe(24);
    expect(toTailwind.convert(Unit.Picas, 6.999999123622)).toBe(28);
    expect(toTailwind.convert(Unit.Picas, 7.9999989984252)).toBe(32);
    expect(toTailwind.convert(Unit.Picas, 8.9999988732283)).toBe(36);
    expect(toTailwind.convert(Unit.Picas, 9.9999987480315)).toBe(40);
    expect(toTailwind.convert(Unit.Picas, 10.999998622835)).toBe(44);
    expect(toTailwind.convert(Unit.Picas, 11.999998497638)).toBe(48);
    expect(toTailwind.convert(Unit.Picas, 12.999998372441)).toBe(52);
    expect(toTailwind.convert(Unit.Picas, 13.999998247244)).toBe(56);
    expect(toTailwind.convert(Unit.Picas, 14.999998122047)).toBe(60);
    expect(toTailwind.convert(Unit.Picas, 15.99999799685)).toBe(64);
    expect(toTailwind.convert(Unit.Picas, 17.999997746457)).toBe(72);
    expect(toTailwind.convert(Unit.Picas, 19.999997496063)).toBe(80);
    expect(toTailwind.convert(Unit.Picas, 23.999996995276)).toBe(96);
  });

  it("should handle input outside the range of Tailwind sizes", () => {
    expect(toTailwind.convert(Unit.Picas, 0.18749997652559)).toBe(-1);
    expect(toTailwind.convert(Unit.Picas, 24.062496987451)).toBe(-1);
  });
});
