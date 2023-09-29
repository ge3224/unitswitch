import { toGolden } from '@/converters/golden_ratio';
import { Unit } from '@/units';

describe('toGolden', () => {
  describe('convert', () => {
    it('should convert a positive value to the longer length based on the golden ratio', () => {
      const input = 10;
      const result = toGolden.convert(Unit.Pixels, input);

      expect(result).toBeCloseTo(input * 1.61803, 5);
    });

    it('should return -1 for negative input values', () => {
      const input = -5;
      const result = toGolden.convert(Unit.Pixels, input);
      expect(result).toBe(-1);
    });
  });

  describe('render', () => {
    it('should render a valid conversion as a string', () => {
      const conversion = 15.1809;
      const result = toGolden.render(conversion);

      expect(result).toBe('15.1809');
    });

    it('should render "N/A" for invalid conversions', () => {
      const invalidConversion = -1;
      const result = toGolden.render(invalidConversion);

      expect(result).toBe('N/A');
    });

    it('should truncate long conversions to a readable string', () => {
      const longConversion = 1234567.891011;
      const result = toGolden.render(longConversion);

      expect(result).toBe('123456..');
    });
  });
});
