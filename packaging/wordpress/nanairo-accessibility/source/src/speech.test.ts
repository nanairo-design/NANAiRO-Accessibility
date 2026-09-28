import { describe, expect, it } from 'vitest';
import { MAX_SEGMENT_LENGTH, splitIntoSegments } from './speech';

const japaneseSentence = (index: number) => `これは${index}番目の文章で、読み上げの区切りを確認するために十分な長さを持たせています。`;

describe('speech segmentation', () => {
  it('returns nothing for blank text', () => {
    expect(splitIntoSegments('')).toEqual([]);
    expect(splitIntoSegments('   \n\t ')).toEqual([]);
  });

  it('collapses whitespace and keeps short text in one utterance', () => {
    expect(splitIntoSegments('  Hello\n  world  ')).toEqual(['Hello world']);
  });

  it('splits Japanese text on sentence boundaries, not at a fixed offset', () => {
    const text = Array.from({ length: 8 }, (_, index) => japaneseSentence(index + 1)).join('');
    const segments = splitIntoSegments(text);

    expect(segments.length).toBeGreaterThan(1);
    for (const segment of segments) {
      expect(segment.length).toBeLessThanOrEqual(MAX_SEGMENT_LENGTH);
      expect(segment.endsWith('。')).toBe(true);
    }
    expect(segments.join('')).toBe(text);
  });

  it('splits English text on sentence boundaries', () => {
    const text = Array.from({ length: 12 }, (_, index) => `This is sentence number ${index + 1} of the sample text.`).join(' ');
    const segments = splitIntoSegments(text);

    expect(segments.length).toBeGreaterThan(1);
    for (const segment of segments) {
      expect(segment.length).toBeLessThanOrEqual(MAX_SEGMENT_LENGTH);
      expect(segment).toMatch(/\.$/);
    }
  });

  it('never cuts a word in half when a long sentence has to be split', () => {
    const text = `${'word '.repeat(120).trim()} end.`;
    const segments = splitIntoSegments(text);

    expect(segments.length).toBeGreaterThan(1);
    for (const segment of segments) {
      expect(segment.length).toBeLessThanOrEqual(MAX_SEGMENT_LENGTH);
      expect(segment.split(' ').every((word) => word === 'word' || word === 'end.')).toBe(true);
    }
  });

  it('still makes progress on a long run with no spaces or punctuation', () => {
    const text = 'あ'.repeat(700);
    const segments = splitIntoSegments(text);

    expect(segments.join('')).toBe(text);
    for (const segment of segments) {
      expect(segment.length).toBeLessThanOrEqual(MAX_SEGMENT_LENGTH);
      expect(segment.length).toBeGreaterThan(0);
    }
  });

  it('honours a custom maximum length', () => {
    const segments = splitIntoSegments('一つ目です。二つ目です。三つ目です。', 10);
    expect(segments).toEqual(['一つ目です。', '二つ目です。', '三つ目です。']);
  });
});
