# Minimal Swiss

A minimalist analog watch face inspired by modern Swiss watch design and
contemporary fashion watches (Swatch, TAG Heuer, Tissot, Mondaine, Braun as
loose references) -- a physical wristwatch dial first, a smartwatch face
second.

## Architecture

**Layout** (`Layout.mc`) and **theme** (`Themes.mc`) are deliberately
separate:

- **Layout** controls positions, dimensions, hand geometry, marker placement,
  and complication placement. It is screen-size aware but theme-agnostic and
  identical across every theme.
- **Theme** controls colors, fonts, marker/hand rendering style, and accent
  treatment. Nothing in a theme depends on screen size.

`Drawing.mc` holds pure geometric helpers (polar coordinates, tapered hand
polygons, rectangular ticks) with no layout or theme policy. `Dial.mc` uses
those helpers to draw markers, the branding area, and complications,
consulting layout for *where* and theme for *how*.

## Themes

Selectable at runtime from watch face settings (no rebuild required):

| Theme | Reference | Palette |
|---|---|---|
| Minimal Swiss | Tissot / Mondaine | Off-white dial, charcoal type, restrained red accent |
| Swatch | Swatch | White dial, black type, bright red accent |
| Racing | TAG Heuer | Black dial, white type, red second hand |
| Monochrome | Braun | Black dial, white type, grey secondary info, no color accent |
| Custom | -- | User-selected background/text/marker/hand/accent colors |

## Settings

- **Theme** -- one of the five above
- **Hour Markers** -- numerals, indices, dots, or numerals+indices combo
- **Show Second Hand / Date / Battery / Heart Rate** -- independent toggles
- **Brand Name / Secondary Brand Text** -- optional branding between 12
  o'clock and center; blank means no branding at all

Complications, when enabled, sit at fixed dial positions -- date at 3
o'clock, battery at 6, heart rate at 9 -- as plain large-type values, never
as a dashboard of boxes or icons.

## Building

Same toolchain as `cleanAnalog` (see the repo root README): open
`monkey.jungle` in VS Code with the Monkey C extension, then
**Monkey C: Build for Device** or **Run Without Debugging** to try it in the
simulator.
