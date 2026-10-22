# Design

<!-- impeccable:design-schema 1 -->

## World

A printed course catalogue from a technical school: newsprint paper, dense black ink, one signal red, hairline rules, and a strict column grid. Nothing floats, nothing glows, nothing is rounded. The page behaves like a well-set catalogue spread — masthead, record card, syllabus, colophon — rather than a landing page.

Anti-reference: the previous version (cream gradient hero, illustrated phone mockup, acid-yellow highlighter, pill buttons, soft-shadow cards). It read as a template.

## Palette

Sampled from the built CSS.

| Role | Light | Dark |
|---|---|---|
| Paper (ground) | `#f3f0e9` | `#0f0f0c` |
| Band (section fill) | `#e8e4d9` | `#17160f` |
| Card (code, insets) | `#fbf9f4` | `#14130e` |
| Ink (text, rules) | `#12120f` | `#f2efe6` |
| Ink 2 (body copy) | `#2b2b24` | `#d9d5c8` |
| Muted (labels) | `#6b685c` | `#9c978a` |
| Line | `#d2cdbe` | `#2a2921` |
| Line 2 (stronger) | `#a8a394` | `#46443a` |
| Signal red (accent) | `#cf3510` | `#ff6a3d` |
| Red ink (links) | `#a52a0b` | `#ff8a63` |
| Red soft (extra row) | `#f7e3db` | `#2a150e` |
| Green (completed) | `#2f6b3a` | `#7fd39a` |

One accent only. Red marks: chapter numbers, section kickers, active navigation, links in prose, exercise rules, completion. It never fills a large area except the single extra-syllabus row.

## Type

- **Archivo** variable, axes `wdth` 62–125 and `wght` 400–800.
  - Display (`h1`, `h2`, `.entry-n`, `.brand`, lesson titles): `wdth` 78–92, weight 700, tracking −0.035 to −0.045em, line-height 0.87–0.98.
  - Body: `wdth` 100, 17px (17.5px from 780px), line-height 1.68, measure 66–68ch.
  - UI labels: `wdth` 100, 600 weight, 13px.
- **JetBrains Mono** 400/500 for metadata, kickers, tags, code, durations, keys, colophon. 9–12.2px, tracking 0.05–0.14em, uppercase for labels.

Numerals are tabular wherever they align (progress, durations, section numbers).

## Grid and spacing

- Container: `min(100% - 2×pad, 1240px)`; pad 18 → 24 → 32px.
- Base unit 4px. Section padding 44px → 54px. Rules separate, not cards.
- Article layout: single column below 1040px; from 1040px a 214px sticky rail plus a 66–68ch measure, 56px gutter.
- Syllabus rows: `44px 1fr` on mobile, `54px 1fr 92px` from 780px.
- Every horizontal divider is 1px `--line`; structural dividers (section starts, table heads, callouts, syllabus top) are 1px or 2px `--ink`.

## Components

- **Buttons**: square, 1px ink border, ink fill with paper text; hover flips to signal red. Secondary is a transparent outline. Height 46px, 36px for small.
- **Tags**: 9.5px mono, uppercase, 1px `--line-2`, no fill.
- **Code blocks**: paper card, 1px `--line-2`, mono header bar with language label and a `Copiar` button; 12.2px code at 1.7 line-height. Syntax colors: comment muted italic, keyword red-ink, string green, number blue, function purple.
- **Callouts**: no boxes. A 2px top rule plus a mono uppercase label. `--warn` and `--kid` use red; `--info` uses `--line-2` and muted.
- **Steps**: ordered list with `01`–`0n` mono numerals in red in the left gutter, hairline separators.
- **Tables**: 2px ink top rule, 1px bottom, mono uppercase headers, no zebra, no outer border.
- **Checklist**: hairline rows with a red `□` in the gutter.
- **Bad/good comparison**: two stacked (or side-by-side) blocks separated by a red rule and a green rule with mono labels.
- **Exercise**: 2px red top rule, tag, heading, muted description.
- **Glossary**: `dt` bold sans, `dd` muted with hairline separator.
- **Lesson row**: red mono number, title, a `CONSTRUYES` line, mono metadata, and a right-aligned duration column from 780px.
- **Stamp button** (completion): mono uppercase 11px, outline, turns green when pressed.
- **Pager**: two hairline rows, mono small caps label above a bold title; right-aligned for "next".

## Motion

Two authored moments, nothing else:

1. `wipe` — the page `h1` enters by revealing from the baseline with `clip-path: inset(0 0 105% 0)` over 0.85s `cubic-bezier(0.16, 1, 0.3, 1)`.
2. `fade` — deck and metadata follow at 0.12s and 0.2s delay.
3. `.rise` — sections fade up 8px once, on intersection, 0.65s.

All of it is disabled under `prefers-reduced-motion: reduce`. No hover transforms, no parallax, no scroll-jacking.

## Browser surfaces

Selection is signal red on white. Focus is a 2px red outline at 2px offset. Scrollbars stay native. `::marker` on prose lists is red mono. Links are underlined with a 40%-opacity red and go full red on hover.

## States

- Lesson rows: hover fills with `--card`, title turns red.
- Completed lessons: number turns green with a check.
- Navigation: current page carries an inset 2px red underline (desktop) or red title (mobile menu).
- Progress: ten 7×8px segments that fill red left to right.
- Copy button: `Copiado` for 1.8s in red.
- Toast: ink block, mono uppercase, bottom center.

## Responsive

360 px is the design width. At 360 the record card stacks label/value, the syllabus drops its duration column, the article is single column with a `<details>` table of contents, and the header collapses to brand plus two icon buttons. Enhancements start at 520 (two-column paths, four-column deliverables, footer columns), 780 (inline nav, progress segments, three-column syllabus, four-column deliverables, hero split), 1040 (sticky rail), 1180 (measure tightened).
