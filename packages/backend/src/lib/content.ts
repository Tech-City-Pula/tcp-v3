import sanitizeHtml from 'sanitize-html';
import TurndownService from 'turndown';

// Single shared instances (stateless except for options)
const turndown = new TurndownService({
  headingStyle: 'atx',
});

// Basic URL protocol allow-list for links & images
function isSafeUrl(url: string) {
  try {
    const lower = url.trim().toLowerCase();
    if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function sanitizeIncomingHtml(html: string) {
  // Allow a conservative set of tags & attributes suitable for blog content
  return sanitizeHtml(html, {
    allowedTags: [
      'p',
      'br',
      'ul',
      'ol',
      'li',
      'strong',
      'em',
      'blockquote',
      'code',
      'pre',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'a',
      'img',
      'hr',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'rel', 'target'],
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
    // Transform URLs to enforce protocol safety & add rel attrs
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || '';
        if (!isSafeUrl(href)) {
          // biome-ignore lint/performance/noDelete: works
          delete attribs.href;
        }
        return {
          tagName,
          attribs: {
            ...attribs,
            rel: 'noopener noreferrer',
            target: '_blank',
          },
        };
      },
      img: (tagName, attribs) => {
        const src = attribs.src || '';
        if (!isSafeUrl(src)) {
          // biome-ignore lint/performance/noDelete: works
          delete attribs.src;
        }
        return { tagName, attribs };
      },
    },
    // Disallow all CSS & scripts
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
    enforceHtmlBoundary: true,
  });
}

export function htmlToMarkdown(html: string) {
  return turndown.turndown(html);
}

export function sanitizeAndConvertIncomingHtml(html: string) {
  const clean = sanitizeIncomingHtml(html);
  const markdown = htmlToMarkdown(clean);
  return { markdown, cleanHtml: clean };
}
