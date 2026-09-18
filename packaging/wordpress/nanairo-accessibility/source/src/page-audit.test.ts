import { describe, expect, it } from 'vitest';
import { contrastRatio, relativeLuminance } from './page-audit';

describe('page audit contrast helpers', () => {
  it('calculates the WCAG black-on-white contrast ratio', () => {
    expect(contrastRatio([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 5);
  });

  it('orders relative luminance from black to white', () => {
    expect(relativeLuminance([0, 0, 0])).toBe(0);
    expect(relativeLuminance([255, 255, 255])).toBe(1);
  });
});
