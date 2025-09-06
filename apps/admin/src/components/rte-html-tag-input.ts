import { Extension, InputRule } from '@tiptap/core';

const MIN_HEADING_LEVEL = 1 as const;
const MAX_HEADING_LEVEL = 6 as const;
const BOLD_TAG_RE = /<(?:b|strong)>(.+?)<\/(?:b|strong)>$/;
const ITALIC_TAG_RE = /<(?:i|em)>(.+?)<\/(?:i|em)>$/;

// Converts typed HTML-like tags into TipTap nodes/marks as you type.
// Examples:
//   <h1>Title</h1>   -> Heading level 1 node with text "Title"
//   <h2>Title</h2>   -> Heading level 2 node with text "Title"
//   <b>bold</b>      -> bold mark applied to "bold"
//   <strong>bold</strong> -> bold mark applied to "bold"
//   <i>italic</i>    -> italic mark applied to "italic"
//   <em>italic</em>  -> italic mark applied to "italic"
export const HtmlTagInputExtension = Extension.create({
  name: 'htmlTagInput',

  addInputRules() {
    const rules: InputRule[] = [];

    // Heading tags <h1>..</h1> to <h6>..</h6>
    for (let level = MIN_HEADING_LEVEL; level <= MAX_HEADING_LEVEL; level++) {
      const re = new RegExp(`^<h${level}>(.+?)</h${level}>$`);
      rules.push(
        new InputRule({
          find: re,
          handler: ({ range, match, chain }) => {
            const text = match[1] ?? '';
            chain()
              .deleteRange(range)
              .insertContent({
                type: 'heading',
                attrs: { level },
                content: [{ type: 'text', text }],
              })
              .run();
          },
        })
      );
    }

    // Bold: <b>..</b> or <strong>..</strong>
    rules.push(
      new InputRule({
        find: BOLD_TAG_RE,
        handler: ({ range, match, chain }) => {
          const text = match[1] ?? '';
          chain()
            .deleteRange(range)
            .insertContent({ type: 'text', text, marks: [{ type: 'bold' }] })
            .run();
        },
      })
    );

    // Italic: <i>..</i> or <em>..</em>
    rules.push(
      new InputRule({
        find: ITALIC_TAG_RE,
        handler: ({ range, match, chain }) => {
          const text = match[1] ?? '';
          chain()
            .deleteRange(range)
            .insertContent({ type: 'text', text, marks: [{ type: 'italic' }] })
            .run();
        },
      })
    );

    return rules;
  },
});
