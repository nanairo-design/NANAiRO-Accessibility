/**
 * Text collection and segmentation for the read-aloud feature.
 *
 * Kept free of widget state so both pieces can be unit tested directly.
 */

/**
 * Blocks worth reading aloud. Headings and paragraphs alone skipped list items,
 * table cells, definition lists and `summary`, which meant that list- or
 * table-driven pages were read almost silently.
 */
export const SPEECH_SELECTOR = 'h1, h2, h3, h4, h5, h6, p, li, dt, dd, blockquote, figcaption, caption, th, td, summary';

/** Utterances longer than this are unwieldy for most speech engines. */
export const MAX_SEGMENT_LENGTH = 220;

const TERMINATORS = '。．！？!?.';
/** A bare ASCII period only ends a sentence when something separates it from the next word. */
const ASCII_TERMINATOR_FOLLOWERS = /[\s"')\]]/;

/** Splits normalized text into sentences, keeping the separating space. */
function splitSentences(text: string): string[] {
  const sentences: string[] = [];
  let start = 0;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const isFullWidthTerminator = character === '。' || character === '．' || character === '！' || character === '？';
    const isAsciiTerminator = (character === '!' || character === '?' || character === '.')
      && (index + 1 >= text.length || ASCII_TERMINATOR_FOLLOWERS.test(text[index + 1]));

    if (!isFullWidthTerminator && !isAsciiTerminator) continue;

    let end = index + 1;
    while (end < text.length && TERMINATORS.includes(text[end])) end += 1;
    if (text[end] === ' ') end += 1;

    sentences.push(text.slice(start, end));
    start = end;
    index = end - 1;
  }

  if (start < text.length) sentences.push(text.slice(start));
  return sentences;
}

/**
 * Splits text into utterances at sentence boundaries, falling back to a space
 * (then to a hard cut) only for a single sentence that exceeds the limit.
 */
export function splitIntoSegments(text: string, maxLength: number = MAX_SEGMENT_LENGTH): string[] {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return [];
  if (normalized.length <= maxLength) return [normalized];

  const segments: string[] = [];
  let buffer = '';

  const flush = (): void => {
    const pending = buffer.trim();
    if (pending) segments.push(pending);
    buffer = '';
  };

  for (const sentence of splitSentences(normalized)) {
    if (sentence.length > maxLength) {
      flush();
      let rest = sentence;
      while (rest.length > maxLength) {
        const lastSpace = rest.slice(0, maxLength).lastIndexOf(' ');
        // Only honour a space that is reasonably close to the limit, otherwise
        // a single early space would produce a stream of tiny utterances.
        const cut = lastSpace > maxLength * 0.6 ? lastSpace : maxLength;
        const chunk = rest.slice(0, cut).trim();
        if (chunk) segments.push(chunk);
        rest = rest.slice(cut);
      }
      buffer = rest;
      continue;
    }

    if ((buffer + sentence).length > maxLength) flush();
    buffer += sentence;
  }

  flush();
  return segments;
}

function isReadable(element: HTMLElement): boolean {
  if (element.hidden) return false;
  if (element.closest('[aria-hidden="true"], nanairo-accessibility')) return false;
  if (typeof element.checkVisibility === 'function' && !element.checkVisibility()) return false;
  // A block that contains another readable block is a wrapper; reading it too
  // would repeat the nested text.
  return element.querySelector(SPEECH_SELECTOR) === null;
}

/** Collects the utterances for the given subtree, in document order. */
export function collectSpeechSegments(root: ParentNode): string[] {
  const segments: string[] = [];
  root.querySelectorAll<HTMLElement>(SPEECH_SELECTOR).forEach((element) => {
    if (!isReadable(element)) return;
    segments.push(...splitIntoSegments(element.textContent ?? ''));
  });
  return segments;
}
